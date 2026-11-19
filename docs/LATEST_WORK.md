# Latest work

Active project: The Fourth Club tee-time and group-preview smoke-test site in this directory.

The current product definition, partner-prototype contributions, Utah County booking-system scan, honest demo boundary, and integration steps are in [PRODUCT_FOUNDATION.md](PRODUCT_FOUNDATION.md). The page centers a course/time search, two sample golfer groups at different start times, independent join/pass choices, a configurable nearby-time wait example, and the usual course-booking fallback. Rosanna’s seven skill levels and profile/comfort controls are represented in the app preview. The sample does not use live availability, real golfers, persistent profiles, or actual bookings.

Latest update: commit `e199cad` is published at [thefourth.club](https://www.thefourth.club/). Its two-group search preview supports same-time through one-hour windows and separate group choices. The updated press feedback and the example photos are live; GitHub Pages completed successfully and the public page and image URLs returned successfully.

Mobile and desktop Firefox screenshots were checked locally on November 18, 2026. Firefox interaction checks covered both group cards, same-time through 60-minute windows, separate join/pass feedback, profile levels, the booking handoff, reset, and a 320px viewport with no horizontal overflow. The hero photo is compressed to WebP without modifying its original JPEG, profile photos are smaller lazy-loaded WebP copies, and the mobile step strip has no numbered pills or horizontal overflow.

Remaining product work before a real launch: validate a first course/vendor integration, obtain permission to read current inventory, implement real mutual acceptance and wait notifications, and recheck availability before handoff. The current signup, Clarity, GA4 configuration gap, deployment, and recovery details remain in `README.md`.
