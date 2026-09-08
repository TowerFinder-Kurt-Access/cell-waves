import { ChevronDown, Menu, Phone, X } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { NAV_ITEMS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/content"
import { localizePath, stripLocale, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const en = {
  openMenu: "Open menu",
  closeMenu: "Close menu",
  navLabel: "Mobile",
  cta: "Free consultation",
}
const fr: typeof en = {
  openMenu: "Ouvrir le menu",
  closeMenu: "Fermer le menu",
  navLabel: "Navigation mobile",
  cta: "Consultation gratuite",
}

export function MobileNav({ locale }: { locale: Locale }) {
  const t = locale === "fr" ? fr : en
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loc, setLoc] = useState({ path: "/", hash: "" })
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    const upd = () => setLoc({ path: window.location.pathname, hash: window.location.hash })
    upd()
    window.addEventListener("hashchange", upd)
    window.addEventListener("popstate", upd)
    return () => {
      window.removeEventListener("hashchange", upd)
      window.removeEventListener("popstate", upd)
    }
  }, [])
  const isActive = (href: string) => {
    const path = stripLocale(loc.path)
    if (href === "/") return path === "/" && !loc.hash
    if (href === "/blog") return path.startsWith("/blog")
    if (href.startsWith("/#")) return loc.hash === href.slice(1)
    return false
  }
  const isParentActive = (href: string, children?: { href: string }[]) =>
    isActive(href) || (children?.some((c) => isActive(c.href)) ?? false)
  const panel = (
    <div
      className={cn(
        "fixed inset-0 z-[100] transition-opacity duration-200 lg:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          "absolute right-0 top-0 flex h-full w-72 flex-col border-l border-white/10 bg-black/90 p-6 shadow-xl backdrop-blur-xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <img
              src="/cellwaves-logo.webp"
              alt=""
              width={385}
              height={385}
              className="h-9 w-auto"
              loading="lazy"
            />
            <span className="flex flex-col leading-none">
              <span className="font-heading text-lg font-bold tracking-tight text-white">Cell Waves</span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">Canada</span>
            </span>
          </span>
          <button
            type="button"
            aria-label={t.closeMenu}
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
          >
            <X className="h-5 w-5" strokeWidth="2" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-1 overflow-y-auto" aria-label={t.navLabel}>
          {NAV_ITEMS[locale].map((item) =>
            item.children ? (
              <div key={`p-${item.href}-${item.label}`}>
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  aria-expanded={expanded === item.label}
                  className={cn(
                    "flex w-full items-center justify-between rounded-full px-3 py-3 text-left text-base font-medium transition-colors",
                    isParentActive(item.href, item.children) ? "text-white" : "text-white/70 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", expanded === item.label && "rotate-180")}
                    strokeWidth="2"
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all",
                    expanded === item.label ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    {item.children.map((child) => (
                      <a
                        key={`c-${child.label}-${child.href}`}
                        href={localizePath(locale, child.href)}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-xl py-2.5 pl-6 pr-3 text-sm transition-colors",
                          isActive(child.href) ? "text-white" : "text-white/70 hover:bg-white/10 hover:text-white",
                        )}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={`l-${item.label}-${item.href}`}
                href={localizePath(locale, item.href)}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-full px-3 py-3 text-base font-medium transition-colors",
                  isActive(item.href) ? "text-white" : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6">
          <a href={PHONE_HREF} className="flex items-center gap-2 text-sm font-semibold text-brand">
            <Phone className="h-4 w-4" strokeWidth="2" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={localizePath(locale, "/#contact")}
            onClick={() => setOpen(false)}
            className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-brand-foreground"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        type="button"
        aria-label={t.openMenu}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white"
      >
        <Menu className="h-5 w-5" strokeWidth="2" />
      </button>

      {mounted && createPortal(panel, document.body)}
    </>
  )
}
