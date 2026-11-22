import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { createServer } from "node:http"
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"
import {
  customEvent,
  eventProperties,
  EXCEPTION_CAPTURE,
  maskReplayAttribute,
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

test("replay keeps public layout and masks private fields", () => {
  const recording = sessionRecordingConfig()
  const style = { tagName: "STYLE" }
  const heading = { tagName: "H1" }
  const input = { tagName: "INPUT" }
  const image = { tagName: "IMG" }
  const link = { tagName: "A" }
  const font = { tagName: "LINK" }
  const frame = { tagName: "IFRAME" }
  assert.equal(recording.maskAllInputs, true)
  assert.equal(recording.maskTextSelector.includes("input"), true)
  assert.equal(recording.maskTextSelector.includes("*"), false)
  assert.match(recording.maskTextSelector, /copy-email/)
  assert.equal(recording.maskAllElementAttributes, false)
  assert.equal(recording.recordHeaders, false)
  assert.equal(recording.recordBody, false)
  assert.equal(recording.streamNetworkBody, false)
  assert.equal(recording.captureCanvas.recordCanvas, false)
  assert.equal(recording.sampleRate, 0.2)
  assert.doesNotMatch(recording.blockSelector, /(^|,\s*)img(,|$)/)
  assert.doesNotMatch(recording.blockSelector, /(^|,\s*)svg(,|$)/)
  assert.match(recording.blockSelector, /iframe/)
  assert.match(recording.blockSelector, /#my-cal-inline-30min/)
  assert.equal(recording.maskAttributeFn("type", "text/css", style), "text/css")
  assert.equal(recording.maskAttributeFn("id", "stage", heading), "stage")
  assert.equal(maskReplayAttribute("style", "transform:rotate(-2deg)", heading), "transform:rotate(-2deg)")
  assert.equal(recording.maskAttributeFn("src", "/joyce.jpg", image), "/joyce.jpg")
  assert.equal(recording.maskAttributeFn("src", "data:image/svg+xml;base64,abcd", image).startsWith("data:image/"), true)
  assert.equal(recording.maskAttributeFn("value", "secret-prompt", input).includes("secret"), false)
  assert.equal(recording.maskAttributeFn("src", "https://app.cal.com/embed?email=person@example.com", frame).includes("cal.com"), false)
  assert.equal(recording.maskAttributeFn("href", "https://joycedoan.id.vn/contact?email=person@example.com", link).includes("email"), false)
  assert.equal(recording.maskAttributeFn("href", "https://fonts.googleapis.com/css2?family=Poppins&display=swap", font).includes("family=Poppins"), true)
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

test("installed recorder keeps css attributes and masks private text", async (t) => {
  const chrome = ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium"].find((path) => existsSync(path))
  const recorderPath = new URL("../node_modules/posthog-js/dist/posthog-recorder.js", import.meta.url)
  if (!chrome || !existsSync(recorderPath)) {
    t.skip("Chrome and the installed PostHog recorder are required")
    return
  }
  const policyPath = new URL("../src/scripts/analytics_policy.js", import.meta.url)
  const summary = await recordFixture(chrome, readFileSync(recorderPath), readFileSync(policyPath))
  assert.equal(summary.styleType, "text/css")
  assert.equal(summary.stageId, "stage")
  assert.match(summary.stageStyle, /rotate/)
  assert.equal(summary.heading, "Joyce Doan")
  assert.match(summary.imageSrc, /joyce\.jpg$/)
  assert.doesNotMatch(summary.imageSrc, /\*/)
  assert.equal(summary.svgPresent, true)
  assert.equal(summary.inputLeaked, false)
  assert.equal(summary.emailLeaked, false)
  assert.equal(summary.queryLeaked, false)
  assert.equal(summary.iframeChildCount, 0)
  assert.match(summary.cssText, /position:\s*absolute/)
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

function recordFixture(chrome, recorderSource, policySource) {
  const dir = mkdtempSync(join(tmpdir(), "replay-recorder-"))
  writeFileSync(join(dir, "recorder.js"), recorderSource)
  writeFileSync(join(dir, "policy.js"), policySource)
  writeFileSync(join(dir, "fixture.html"), `<!doctype html><meta charset="utf-8"><title>fixture</title>
<style id="page-css" type="text/css">#stage{position:absolute;width:1920px}</style>
<div id="stage" style="transform:rotate(-2deg)">
  <h1>Joyce Doan</h1>
  <img alt="" src="/joyce.jpg">
  <svg viewBox="0 0 10 10"><path d="M0 0"/></svg>
  <input value="secret-prompt">
  <p class="ph-mask">person@example.com</p>
  <a href="https://joycedoan.id.vn/contact?observe=1">Public</a>
  <iframe src="https://app.cal.com/embed"><p>booking-widget-secret</p></iframe>
</div>
<script src="/recorder.js"></script>
<script type="module">
  import { sessionRecordingConfig } from "/policy.js"
  const publish = (value) => { document.body.textContent = "REPLAY_SUMMARY " + JSON.stringify(value) }
  try {
  const cfg = sessionRecordingConfig()
  const events = []
  const stop = window.__PosthogExtensions__.rrweb.record({
    emit(event) { events.push(event) },
    checkoutEveryNms: 0,
    maskAllInputs: cfg.maskAllInputs,
    maskTextClass: cfg.maskTextClass,
    maskTextSelector: cfg.maskTextSelector,
    maskTextFn: cfg.maskTextFn,
    maskInputFn: cfg.maskInputFn,
    blockSelector: cfg.blockSelector,
    maskAllElementAttributes: cfg.maskAllElementAttributes,
    maskAttributeFn: cfg.maskAttributeFn,
    inlineStylesheet: true,
    recordCanvas: false,
  })
  const snapshot = events.find((event) => event.type === 2)
  const found = { styleType: null, stageId: null, stageStyle: null, heading: null, imageSrc: "", svgPresent: false, inputLeaked: false, emailLeaked: false, queryLeaked: false, iframeChildCount: -1, cssText: "" }
  const walk = (node, parent) => {
    if (!node || typeof node !== "object") return
    if (node.type === 3 && typeof node.textContent === "string") {
      if (node.textContent.includes("secret")) found.inputLeaked = true
      if (node.textContent.includes("@")) found.emailLeaked = true
      if (node.textContent.includes("observe=1")) found.queryLeaked = true
      if (parent && parent.tagName === "h1") found.heading = node.textContent
      if (node.isStyle) found.cssText += node.textContent
    }
    if (node.type === 2) {
      const attrs = node.attributes || {}
      const blob = JSON.stringify(attrs)
      if (blob.includes("secret") || blob.includes("observe=1") || blob.includes("person@")) {
        if (blob.includes("secret")) found.inputLeaked = true
        if (blob.includes("observe=1")) found.queryLeaked = true
        if (blob.includes("person@")) found.emailLeaked = true
      }
      if (node.tagName === "style") found.styleType = attrs.type || ""
      if (attrs.id === "stage") { found.stageId = attrs.id; found.stageStyle = attrs.style || "" }
      if (node.tagName === "img") found.imageSrc = String(attrs.src || "").slice(0, 120)
      if (node.tagName === "svg") found.svgPresent = true
      if (node.tagName === "iframe") {
        found.iframeChildCount = (node.childNodes || []).length
        if (String(attrs.src || attrs.rr_src || "").includes("cal.com")) found.queryLeaked = true
      }
    }
    for (const child of node.childNodes || []) walk(child, node)
  }
  walk(snapshot && snapshot.data && snapshot.data.node, null)
  if (typeof stop === "function") stop()
  publish(found)
  } catch (error) {
    publish({ error: String(error && error.message || error) })
  }
</script>`)
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const file = req.url === "/recorder.js" ? "recorder.js" : req.url === "/policy.js" ? "policy.js" : "fixture.html"
      res.setHeader("content-type", file.endsWith(".js") ? "text/javascript" : "text/html")
      res.end(readFileSync(join(dir, file)))
    })
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address()
      const child = spawn(chrome, [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        `--user-data-dir=${join(dir, "profile")}`,
        "--virtual-time-budget=4000",
        "--dump-dom",
        `http://127.0.0.1:${port}/fixture.html`,
      ])
      let stdout = ""
      let stderr = ""
      const timer = setTimeout(() => child.kill("SIGKILL"), 20000)
      child.stdout.setEncoding("utf8")
      child.stderr.setEncoding("utf8")
      child.stdout.on("data", (chunk) => { stdout += chunk })
      child.stderr.on("data", (chunk) => { stderr += chunk })
      child.on("error", (error) => {
        clearTimeout(timer)
        server.close()
        reject(error)
      })
      child.on("close", () => {
        clearTimeout(timer)
        server.close()
        const match = stdout.match(/REPLAY_SUMMARY (\{.*\})/)
        if (!match) return reject(new Error(`recorder fixture produced no summary: ${stderr.slice(0, 400)} :: ${stdout.slice(0, 400)}`))
        try { resolve(JSON.parse(match[1])) } catch (error) { reject(error) }
      })
    })
  })
}
