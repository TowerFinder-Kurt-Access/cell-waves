import { ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { getBundle } from "@/i18n"
import { Button } from "@/components/ui/button"
import { localizePath, type Locale } from "@/lib/i18n"

const CONSENT_KEY = "cw-consent"
const CF_BEACON_SRC = "https://static.cloudflareinsights.com/beacon.min.js"
const CF_BEACON_TOKEN = "c01d42984c2243b39ad0a8786c74fe6d"
const GA4_ID = "G-XYNNZYWQF4"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function loadGoogleAnalytics() {
  if (document.getElementById("ga4-script")) return
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
  script.id = "ga4-script"
  document.head.appendChild(script)
  window.dataLayer = window.dataLayer || []
  window.gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args)
  }
  window.gtag("js", new Date())
  window.gtag("config", GA4_ID)
}

function trackPhoneClick() {
  // Delegated listener so tel: links anywhere (header, contact, footer) are captured.
  document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as Element | null
    if (!target?.closest || !target.closest('a[href^="tel:"]')) return
    window.gtag?.("event", "click_phone", { event_category: "contact" })
  })
}

function loadCloudflareBeacon() {
  if (document.querySelector('script[data-cf-beacon]')) return
  const script = document.createElement("script")
  script.type = "module"
  script.src = CF_BEACON_SRC
  script.async = true
  script.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_BEACON_TOKEN }))
  document.head.appendChild(script)
}


export function CookieConsent({ locale }: { locale: Locale }) {
  const t = getBundle<Record<string, string>>(locale, "ui", "cookieConsent")
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
      loadGoogleAnalytics()
      trackPhoneClick()
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
    if (value === "accepted") {
      loadCloudflareBeacon()
      loadGoogleAnalytics()
      trackPhoneClick()
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label={t.label}
          className="fixed bottom-0 left-0 z-[90] w-full p-3 sm:w-auto sm:max-w-sm sm:p-4"
          initial={reduceMotion ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-md sm:flex-row sm:items-center sm:gap-4">
            <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-muted sm:flex">
              <ShieldCheck className="h-4 w-4 text-brand" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] leading-snug text-muted-foreground">
                {t.body}{" "}
                <a
                  href={localizePath(locale, "/privacy-policy")}
                  className="font-medium text-brand underline underline-offset-2"
                >
                  {t.privacy}
                </a>
              </p>
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-col sm:gap-2">
              <Button size="sm" variant="outline" onClick={() => decide("declined")}>
                {t.decline}
              </Button>
              <Button size="sm" onClick={() => decide("accepted")}>
                {t.accept}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}