import { ChevronDown, Menu, Phone, Radio, X } from "lucide-react"
import { useState } from "react"
import { createPortal } from "react-dom"
import { NAV_ITEMS, PHONE_DISPLAY, PHONE_HREF, SITE_NAME } from "@/lib/content"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

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
          <span className="flex items-center gap-2 font-heading text-lg font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-brand-foreground">
              <Radio className="h-4 w-4" strokeWidth="2" />
            </span>
            {SITE_NAME}
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
          >
            <X className="h-5 w-5" strokeWidth="2" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-1 overflow-y-auto" aria-label="Mobile">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.href}>
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  aria-expanded={expanded === item.label}
                  className="flex w-full items-center justify-between rounded-full px-3 py-3 text-left text-base font-medium text-white transition-colors hover:bg-white/10"
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
                        key={child.label}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl py-2.5 pl-6 pr-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-full px-3 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 text-sm font-semibold text-brand"
          >
            <Phone className="h-4 w-4" strokeWidth="2" />
            {PHONE_DISPLAY}
          </a>
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-brand-foreground"
          >
            Free consultation
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white"
      >
        <Menu className="h-5 w-5" strokeWidth="2" />
      </button>

      {typeof document !== "undefined" ? createPortal(panel, document.body) : null}
    </>
  )
}
