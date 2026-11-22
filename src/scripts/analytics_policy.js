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
  if (next.$current_url) next.$current_url = sanitizedUrl(next.$current_url)
  if (next.$current_url) next.$pathname = new URL(next.$current_url).pathname
  delete next.$ip
  delete next.$search
  const allowed = new Set(["slug", "locale", "placement", "site", "environment", "hostname", "token"])
  for (const key of Object.keys(next)) {
    if (key.startsWith("$")) continue
    if (key !== "token" && /email|prompt|question|password|secret|access_token|refresh_token/i.test(key)) {
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
