import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import {
  customEvent,
  eventProperties,
  EXCEPTION_CAPTURE,
  maskReplayInput,
  maskReplayText,
  sanitizedUrl,
  sessionRecordingConfig,
  trackingAllowed,
} from "../src/scripts/analytics_policy.js"

test("tracks only the production portfolio host", () => {
  assert.equal(trackingAllowed("joycedoan.id.vn", "/", {}), true)
  assert.equal(trackingAllowed("joycedoan.id.vn", "/work/example", {}), true)
  for (const host of ["localhost", "127.0.0.1", "joycedoan007.github.io", "www.joycedoan.id.vn", "ai-radar.joycedoan.id.vn"]) {
    assert.equal(trackingAllowed(host, "/", {}), false)
  }
  assert.equal(trackingAllowed("joycedoan.id.vn", "/admin", {}), false)
  assert.equal(trackingAllowed("joycedoan.id.vn", "/admin/index.html", {}), false)
  assert.equal(trackingAllowed("joycedoan.id.vn", "/", { doNotTrack: "1" }), false)
  assert.equal(trackingAllowed("joycedoan.id.vn", "/", { globalPrivacyControl: true }), false)
  assert.equal(trackingAllowed("joycedoan.id.vn", "/", { optOut: true }), false)
  assert.equal(trackingAllowed("joycedoan.id.vn", "/", { webdriver: true }), false)
})

test("strips query strings and hashes from portfolio urls", () => {
  assert.equal(
    sanitizedUrl("https://joycedoan.id.vn/writing/hello?q=secret&utm_source=x#notes"),
    "https://joycedoan.id.vn/writing/hello",
  )
  assert.throws(() => sanitizedUrl("https://localhost/writing/hello"))
})

test("forces the portfolio site on every event and keeps the ingestion token", () => {
  const properties = eventProperties({
    $current_url: "https://joycedoan.id.vn/contact?email=person@example.com#book",
    site: "ai_radar",
    environment: "staging",
    hostname: "evil.example",
    token: "phc_example",
    email: "person@example.com",
    question: "hello",
    slug: "consortia",
    distinct_id: "0190anonymous",
    $session_id: "session-1",
  })
  assert.equal(properties.site, "joyce_portfolio")
  assert.equal(properties.environment, "production")
  assert.equal(properties.hostname, "joycedoan.id.vn")
  assert.equal(properties.$current_url, "https://joycedoan.id.vn/contact")
  assert.equal(properties.$pathname, "/contact")
  assert.equal(properties.token, "phc_example")
  assert.equal(properties.slug, "consortia")
  assert.equal(properties.distinct_id, "0190anonymous")
  assert.equal(properties.$session_id, "session-1")
  assert.equal("email" in properties, false)
  assert.equal("question" in properties, false)
})

test("accepts only explicit portfolio events with safe ids", () => {
  assert.deepEqual(customEvent("portfolio_project_opened", { slug: "01-consortia", title: "Secret" }), { slug: "01-consortia" })
  assert.equal(customEvent("portfolio_project_opened", { slug: "has space" }), null)
  assert.deepEqual(customEvent("portfolio_article_viewed", { slug: "notes" }), { slug: "notes" })
  assert.deepEqual(customEvent("portfolio_email_copied", { email: "a@b.c" }), {})
  assert.deepEqual(customEvent("portfolio_booking_clicked", { placement: "header" }), { placement: "header" })
  assert.equal(customEvent("portfolio_booking_clicked", { placement: "calendar" }), null)
  assert.deepEqual(customEvent("portfolio_language_changed", { locale: "vi" }), { locale: "vi" })
  assert.equal(customEvent("portfolio_language_changed", { locale: "fr" }), null)
  assert.equal(customEvent("$pageview", {}), null)
})

test("keeps exception and snapshot protocol fields and redacts messages", () => {
  const properties = eventProperties({
    token: "phc_example",
    distinct_id: "anon",
    $session_id: "session-1",
    $window_id: "window-1",
    $snapshot_data: [{ type: 2, text: "person@example.com" }],
    $snapshot_bytes: 12,
    $exception_list: [{ type: "Error", value: "failed for person@example.com?token=secret", stacktrace: { frames: [{ filename: "app.js" }] } }],
    $exception_message: "person@example.com failed",
    synthetic_test: "synthetic_test",
    $current_url: "https://joycedoan.id.vn/contact?email=person@example.com",
  })
  assert.equal(properties.site, "joyce_portfolio")
  assert.equal(properties.token, "phc_example")
  assert.equal(properties.distinct_id, "anon")
  assert.equal(properties.$session_id, "session-1")
  assert.equal(properties.$window_id, "window-1")
  assert.equal(properties.$snapshot_bytes, 12)
  assert.equal(properties.$snapshot_data[0].text, "person@example.com")
  assert.equal(properties.$exception_list[0].type, "Error")
  assert.equal(properties.$exception_list[0].value, "failed for [redacted]")
  assert.equal(properties.$exception_list[0].stacktrace.frames[0].filename, "app.js")
  assert.equal(properties.$exception_message.includes("@"), false)
  assert.equal(properties.synthetic_test, "synthetic_test")
  assert.equal(eventProperties({ synthetic_test: "person@example.com" }).synthetic_test, undefined)
})

test("replay masks text and inputs and samples conservatively", () => {
  const recording = sessionRecordingConfig()
  assert.equal(recording.maskAllInputs, true)
  assert.equal(recording.maskTextSelector, "*")
  assert.equal(recording.maskAllElementAttributes, true)
  assert.equal(recording.recordHeaders, false)
  assert.equal(recording.recordBody, false)
  assert.equal(recording.streamNetworkBody, false)
  assert.equal(recording.captureCanvas.recordCanvas, false)
  assert.equal(recording.sampleRate, 0.2)
  assert.match(recording.blockSelector, /iframe/)
  assert.match(recording.blockSelector, /#book/)
  assert.equal(recording.maskTextFn("  hello  "), "*****")
  assert.equal(recording.maskTextFn("   "), "   ")
  assert.equal(maskReplayText("hello"), "*****")
  assert.equal(maskReplayInput("secret"), "******")
  assert.deepEqual(EXCEPTION_CAPTURE, {
    capture_unhandled_errors: true,
    capture_unhandled_rejections: true,
    capture_console_errors: false,
  })
})

test("layout initializes once and admin is not instrumented", () => {
  const layout = readFileSync(new URL("../src/layouts/Layout.astro", import.meta.url), "utf8")
  const admin = readFileSync(new URL("../src/pages/admin/index.astro", import.meta.url), "utf8")
  const workflow = readFileSync(new URL("../public/ai-workflow.html", import.meta.url), "utf8")
  const analytics = readFileSync(new URL("../src/scripts/analytics.js", import.meta.url), "utf8")
  assert.equal(layout.match(/startPortfolioAnalytics\(\)/g).length, 1)
  assert.match(analytics, /posthog-js\/dist\/posthog-recorder/)
  assert.match(analytics, /posthog-js\/dist\/exception-autocapture/)
  assert.match(analytics, /posthog-js\/dist\/module\.no-external/)
  assert.match(analytics, /disable_session_recording: false/)
  assert.match(analytics, /disable_external_dependency_loading: true/)
  assert.match(analytics, /advanced_disable_feature_flags: true/)
  assert.match(analytics, /persistence: "memory"/)
  assert.match(analytics, /cross_subdomain_cookie: false/)
  assert.doesNotMatch(admin, /posthog|startPortfolioAnalytics/)
  assert.doesNotMatch(workflow, /posthog|startPortfolioAnalytics/)
})
