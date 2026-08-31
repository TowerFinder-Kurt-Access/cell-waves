import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useState } from "react"
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/content"

const inputClass =
  "h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

export function ContactForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="flex h-full min-h-[24rem] flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-muted text-brand">
          <Send className="h-5 w-5" strokeWidth="2" />
        </span>
        <h3 className="mt-4 text-xl font-semibold text-ink">Request received</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out. We will review your details and reply within
          one business day.
        </p>
      </div>
    )
  }

  return (
    <form
      className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      noValidate
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-sm font-medium text-ink">
            Full name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Tremblay"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@example.ca"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-phone" className="text-sm font-medium text-ink">
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(780) 555-0123"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-address" className="text-sm font-medium text-ink">
            Cell site address
          </label>
          <input
            id="contact-address"
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder="123 Range Rd, Alberta"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="contact-message" className="text-sm font-medium text-ink">
            How can we help?
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Tell us about your lease or the carrier's offer."
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 text-base font-semibold text-brand-foreground shadow-sm transition-all hover:brightness-110 active:translate-y-[1px] sm:w-auto"
      >
        Request free consultation
        <Send className="h-4 w-4" strokeWidth="2" />
      </button>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        No obligation. Your details stay confidential.
      </p>
    </form>
  )
}

export function ContactAside() {
  return (
    <div className="flex flex-col gap-6">
      <a
        href={PHONE_HREF}
        className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand">
          <Phone className="h-5 w-5" strokeWidth="2" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Call us anytime</p>
          <p className="mt-1 text-sm text-muted-foreground">{PHONE_DISPLAY}</p>
        </div>
      </a>
      <a
        href={`mailto:${EMAIL}`}
        className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand">
          <Mail className="h-5 w-5" strokeWidth="2" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Email</p>
          <p className="mt-1 text-sm text-muted-foreground">{EMAIL}</p>
        </div>
      </a>
      <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand">
          <MapPin className="h-5 w-5" strokeWidth="2" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Serving Canada</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Landlords in every province, coast to coast.
          </p>
        </div>
      </div>
    </div>
  )
}
