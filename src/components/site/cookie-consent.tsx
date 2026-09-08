import { ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { localizePath, type Locale } from "@/lib/i18n"

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

const en = {
  label: "Cookie consent",
  body: "We use privacy-friendly analytics. No cookies. Decline anytime.",
  privacy: "Privacy policy",
  decline: "Decline",
  accept: "Accept",
}
const fr: typeof en = {
  label: "Gestion des témoins",
  body: "Nous utilisons des outils d’analyse respectueux de la vie privée. Aucun témoin. Vous pouvez refuser à tout moment.",
  privacy: "Politique de confidentialité",
  decline: "Refuser",
  accept: "Accepter",
}

export function CookieConsent({ locale }: { locale: Locale }) {
  const t = locale === "fr" ? fr : en
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
          aria-label={t.label}
          className="fixed bottom-0 left-0 z-[200] w-full p-3 sm:w-auto sm:max-w-sm sm:p-4"
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