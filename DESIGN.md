# The Fourth Club design system

Preserve the chosen identity: exact original pink golf ball under the separate club layer, Allo variable font, warm paper, actual golf photography and supplied Cosmic Orange iPhone render. Do not alter approved logo artwork as incidental cleanup.

## Modes and presentation

- Homepage: Persuade. Warm cream paper, plum text, a pink headline and forest-green action. One hero statement and one route into the app. The exact golfer photograph remains visible at mobile sizes.
- Shared app: Operate. System typography, white/stone surfaces, forest-green actions, inset groups, restrained separators, native input behavior and persistent navigation. Allo only in identity and expressive welcome/completion headings.
- Welcome: one concise value statement, a clear profile-setup action, and one optional route to an example. Avoid extra intro pages and photo-upload prompts.
- Setup: six focused steps. Use seven numbered, one-line descriptions for golf experience, with a restrained warm red-to-orange-to-ochre color progression. Include an optional handicap index in the profile, a searchable course list with a compact Utah overview that follows the visible rows, individual native start-time fields per selected day, and restrained selected states. Keep the time fields in normal page scrolling; do not trap them in an internal wheel or dial.
- Completion: summarize selected courses and every selected day/time, then explain that shown golfers want to play around those times and both decide before booking.

## Tokens and behavior

App ink #20241f; secondary #62685f; action #176b50; background #f5f5f3; selected tint #e5eedb; accent #d63869. Inputs at least 16px. Primary touch targets 44–54px. Core body 15–17px. Metadata 11–13px and not the only source of actionable information. Focus ring 3px green.

Use one coordinated entrance per screen, 280ms maximum with cubic-bezier(.22,1,.36,1); exit 160ms. Button press immediate, settle <=180ms. Request state 220ms, beside its source. Drag follows the pointer; spring settles half-hour detents (420 stiffness / 40 damping). Vertical touch scrolling takes priority over dial rotation; native time/range inputs remain available. No scroll hijacking.

Welcome Allo wave is deliberate display treatment: fixed phrase width, static endpoints, sine-wave interior weights 650±45 over 5.8 seconds. No weights changing on ordinary controls or body copy. Suspend glyph updates when hidden/offscreen. Reduced-motion disables movement and glyph waves; state feedback remains.

## Composition rules

Golf plans lead with day/time/course, holes/capacity, then compact golfer photo and description. Show differences as well as fit. Save, skip and the mutual-yes preview have distinct effects. Saved/skipped plans can always be recovered. Preferences has direct section editing, not an onboarding replay. Bottom navigation stays outside scrolling content. Use normal page scrolling for setup lists and time fields. In the embedded preview, inner scrolling hands off to the outer page at boundaries. No oversized emoji/stickers, dating metaphors, fake live status, invented testimonials, or artificial loading.
