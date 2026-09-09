import { createInstance, type TFunction } from "i18next"

import { LOCALES, type Locale } from "@/lib/i18n"

import dataEn from "./locales/en/data.json"
import dataFr from "./locales/fr/data.json"
import uiEn from "./locales/en/ui.json"
import uiFr from "./locales/fr/ui.json"

export type UiBundle = Record<string, Record<string, string>>

// One frozen instance per locale: Astro renders pages concurrently in a
// single process, so the global i18next singleton must never be touched.
const instances = new Map<Locale, ReturnType<typeof createInstance>>()

function create(locale: Locale) {
  const instance = createInstance()
  // Resources are bundled, so init resolves synchronously before returning.
  instance.init({
    lng: locale,
    fallbackLng: "en",
    resources: {
      en: { data: dataEn, ui: uiEn },
      fr: { data: dataFr, ui: uiFr },
    },
    interpolation: { escapeValue: false },
    returnObjects: true,
    partialBundledLanguages: false,
  })
  return instance
}

export function getI18n(locale: Locale) {
  let instance = instances.get(locale)
  if (!instance) {
    instance = create(locale)
    instances.set(locale, instance)
  }
  return instance
}

export function getT(locale: Locale, ns: "data" | "ui" = "ui"): TFunction {
  return getI18n(locale).getFixedT(locale, ns)
}

export function getBundle<T>(locale: Locale, ns: "data" | "ui", key: string): T {
  return getI18n(locale).getResource(locale, ns, key) as T
}

export { LOCALES }
