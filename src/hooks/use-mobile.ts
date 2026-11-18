import * as React from "react"

const MOBILE_BREAKPOINT = 768
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function subscribe(callback: () => void): () => void {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

const getSnapshot = (): boolean => window.matchMedia(QUERY).matches

export function useIsMobile(): boolean {
  // Server render has no window, so it reports desktop and the first client read corrects it.
  return React.useSyncExternalStore(subscribe, getSnapshot, () => false)
}
