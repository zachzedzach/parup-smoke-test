# The Fourth Club product foundation

Updated November 18, 2026.

## Product definition

The Fourth Club helps a golfer find a tee time and know who may be in the group before booking. The golfer searches by area, course, date, party size, and preferred start time. They can preview a group’s profile photos, self-written descriptions, skill levels, pace, and playing preferences; pass or say they would join; and wait for another group within a time window they control. A group forms only after both sides agree. The golfer then completes the tee-time booking through the course’s own booking service. If no group fits, they can continue with the course’s ordinary booking path.

The product is closer to a tee-time comparison and handoff service with a people-preview and mutual-choice layer than to a social network. Golfers are choosing a round and a group, not browsing people for general contact.

## What the current public page demonstrates

The marketing page points to a mobile-first, interactive sample search. It includes Utah County course selection, a sample date, a start time, party size, a 0–60 minute match window, two example groups at different start times with photos and descriptions, independent join/pass actions, a sample wait option, and a course-booking handoff. The second example appears when the selected window includes its later start time. The profile screen carries the partner prototype’s seven named skill levels, self-written description, pace, profile visibility control, and user-selected playing-comfort preferences.

The in-page results, profiles, mutual choice, waiting, and tee times are examples. They are not live course inventory, real golfers, actual notifications, saved profiles, or reservations. External course links are real public booking destinations or a course directory; availability is checked and booking is completed there. Keep that boundary clear in the UI and in future copy.

## Partner prototype contributions

The public [`rmurray9/golf-partner-app` prototype](https://github.com/rmurray9/golf-partner-app) contributes useful product work: seven self-selected playing levels, profile photos and descriptions, pace and schedule context, match preferences that users control, mutual consent, visibility controls, and the idea that golfers should see enough context to decide whether the round feels right. These ideas are represented in the sample profile and group flow here. The current project only reads that repository; it does not push changes there or use its database.

The current prototype does not assume a golfer’s gender or make a gender-based default. Playing-comfort choices are optional and user-controlled. Avoid copy that casts golf as a dating service or turns golfers into ranked profiles.

## Utah County market observations

Public tee-time search already exists. [`Ready Golfer’s Provo page`](https://www.readygolfer.co/provo-tee-times) lists local courses and links visitors to booking destinations; [`TeeSheets`](https://teesheets.golf/utah/provo-orem) and [`OneTee`](https://tee-times.oneteeapp.com/utah/) also collect local course availability. Course systems are fragmented rather than one uniform inventory feed:

- Fox Hollow, Cedar Hills, Hobble Creek, and TalonsCove link to MemberSports booking pages.
- Thanksgiving Point, Sleepy Ridge, and Gladstan link to foreUP booking pages.
- The Ranches links to TenFore.
- The Oaks at Spanish Fork publishes its own municipal booking page and booking rules.
- Some pages render dynamically or deny automated page extraction, so this review covers publicly linked systems and their visible booking model, not every calendar step in an authenticated browser session.

The common pattern is a search for a course/date/time and party size, followed by the provider or course’s booking flow. This points to a focused difference for The Fourth Club: show the golfer and group context before the handoff, collect a yes from each side, and keep a nearby-time search or regular-booking fallback. An inventory feed and a reliable handoff must come from each course/vendor relationship; the public pages do not establish a shared integration API.

Sources reviewed:

- [Ready Golfer: Provo tee times](https://www.readygolfer.co/provo-tee-times)
- [TeeSheets: Provo–Orem tee times](https://teesheets.golf/utah/provo-orem)
- [OneTee: Utah tee times](https://tee-times.oneteeapp.com/utah/)
- [Fox Hollow Golf Course](https://foxhollowutah.com/)
- [Cedar Hills Golf Club](https://www.cedarhillsgolfutah.com/)
- [Hobble Creek Golf Course](https://www.springvilleutah.gov/golf/)
- [TalonsCove Golf Club](https://www.talonscove.com/)
- [foreUP online-reservation groups](https://foreup.zendesk.com/hc/en-us/articles/1260806936950-How-to-Create-and-Manage-Online-Reservation-Groups)

## Scope for the next implementation

1. Keep the live smoke test clearly labeled as an example and make the course/group path understandable without scrolling through unrelated marketing claims.
2. Validate the smallest useful launch area with course operators and one or two booking vendors. Confirm inventory access, booking-window rules, party-size limits, rescheduling/cancellation ownership, and handoff behavior before promising live comparison.
3. Add real course inventory only after that access exists. Recheck a slot before sending a group to book; do not say the reservation is complete until the course confirms it.
4. Implement durable mutual-yes, match-window alerts, and profile visibility controls with clear consent and pause/delete behavior before inviting real golfers.
5. Expand vendor and course coverage only after the first integration’s availability and booking handoff stay accurate.

The current static preview is not an inventory connector or a matching backend. The existing newsletter, Clarity setup, and GitHub Pages delivery remain separate from those future product capabilities.

## Design references

The current review applied the upstream [Emil Kowalski design-engineering skill](https://github.com/emilkowalski/skills) and [interface-skills better-ui guide](https://github.com/pipshea/interface-skills/tree/main/skills/better-ui): make the next action obvious, use movement only to explain a state or acknowledge an action, keep control feedback brief and interruptible, avoid broad transitions, and respect reduced-motion settings. The local `unslop-ui` checklist helped remove redundant copy and decorative numbered markers. We checked the [AI for UI skills catalog](https://aiforui.dev/skills) for relevant design and motion workflows. The hero remains expressive, while the phone flow uses simple controls and sample data that visibly react.
