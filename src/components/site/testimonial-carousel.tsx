import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"
import { getBundle, getT } from "@/i18n"
import { TESTIMONIALS } from "@/lib/content"
import { type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function TestimonialCarousel({ locale }: { locale: Locale }) {
  const t = getBundle<Record<string, string>>(locale, "ui", "carousel")
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" })
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    const onReInit = () => setSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onReInit)
    onReInit()
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onReInit)
    }
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="min-w-0 flex-[0_0_100%] pl-4 first:pl-0">
              <div className="py-6">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand">{t.title}</p>
                </motion.div>

                <motion.blockquote
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 max-w-[36ch] text-[1.6rem] font-bold leading-[1.05] tracking-tighter text-ink sm:text-[1.95rem] md:text-[2.15rem] lg:text-[2.45rem]"
                >
                  <span className="text-brand/30">&ldquo;</span>
                  {t.quote}
                  <span className="text-brand/30">&rdquo;</span>
                </motion.blockquote>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-10 flex items-center gap-4 border-t border-border pt-6"
                >
                  <img
                    src={t.image}
                    alt={t.alt}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-border sm:h-20 sm:w-20 lg:h-[84px] lg:w-[84px]"
                  />
                  <div className="min-w-0">
                    <p className="text-[1.45rem] font-bold leading-none tracking-tighter text-ink sm:text-[1.6rem] lg:text-[1.7rem]">{t.name}</p>
                    <p className="mt-1.5 text-[15px] font-medium leading-none tracking-wide text-muted-foreground sm:text-[16px]">{t.location}</p>
                  </div>
                </motion.div>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 sm:mt-10">
        <div className="flex items-center gap-2" role="tablist" aria-label={t.pages}>
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={getT(locale)("carousel.goTo", { n: i + 1 })}
              aria-selected={selected === i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                selected === i ? "w-8 bg-brand" : "w-2 bg-border hover:bg-brand/40",
              )}
            />
          ))}
          <span className="ml-3 hidden font-mono text-xs tracking-widest text-muted-foreground sm:inline" aria-live="polite">
            {String(selected + 1).padStart(2, "0")} / {String(snaps.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label={t.prev}
            onClick={() => emblaApi?.scrollPrev()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-ink transition-colors hover:bg-accent active:scale-[0.98]"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label={t.next}
            onClick={() => emblaApi?.scrollNext()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-ink transition-colors hover:bg-accent active:scale-[0.98]"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}
