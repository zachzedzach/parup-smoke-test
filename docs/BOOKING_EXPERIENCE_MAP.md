# Booking expectation review — November 19, 2026

## Current flows inspected

Observed public booking UI in the in-app browser (no reservation or payment submitted):

- Fox Hollow → MemberSports: https://app.membersports.com/tee-times/15396/18907/0 . Exact date navigation and a tee-sheet list; each slot exposes start time, front/back start, player capacity, allowed holes, walking/riding and price. Apply Filters opens start time, riding/walking, holes and players. The slot lists demonstrate why a single “time” cannot imply every player count or round length fits.
- Thanksgiving Point → foreUP: https://foreupsoftware.com/index.php/booking/19645/2034 . Public/Corporate/Passholder/League category gate precedes the public date, time-of-day, player-count and hole controls. Actual slots show holes, course, start, available player count and fee. Booking rules and seasonal cart-path notice appear in this path.
- Cedar Hills official website: https://www.cedarhillsgolfutah.com/ . Currently publishes front-nine-only operation, with a second reservation 2½ hours later for an 18-hole re-round and early check-in. Its Book Tee Time links to MemberSports. The site/policy was reviewed; no authenticated checkout was attempted.
- Thanksgiving Point facts: https://www.thanksgivingpointgolfclub.com/faqs/ . Advance booking windows are course policy and can differ by customer category. Do not infer one shared booking horizon.

This is a focused sample of two booking vendors and three course entry points, not a complete Utah checkout audit. Live prices and notices above are observations, not values to hardcode in this app.

## Experience map and expectation gaps

| Stage | Familiar course-site expectation | Risk in Fourth Club | Change / boundary |
| --- | --- | --- | --- |
| Enter | Browse a tee sheet immediately | Six profile questions look mandatory to book | Welcome describes group finding; this remains a preferences-first group preview, not an inventory sheet |
| Availability | Specific date and available slot | Friday 7 AM reads as an actual tee time | Explicit weekly availability copy; plan marked weekly preference, suggested start, not reserved |
| Round details | Holes, player count, cart and fee | Profile interests were mixed with bookable constraints | Separate usual round length and number coming with you from social interests |
| Results | Slot with capacity and price | People/cards imply matches or held inventory | Plan first, shared time/course explanation; examples generated from preferences, not live inventory |
| Request | Booking or slot hold begins | “Ask” could be mistaken for reservation | Pending answer state explicitly says nothing booked or held |
| Agreement | Booking summary / payment | Mutual yes looked like completion | Separate illustrative accepted-reply step, then course-website handoff |
| Handoff | Selected date/players carried into checkout | Generic link silently drops choices | Explain manual exact date, actual availability, total party size, fees, cart and booking policy checks; no automatic transfer claim |
| Confirmation | Booking reference from course | App might show success too soon | No booking-confirmed state; only the course can confirm |
| No group | Continue normal booking | Visitor trapped waiting for group | Existing marketing preview retains booking fallback; standalone can use course handoff after illustrated agreement |
| Controls | Calendar and direct fields | Dial looks like a tee-sheet clock | Dial edits a named recurring weekday, with direct time input and keyboard slider fallback |

## Implemented

Added party-size and hole preferences; clearer recurring schedule copy; weekly/not-reserved plan context; a three-stage group→agreement→course map; explicit pending and accepted-example states; external course links for Fox Hollow/Cedar Hills/Thanksgiving Point and statewide UGA directory fallback. Handoff copy identifies destination and states selections are not automatically transferred. Removed “You’re in” completion wording in favor of “Your preferences are ready.” No prices, live slots, real holds, real requests, or bookings are fabricated.

## Remaining integration work

The demo generates illustrative golfer plans from entered preferences. Real search must separately track exact date, live inventory, price/cart inclusion, party capacity, course restrictions, booking horizon and inventory expiry. Mutual group acceptance cannot hold a slot without a vendor-supported hold. Decide who books the combined party and how confirmation, cancellation and refunds propagate before enabling real bookings. No account was created and no tee time reserved during this review.
