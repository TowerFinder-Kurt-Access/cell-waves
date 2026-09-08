import type { APIRoute } from "astro"

// Hard-coded for testing. The test sender only delivers to the Resend account owner.
// After verifying a domain at resend.com/domains, set SENDER to that domain and RECIPIENT
// to the real inbox (kurtdenzel51@gmail.com).
const RECIPIENT = "bretth@slvtechnical.com"

// Test sender Resend allows without domain verification; delivers to the account owner only.
// The email address inside <> is required; swap it for a verified domain once available.
const SENDER = "Cell Waves Canada <onboarding@resend.dev>"

// ponytail: in-memory rate limit. Vercel serverless instances are ephemeral, so this bounds
// spam per warm instance, not globally. Swap for Upstash Ratelimit + Redis when traffic
// justifies a second dependency and the env keys.
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const rateHits = new Map<string, { count: number; resetAt: number }>()

// Humans take longer than this to read and fill the form. Bots submit instantly.
const MIN_FILL_MS = 3000

export const prerender = false

interface ContactPayload {
  name?: unknown
  email?: unknown
  phone?: unknown
  address?: unknown
  message?: unknown
  website?: unknown
  startedAt?: unknown
}

function asField(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : ""
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ ok: false, message }), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

function rateLimited(request: Request): Response | null {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = (forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip")) ?? "unknown"
  const now = Date.now()
  const hit = rateHits.get(ip)
  if (!hit || hit.resetAt <= now) {
    rateHits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return null
  }
  hit.count += 1
  if (hit.count > RATE_MAX) {
    const retryAfter = Math.max(1, Math.ceil((hit.resetAt - now) / 1000))
    return new Response(JSON.stringify({ ok: false, message: "Too many requests. Please try again later." }), {
      status: 429,
      headers: { "Content-Type": "application/json", "Retry-After": String(retryAfter) },
    })
  }
  return null
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY
  if (!apiKey) return jsonError("Email service is not configured.", 500)

  let payload: ContactPayload
  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return jsonError("Invalid request body.", 400)
  }

  // Honeypot: real users never see this field, bots fill it. Drop silently.
  if (asField(payload.website, 200)) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  // Fill-time check: bots submit within milliseconds of page load.
  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  const limited = rateLimited(request)
  if (limited) return limited

  const name = asField(payload.name, 120)
  const email = asField(payload.email, 200)
  const phone = asField(payload.phone, 40)
  const address = asField(payload.address, 300)
  const message = asField(payload.message, 5000)

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError("Name, a valid email, and a message are required.", 400)
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    address && `Cell site address: ${address}`,
    "",
    message,
  ].filter(Boolean)

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: SENDER,
      to: [RECIPIENT],
      reply_to: email,
      subject: `New consultation request from ${name}`,
      text: lines.join("\n"),
    }),
  })

  if (!resendResponse.ok) {
    console.error("Resend send failed:", await resendResponse.text())
    return jsonError("Could not send your request. Please try again.", 502)
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}