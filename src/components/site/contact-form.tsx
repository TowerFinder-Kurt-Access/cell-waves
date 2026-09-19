import { Send } from "lucide-react"
import { useState } from "react"
import { getBundle } from "@/i18n"
import { type Locale } from "@/lib/i18n"

const inputClass =
  "h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

type SubmitStatus = "idle" | "sending" | "sent" | "error"

export function ContactForm({ locale }: { locale: Locale }) {
  const t = getBundle<Record<string, string>>(locale, "ui", "contactForm")
  const [status, setStatus] = useState<SubmitStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [startedAt] = useState(() => Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    // Honeypot: real users never see or fill this field. Pretend success, never call the API.
    if (data.website) {
      setStatus("sent")
      return
    }

    setStatus("sending")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null
        setErrorMessage(body?.message ?? t.fallbackError)
        setStatus("error")
        return
      }
      form.reset()
      window.gtag?.("event", "generate_lead", { currency: "CAD" })
      setStatus("sent")
    } catch {
      setErrorMessage(t.networkError)
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div className="flex h-full min-h-[20rem] flex-col items-center justify-center px-2 py-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-muted text-brand">
          <Send className="h-5 w-5" strokeWidth="2" />
        </span>
        <h3 className="mt-4 text-xl font-semibold text-ink">{t.successTitle}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {t.successBody}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Spam protection: hidden from users, filled only by bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />
      <input type="hidden" name="startedAt" value={startedAt} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-sm font-medium text-ink">
            {t.fullName}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={t.namePlaceholder}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-sm font-medium text-ink">
            {t.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-phone" className="text-sm font-medium text-ink">
            {t.phone}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t.phonePlaceholder}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-address" className="text-sm font-medium text-ink">
            {t.address}
          </label>
          <input
            id="contact-address"
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder={t.addressPlaceholder}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="contact-message" className="text-sm font-medium text-ink">
            {t.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder={t.messagePlaceholder}
            className="min-h-[112px] w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:min-h-[128px]"
          />
        </div>
      </div>
      {status === "error" && errorMessage && (
        <p role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
          {errorMessage}
        </p>
      )}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-sm transition-all hover:brightness-110 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? t.sending : t.submit}
          <Send className="h-4 w-4" strokeWidth="2" />
        </button>
        <p className="text-xs leading-5 text-muted-foreground">{t.footnote}</p>
      </div>
    </form>
  )
}