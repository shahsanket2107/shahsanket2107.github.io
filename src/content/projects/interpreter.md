---
order: 3
company: "independent"
name: "Interpreter"
slug: "interpreter"
start: 2026-09-01
end: null
tagline: "A Mac app for live English and Mandarin captions on calls and in person, labelled by speaker."
stack:
  - "Swift"
  - "SwiftUI"
  - "Python"
  - "Apple MLX"
  - "Claude API"
status: "Private. In daily use."
live: false
featured: false
---

I wanted live translation between English and Mandarin that just works, on a video call or in a room with people talking.

Interpreter shows captions a couple of seconds after each sentence, in a conversation window or a floating subtitle bar, labelled by speaker (up to 8). It picks the direction per sentence, so mixed conversations work. Audio never leaves the Mac: speech recognition and speaker detection run on device on Apple MLX, translation goes through Claude by default, and there's an on device option too.

I benchmarked each piece before choosing. Speech recognition gets 5.5 percent character error on a standard Mandarin test. Speaker labels are right 97 to 98 percent of the time on normal turn taking. A glossary keeps fixed terms right 97 to 100 percent of the time, against about 70 percent by prompting alone.

It started as a Chrome extension called LiveMandarin. Tab capture failed, so the same day I rebuilt it as a native app.
