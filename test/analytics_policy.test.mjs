import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import {
  customEvent,
  eventProperties,
  sanitizedUrl,
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
  })
  assert.equal(properties.site, "joyce_portfolio")
  assert.equal(properties.environment, "production")
  assert.equal(properties.hostname, "joycedoan.id.vn")
  assert.equal(properties.$current_url, "https://joycedoan.id.vn/contact")
  assert.equal(properties.$pathname, "/contact")
  assert.equal(properties.token, "phc_example")
  assert.equal(properties.slug, "consortia")
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

test("layout initializes once and admin is not instrumented", () => {
  const layout = readFileSync(new URL("../src/layouts/Layout.astro", import.meta.url), "utf8")
  const admin = readFileSync(new URL("../src/pages/admin/index.astro", import.meta.url), "utf8")
  const workflow = readFileSync(new URL("../public/ai-workflow.html", import.meta.url), "utf8")
  assert.equal(layout.match(/startPortfolioAnalytics\(\)/g).length, 1)
  assert.doesNotMatch(admin, /posthog|startPortfolioAnalytics/)
  assert.doesNotMatch(workflow, /posthog|startPortfolioAnalytics/)
})
