---
order: 3
company: "independent"
name: "LiveMandarin"
slug: "livemandarin"
start: 2026-09-01
end: 2026-09-01
tagline: "An offline Mac menu bar app for live Mandarin and English captions of any system audio."
stack:
  - "Swift"
  - "SwiftUI"
  - "ScreenCaptureKit"
  - "Python"
  - "Apple MLX"
status: "Open source. Runs fully on device."
live: false
featured: false
---

I wanted live captions for Mandarin audio on my Mac, from anything: a video call, a stream, a recording. Nothing sent to the cloud.

It's a menu bar app in Swift with a small local Python server running on Apple MLX. All the models are off the shelf: Qwen3 ASR for speech, MiLMMT or Apple Translation for translation, and ERes2NetV2 to colour captions by speaker.

I benchmarked model by model before choosing, and the README has the numbers. An 8 bit speech model matched full precision while running 30 percent faster. A glossary kept terms right 97 to 100 percent of the time, against about 70 percent by prompting alone.

It started as a Chrome extension. Tab capture failed, so the same day I rebuilt it as a native app.

Code: [github.com/shahsanket2107/livemandarin](https://github.com/shahsanket2107/livemandarin).
