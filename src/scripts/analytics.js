import { posthogApiHost, posthogProjectToken } from "./posthog_public_config.js"
import {
  customEvent,
  eventProperties,
  EXCEPTION_CAPTURE,
  sanitizedUrl,
  sessionRecordingConfig,
  SITE_PROPERTIES,
  trackingAllowed,
} from "./analytics_policy.js"

const OPT_OUT_KEY = "joyce_portfolio_analytics_opt_out"
let client = null
let starting = false
let lastUrl = null
const pending = []

function signals() {
  let optOut = false
  try {
    optOut = window.localStorage.getItem(OPT_OUT_KEY) === "1"
  } catch (_error) {}
  return {
    doNotTrack: navigator.doNotTrack || window.doNotTrack,
    globalPrivacyControl: navigator.globalPrivacyControl === true,
    optOut,
    webdriver: navigator.webdriver === true,
  }
}

function enabled() {
  return trackingAllowed(window.location.hostname, window.location.pathname, signals())
}

function send(event, properties) {
  if (!client) {
    pending.push([event, properties])
    return
  }
  client.capture(event, properties)
}

function captureCustom(payload) {
  if (!enabled()) return
  const properties = customEvent(payload.event, payload.properties || {})
  if (!properties) return
  send(payload.event, properties)
}

function capturePage() {
  if (!enabled()) return
  let url
  try {
    url = sanitizedUrl(window.location.href)
  } catch (_error) {
    return
  }
  if (url === lastUrl) return
  lastUrl = url
  const locale = document.documentElement.lang === "vi" ? "vi" : "en"
  send("$pageview", { $current_url: url, locale })
}

function flush() {
  capturePage()
  while (pending.length) {
    const [event, properties] = pending.shift()
    client.capture(event, properties)
  }
  const queued = window.__joyceTrackQueue || []
  window.__joyceTrackQueue = []
  queued.forEach(captureCustom)
}

function bind() {
  window.__joyceTrack = captureCustom
  document.addEventListener("astro:page-load", capturePage)
  window.addEventListener("portfolio-lang", (event) => {
    captureCustom({ event: "portfolio_language_changed", properties: { locale: event.detail } })
  })
  document.addEventListener("click", (event) => {
    const project = event.target.closest?.("[data-analytics-project]")
    if (project && !project.closest("a")) {
      captureCustom({
        event: "portfolio_project_opened",
        properties: { slug: project.getAttribute("data-analytics-project") },
      })
      return
    }
    const booking = event.target.closest?.("[data-analytics='booking']")
    if (booking) {
      const href = booking.getAttribute("href") || ""
      const placement = booking.classList.contains("site-header__cta") ? "header" : href === "#book" ? "home" : booking.classList.contains("cta-link") ? "contact_cta" : "case_study"
      captureCustom({ event: "portfolio_booking_clicked", properties: { placement } })
      return
    }
    if (event.target.closest?.("[data-analytics='copy-email']")) {
      captureCustom({ event: "portfolio_email_copied" })
    }
  })
}

export function startPortfolioAnalytics() {
  if (client || starting || window.__joyceAnalytics) return
  if (!enabled() || !posthogProjectToken) return
  starting = true
  window.__joyceAnalytics = true
  bind()
  Promise.all([
    import("posthog-js/dist/posthog-recorder"),
    import("posthog-js/dist/exception-autocapture"),
    import("posthog-js/dist/module.no-external"),
  ]).then(([, , posthogModule]) => {
    const posthog = posthogModule.default
    posthog.init(posthogProjectToken, {
      api_host: posthogApiHost,
      ui_host: "https://eu.posthog.com",
      defaults: "2026-08-30",
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      capture_dead_clicks: false,
      capture_exceptions: EXCEPTION_CAPTURE,
      capture_heatmaps: false,
      capture_performance: false,
      disable_session_recording: false,
      disable_surveys: true,
      disable_external_dependency_loading: true,
      enable_recording_console_log: false,
      session_recording: sessionRecordingConfig(),
      rageclick: false,
      person_profiles: "identified_only",
      persistence: "memory",
      cross_subdomain_cookie: false,
      advanced_disable_flags: false,
      advanced_disable_feature_flags: true,
      respect_dnt: true,
      before_send(event) {
        if (!event) return event
        try {
          event.properties = event.properties || {}
          if (!event.properties.$current_url) event.properties.$current_url = window.location.href
          event.properties = eventProperties(event.properties)
          if (!String(event.properties.$current_url || "").startsWith(`https://${SITE_PROPERTIES.hostname}`)) return null
        } catch (_error) {
          return null
        }
        return event
      },
      loaded(instance) {
        instance.register({ ...SITE_PROPERTIES })
        client = instance
        flush()
      },
    })
  }).catch(() => {
    starting = false
    window.__joyceAnalytics = false
  })
}
