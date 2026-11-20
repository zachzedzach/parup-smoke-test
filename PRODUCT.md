# The Fourth Club

The Fourth Club helps golfers find people to play with around their usual courses, days, start times and playing preferences. It adds group context and mutual agreement before the ordinary course booking process. It is about playing golf together.

## Audience and promise

Golfers across experience levels, including women seeking other women to play with, beginners and people joining with a friend. Show profile photos and descriptions, a seven-level self-rating and a separate seven-level playing-partner filter, handicap, courses, independent weekday start times, flexibility, holes, party size, pace, cart choice, atmosphere and private partner preferences. After setup, show example groups that fit the golfer’s usual schedule. Keep planning one dated round as a secondary action. Golfers whose preferences fit a public round may ask to join; the host can accept or decline before booking. No swipe or romantic framing.

## Current product boundary

A published interest test and interactive frontend preview, not a working reservation or matching service. Example golfers, matches and round requests are labeled. A dated round plan stays in the current session; it does not create an event in the device calendar or publish to real golfers. Requests and replies are simulations. Course availability, prices and reservations remain on course websites. Onboarding entries stay in the current session; reload begins fresh. No user photo upload. Signup is optional, connected to an existing private Google Sheet through Apps Script; Clarity is configured and app input regions masked. No private credentials in browser assets. GA4 is not configured.

## Surfaces

Homepage persuades through one promise and the actual working app. Supplied iPhone PSD artwork frames the shared embedded app. `/?homescreen=1` and installed web-app mode show the same UI full-screen without fake hardware/status bars. Both use assets/homescreen.js and .css. site.js owns signup and site analytics only.

## Source and scope

Course directory: state UGRC dataset, 118 source records, 23 private excluded. It is not a verified exhaustive inventory. Partner work is represented through seven levels, golf-style content and recoverable golfers/plans; do not change rmurray9/golf-partner-app. See docs/NIGHT_DESIGN_RESEARCH.md and docs/BOOKING_EXPERIENCE_MAP.md.
