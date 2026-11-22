export function queueTrack(event, properties = {}) {
  if (typeof window === "undefined") return
  const payload = { event, properties }
  if (typeof window.__joyceTrack === "function") window.__joyceTrack(payload)
  else {
    window.__joyceTrackQueue = window.__joyceTrackQueue || []
    window.__joyceTrackQueue.push(payload)
  }
}
