# The Fourth Club design system

Preserve the chosen identity: exact original pink golf ball under the separate club layer, Allo variable font, warm paper, actual golf photography and supplied Cosmic Orange iPhone render. Do not alter approved logo artwork as incidental cleanup.

## Modes and presentation

- Homepage: Persuade. Warm cream paper, plum text, a pink headline and forest-green action. One hero statement and one route into the app. Three distinct golfer photographs form a responsive, touch-responsive stack at mobile sizes.
- Shared app: Operate. System typography, white/stone surfaces, forest-green actions, inset groups, restrained separators, native input behavior and persistent navigation. Allo only in identity and expressive welcome/completion headings.
- Welcome: one concise value statement, a clear profile-setup action, and one optional route to an example. Avoid extra intro pages and photo-upload prompts.
- Setup: six focused screens. Use seven numbered, concise descriptions for typical 18-hole score, with a restrained color progression and distinct score bands. Do not preselect a score for the golfer; pair each range with a short plain-language cue, and keep selected-state feedback forest green. The optional Handicap Index accepts the golfer’s displayed value, including plus indexes; the World Handicap System maximum is 54.0, with no invented lower limit for plus indexes. Keep the “Who do you want to play with?” section collapsed below the self-rating; it combines the exclusive golfer-group choice and optional score ranges. Use a searchable multi-select course list with a compact Utah overview that leaves most of the screen for course rows. Make golfer audience a mutually exclusive radio choice: Everyone, women golfers, or men golfers. Use compact weekday buttons and separate 15-minute native time fields for selected days. Keep availability in normal page scrolling; do not trap it in an internal wheel or dial.
- Completion: open example golf groups directly. Keep planning one dated round as a secondary action. The round has its own course, date, time, holes, cart choice, and public/private setting. Explain mutual approval before booking with the course. Example plans stay in the current session and do not create real calendar events.

## Tokens and behavior

App ink #20241f; secondary #62685f; action #176b50; background #f5f5f3; selected tint #e5eedb; accent #d63869. Inputs at least 16px. Primary touch targets 44–54px. Core body 15–17px. Metadata 11–13px and not the only source of actionable information. Focus ring 3px green.

Use one coordinated entrance per screen, 280ms maximum with cubic-bezier(.22,1,.36,1); exit 160ms. Button press immediate, settle <=180ms. Request state 220ms, beside its source. Drag follows the pointer; spring settles half-hour detents (420 stiffness / 40 damping). Vertical touch scrolling takes priority over dial rotation; native time/range inputs remain available. No scroll hijacking.

Welcome Allo wave is deliberate display treatment: fixed phrase width, static endpoints, sine-wave interior weights 650±45 over 5.8 seconds. No weights changing on ordinary controls or body copy. Suspend glyph updates when hidden/offscreen. Reduced-motion disables movement and glyph waves; state feedback remains.

## Composition rules

Golf plans lead with day/time/course, holes/capacity, then compact golfer photo and description. Show differences as well as fit. Save, skip and the mutual-yes preview have distinct effects. Saved/skipped plans can always be recovered. Preferences has direct section editing, not an onboarding replay. Bottom navigation stays outside scrolling content. Use normal page scrolling for setup lists and time fields. In the embedded preview, inner scrolling hands off to the outer page at boundaries. No oversized emoji/stickers, dating metaphors, fake live status, invented testimonials, or artificial loading.
