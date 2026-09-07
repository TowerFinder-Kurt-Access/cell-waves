import { ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"

const CONSENT_KEY = "cw-consent"
const CF_BEACON_SRC = "https://static.cloudflareinsights.com/beacon.min.js"
const CF_BEACON_TOKEN = "c01d42984c2243b39ad0a8786c74fe6d"

function loadCloudflareBeacon() {
  if (document.querySelector('script[data-cf-beacon]')) return
  const script = document.createElement("script")
  script.type = "module"
  script.src = CF_BEACON_SRC
  script.async = true
  script.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_BEACON_TOKEN }))
  document.head.appendChild(script)
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let consent: string | null = null
    try {
      consent = localStorage.getItem(CONSENT_KEY)
    } catch {
      // Storage unavailable: show the banner and degrade gracefully.
    }
    if (consent === "accepted") {
      loadCloudflareBeacon()
    } else if (consent === null) {
      setVisible(true)
    }
  }, [])

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_KEY, value)
    } catch {
      // Storage unavailable: still close the banner.
    }
    if (value === "accepted") loadCloudflareBeacon()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[200] p-4 sm:p-6"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-md sm:flex-row sm:items-start sm:gap-5 sm:p-6">
            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-muted sm:flex">
              <ShieldCheck className="h-5 w-5 text-brand" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">Your privacy matters</p>
              <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
                We use Cloudflare Web Analytics to understand how visitors use our site. It does not
                use cookies and does not track you across websites. Decline anytime and still use
                the site fully.
              </p>
              <a
                href="/privacy-policy"
                className="mt-1.5 inline-block text-sm font-medium text-brand underline underline-offset-4"
              >
                Read our privacy policy
              </a>
            </div>
            <div className="flex shrink-0 items-center gap-3 sm:pt-1">
              <Button variant="outline" onClick={() => decide("declined")}>
                Decline
              </Button>
              <Button onClick={() => decide("accepted")}>Accept</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}