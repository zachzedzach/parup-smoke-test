# Latest work

Active project: The Fourth Club tee-time and group-preview smoke-test site in this directory.

The current product definition, partner-prototype contributions, Utah County booking-system scan, honest demo boundary, and integration steps are in [PRODUCT_FOUNDATION.md](PRODUCT_FOUNDATION.md). The page centers a course/time search, two sample golfer groups at different start times, independent join/pass choices, a configurable nearby-time wait example, and the usual course-booking fallback. Rosanna’s seven skill levels and profile/comfort controls are represented in the app preview. The sample does not use live availability, real golfers, persistent profiles, or actual bookings.

Latest update: the appointment flow is published at [thefourth.club](https://www.thefourth.club/). It includes date and tee-time cards, a custom-time choice, party size, cart/walk preference, a progress rail, capacity-aware group examples, and separate join/pass feedback. The group choice explains mutual agreement before booking; the regular course-booking path remains visible. Results stay illustrative.

Mobile and desktop Firefox screenshots were checked locally on November 18, 2026. Firefox interaction checks covered both group cards, same-time through 60-minute windows, separate join/pass feedback, profile levels, the booking handoff, reset, and a 320px viewport with no horizontal overflow. The hero photo is compressed to WebP without modifying its original JPEG, profile photos are smaller lazy-loaded WebP copies, and the mobile step strip has no numbered pills or horizontal overflow.

The standalone home-screen view (`/?homescreen=1`, also the manifest launch URL) has been refined independently from the marketing page. It reserves the iOS top safe area, gives the app header more room, enlarges the tab targets, and keeps the app content scrollable beneath the bottom tabs. Firefox screenshots were checked locally at 390×844 and 320×640; the short view keeps the tabs reachable while the app content scrolls. The installed iOS app supplies its own status and home-indicator UI. Published as part of the November 18 home-screen pass.

Remaining product work before a real launch: validate a first course/vendor integration, obtain permission to read current inventory, implement real mutual acceptance and wait notifications, and recheck availability before handoff. The current signup, Clarity, GA4 configuration gap, deployment, and recovery details remain in `README.md`.
