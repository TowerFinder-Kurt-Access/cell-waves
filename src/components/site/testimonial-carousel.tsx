import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useEffect, useState } from "react"
import { TESTIMONIALS } from "@/lib/content"
import { cn } from "@/lib/utils"

export function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])

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
    <div>
      <div className="overflow-hidden -mx-1" ref={emblaRef}>
        <div className="flex">
          {TESTIMONIALS.map((t, i) => {
            const hasImage = i % 2 === 0
            return (
              <figure
                key={t.name}
                className="min-w-0 flex-[0_0_100%] px-1 py-1 sm:flex-[0_0_50%] sm:px-3 lg:flex-[0_0_33.333%]"
              >
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  {hasImage ? (
                    <div className="relative h-[132px] overflow-hidden border-b border-border bg-secondary/60">
                      <img src={t.image} alt={t.alt} className="h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur">
                        {String(i + 1).padStart(2, "0")} - Verified
                      </span>
                    </div>
                  ) : (
                    <div className="border-b border-border bg-brand-muted px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>
                        Verified - {t.location}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6 sm:p-6">
                    <Quote className="h-6 w-6 text-brand/70" strokeWidth="1.6" aria-hidden="true" />
                    <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-snug text-ink">{t.title}</h3>
                    <blockquote className="mt-2.5 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                      <img
                        src={t.image}
                        alt=""
                        aria-hidden="true"
                        className="h-9 w-9 rounded-full object-cover ring-1 ring-border"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{t.location}</p>
                      </div>
                    </figcaption>
                  </div>
                </div>
              </figure>
            )
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pages">
          {snaps.map((snap, i) => (
            <button
              key={snap}
              type="button"
              aria-label={`Go to testimonial page ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                selected === i ? "w-8 bg-brand" : "w-2 bg-border hover:bg-brand/40",
              )}
            />
          ))}
          <span className="ml-3 hidden font-mono text-xs tracking-widest text-muted-foreground sm:inline">
            {String(selected + 1).padStart(2, "0")} / {String(snaps.length).padStart(2, "0")}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => emblaApi?.scrollPrev()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-ink transition-colors hover:bg-accent"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth="2" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => emblaApi?.scrollNext()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-ink transition-colors hover:bg-accent"
          >
            <ChevronRight className="h-5 w-5" strokeWidth="2" />
          </button>
        </div>
      </div>
    </div>
  )
}
