// Count-up for [data-count-up] badges. Starts at the markup's initial text ("1")
// and eases to data-target once the element is half visible. Static under
// prefers-reduced-motion.
const els = document.querySelectorAll<HTMLElement>("[data-count-up]")

if (els.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        io.unobserve(entry.target)
        const el = entry.target as HTMLElement
        const target = Number(el.dataset.target ?? 0)
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          el.textContent = String(target)
          continue
        }
        const duration = 1400
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = String(Math.max(1, Math.round(eased * target)))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    },
    { threshold: 0.5 },
  )
  els.forEach((el) => io.observe(el))
}
