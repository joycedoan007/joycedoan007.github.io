export const PRODUCTION_HOST = "joycedoan.id.vn"

export const SITE_PROPERTIES = Object.freeze({
  site: "joyce_portfolio",
  environment: "production",
  hostname: PRODUCTION_HOST,
})

const CUSTOM_EVENTS = new Set([
  "portfolio_project_opened",
  "portfolio_article_viewed",
  "portfolio_email_copied",
  "portfolio_booking_clicked",
  "portfolio_language_changed",
])

export const REPLAY_SAMPLE_RATE = 0.2

// Block the Cal embed and other third-party frames. Public icons, logos, and photos stay.
export const REPLAY_BLOCK_SELECTOR = [
  "video",
  "audio",
  "canvas",
  "iframe",
  "embed",
  "object",
  "#my-cal-inline-30min",
  "cal-inline",
].join(", ")

// Public editorial text stays. Contact email, inputs, and booking widgets are masked.
export const REPLAY_MASK_TEXT_SELECTOR = [
  "input",
  "textarea",
  "select",
  "option",
  "[contenteditable]",
  ".ph-mask",
  "[data-ph-mask]",
  "[data-analytics='copy-email']",
].join(", ")

export const EXCEPTION_CAPTURE = Object.freeze({
  capture_unhandled_errors: true,
  capture_unhandled_rejections: true,
  capture_console_errors: false,
})

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g

export function maskReplayText(text) {
  if (typeof text !== "string" || text.trim().length === 0) return text
  return "*".repeat(Math.min(text.trim().length, 12))
}

export function maskReplayInput(text) {
  const value = typeof text === "string" ? text : ""
  if (!value) return ""
  return "*".repeat(Math.min(value.length, 12))
}

function maskStars(value) {
  return "*".repeat(Math.min(String(value).length, 12))
}

function tagName(element) {
  return String(element?.tagName || "").toLowerCase()
}

export function stripReplayQuery(value) {
  const text = String(value ?? "")
  const trimmed = text.trim()
  if (!trimmed || trimmed.startsWith("#") || /^data:image\//i.test(trimmed)) return text
  if (/^(javascript|blob|mailto):/i.test(trimmed)) return maskStars(trimmed)
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed) || trimmed.startsWith("//") || trimmed.startsWith("/")) {
    try {
      const url = new URL(trimmed, "https://assets.invalid")
      url.search = ""
      url.hash = ""
      if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return url.pathname
      return url.toString()
    } catch (_error) {
      return trimmed.split(/[?#]/)[0]
    }
  }
  return trimmed.split(/[?#]/)[0]
}

function maskStyleValue(value) {
  return String(value).replace(EMAIL, "[redacted]").replace(/url\(([^)]+)\)/gi, (all, inner) => {
    const cleaned = String(inner).trim().replace(/^['"]|['"]$/g, "")
    if (cleaned.startsWith("#") || /^data:image\//i.test(cleaned)) return all
    return `url("${stripReplayQuery(cleaned)}")`
  })
}

function maskSrcSet(value) {
  return String(value).split(",").map((part) => {
    const bits = part.trim().split(/\s+/)
    if (!bits[0]) return part.trim()
    bits[0] = stripReplayQuery(bits[0])
    return bits.join(" ")
  }).join(", ")
}

export function maskReplayAttribute(name, value, element) {
  const attr = String(name || "").toLowerCase()
  const text = value == null ? "" : String(value)
  if (!text) return text
  const tag = tagName(element)
  if (attr === "value" && (tag === "input" || tag === "textarea" || tag === "select" || tag === "option")) {
    return maskStars(text)
  }
  if (attr === "srcdoc") return maskStars(text)
  if ((attr === "src" || attr === "rr_src") && (tag === "iframe" || tag === "embed" || tag === "object")) return maskStars(text)
  if (attr === "href" && (tag === "link" || tag === "style")) return text
  if (attr === "href" || attr === "src" || attr === "poster" || attr === "action" || attr === "formaction") {
    return stripReplayQuery(text)
  }
  if (attr === "srcset") return maskSrcSet(text)
  if (attr === "style" || attr === "_csstext") return maskStyleValue(text)
  if (attr.startsWith("data-") && (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(text) || /[?#].+/.test(text))) return maskStars(text)
  return text
}

export function sessionRecordingConfig() {
  return {
    maskAllInputs: true,
    maskTextClass: "ph-mask",
    maskTextSelector: REPLAY_MASK_TEXT_SELECTOR,
    maskTextFn: maskReplayText,
    maskInputFn: maskReplayInput,
    blockSelector: REPLAY_BLOCK_SELECTOR,
    maskAllElementAttributes: false,
    maskAttributeFn: maskReplayAttribute,
    recordHeaders: false,
    recordBody: false,
    streamNetworkBody: false,
    captureJsonLd: false,
    sampleRate: REPLAY_SAMPLE_RATE,
    strictMinimumDuration: false,
    captureCanvas: { recordCanvas: false },
  }
}

export function redactText(value) {
  if (typeof value !== "string") return value
  return value.replace(EMAIL, "[redacted]").replace(/[?#][^\s)]*/g, "").slice(0, 300)
}

function redactExceptionList(list) {
  return list.map((item) => {
    if (!item || typeof item !== "object") return item
    const next = { ...item }
    if (typeof next.value === "string") next.value = redactText(next.value)
    return next
  })
}

export function trackingAllowed(hostname, path, signals = {}) {
  if (hostname !== PRODUCTION_HOST) return false
  if (path === "/admin" || path.startsWith("/admin/")) return false
  const dnt = String(signals.doNotTrack || "")
  if (dnt === "1" || dnt === "yes") return false
  if (signals.globalPrivacyControl) return false
  if (signals.optOut) return false
  if (signals.webdriver) return false
  return true
}

export function sanitizedUrl(href) {
  const url = new URL(href)
  if (url.hostname !== PRODUCTION_HOST) throw new Error("unexpected host")
  return `${url.origin}${url.pathname}`
}

export function customEvent(event, properties = {}) {
  if (!CUSTOM_EVENTS.has(event)) return null
  const next = {}
  if (typeof properties.slug === "string" && /^[a-z0-9_-]{1,80}$/i.test(properties.slug)) next.slug = properties.slug
  if (properties.locale === "en" || properties.locale === "vi") next.locale = properties.locale
  if (/^(header|home|contact_cta|case_study)$/.test(properties.placement || "")) next.placement = properties.placement
  if ((event === "portfolio_project_opened" || event === "portfolio_article_viewed") && !next.slug) return null
  if (event === "portfolio_language_changed" && !next.locale) return null
  if (event === "portfolio_booking_clicked" && !next.placement) return null
  return next
}

export function sanitizeProperties(properties = {}) {
  const next = { ...properties }
  if (Array.isArray(next.$exception_list)) next.$exception_list = redactExceptionList(next.$exception_list)
  for (const key of Object.keys(next)) {
    if (key.startsWith("$exception") && typeof next[key] === "string") next[key] = redactText(next[key])
  }
  if (next.$current_url) next.$current_url = sanitizedUrl(next.$current_url)
  if (next.$current_url) next.$pathname = new URL(next.$current_url).pathname
  delete next.$ip
  delete next.$search
  const allowed = new Set([
    "slug",
    "locale",
    "placement",
    "site",
    "environment",
    "hostname",
    "token",
    "distinct_id",
    "synthetic_test",
    "$device_id",
  ])
  for (const key of Object.keys(next)) {
    if (key.startsWith("$") && key !== "$ip" && key !== "$search") continue
    if (key !== "token" && /email|prompt|question|password|secret|access_token|refresh_token/i.test(key)) {
      delete next[key]
      continue
    }
    if (key === "synthetic_test" && next[key] !== "synthetic_test") {
      delete next[key]
      continue
    }
    if (!allowed.has(key)) delete next[key]
    if (typeof next[key] === "string" && next[key].includes("@")) delete next[key]
  }
  return next
}

export function eventProperties(properties = {}) {
  return { ...sanitizeProperties(properties), ...SITE_PROPERTIES }
}
