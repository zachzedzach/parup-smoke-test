# The Fourth Club product foundation

Updated November 18, 2026.

## Product definition

The Fourth Club helps a golfer find a tee time and know who may be in the group before booking. The golfer searches by area, course, date, party size, and preferred start time. They can preview a group’s profile photos, self-written descriptions, skill levels, pace, and playing preferences; pass or say they would join; and wait for another group within a time window they control. A group forms only after both sides agree. The golfer then completes the tee-time booking through the course’s own booking service. If no group fits, they can continue with the course’s ordinary booking path.

The product is closer to a tee-time comparison and handoff service with a people-preview and mutual-choice layer than to a social network. Golfers are choosing a round and a group, not browsing people for general contact.

## What the current public page demonstrates

The mobile-first app uses six profile screens: basic details and an optional Handicap Index; a self-rating from seven numbered typical 18-hole score bands with an optional collapsed partner-score filter; public Utah courses; selected usual days with individual 15-minute start times; group size, holes and pace; then round preferences and playing-partner visibility. The course picker uses the profile city to start near that region and shows a Utah overview that follows the visible course rows.

Finishing setup leads directly to example golf groups. A specific dated round planner remains available from the results screen. The round has its own course, date, 15-minute start, holes, cart choice and public/private setting, distinct from usual weekly availability. A public sample round can show an example request, which the host can accept or decline. Once the group agrees, the course’s booking site handles the tee time. This encourages planning a real-world round in the product concept, while the published preview itself remains a simulation.

The in-page results, profiles, mutual choice, waiting, and tee times are examples. They are not live course inventory, real golfers, actual notifications, saved profiles, calendar events, or reservations. External course links are real public booking destinations or a course directory; availability is checked and booking is completed there. Keep that boundary clear in the UI and in future copy.

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

## Seven-screen profile and round setup — November 19, 2026

The homepage phone and standalone `?homescreen=1` app share the same first-run flow. It collects a name, city, optional gender visibility preference, 0–54 whole-number handicap, short description, self-rating, desired golfer levels, public courses, separate weekday starts, usual party/holes/pace, and round style/visibility. The completion screen leads into a specific dated public/private round plan; public example requests can be accepted or declined. The plan is held only in page memory. It does not create a device calendar event, publish a real listing, contact a golfer, or reserve a tee time. Reload starts a fresh preview. The code in `assets/homescreen.js` and `.css` powers both views.

Course source: Utah UGRC GolfCourses feature service, retrieved November 18, 2026: https://services1.arcgis.com/99lidPhWCzftIe9K/ArcGIS/rest/services/GolfCourses/FeatureServer/0 . It contains 118 records (56 Public, 35 Municipal, 23 Private, 4 Resort). All source records remain in `assets/utah-courses.js`; the UI excludes Private records, defaults to north-to-south order with an alphabetical option, searches name/city/county, and supports multiple selection in a scroll-snap list. Municipal is labeled Public / municipal; Public and Resort are labeled Public access. These are access labels, not verified legal ownership claims. The dataset warns of incompleteness and can lag changes: a full statewide ownership and current-access audit remains required before claiming exhaustive coverage. The marketing phone and standalone prototype now share the same application. Geographic centroids and the locator behavior are documented in PHONE_ANNOTATIONS.md.

## Call review and iOS component research — November 18

The call requested a calm, sequential personal-preferences setup: identity/photo/two-line note, seven described skill levels, usual courses (multiple), recurring weekdays and time windows, on-course atmosphere, and example golfers who remain recoverable after passing. Do not turn recurring availability into a tee-time reservation. Keep the partner-derived seven levels. Demographic/playing-comfort choices must be voluntary and private. Do not copy personal data from the Linkster screenshots into demo records.

Reviewed Apple's Human Interface Guidelines for search fields, pickers, and entering data: https://developer.apple.com/design/human-interface-guidelines/search-fields , https://developer.apple.com/design/human-interface-guidelines/pickers , https://developer.apple.com/design/human-interface-guidelines/entering-data . Native search preserves a magnifier, placeholder, and clear affordance and updates results as typed. Course multi-selection is a checkmarked searchable list rather than a single-value rotary control. Native-looking setup uses system typography, a navigation back control, grouped inset rows with separators, blue checkmarks, and a bottom primary action outside the scrolling content. Browser controls remain HTML; they are not UIKit components. Keyboard and safe-area behavior must be checked on iPhone hardware.

Remaining gaps from the call: course ownership/current access needs a full audit; only state directory coverage is currently provided. Example partners are illustrative rather than a live preference matching engine. A real mutual response, account/profile sync, optional demographic editing, and an availability-to-course integration remain future work.

## First-launch experience map

Every standalone page load now begins at Welcome with a fresh in-memory demo profile. No previous completion, passed golfer, or answer is restored from storage. Back/Continue preserve answers during the current visit; reloading starts over. Old local-storage data is not read or deleted. The welcome explains the sequence: make it yours → find common ground → decide together. Setup then covers identity (first name required, other fields optional), seven skill descriptions, courses, recurring availability, and on-course/partner preferences before opening example partners. The first-step Back returns to Welcome rather than silently bypassing onboarding into results. The existing example mutual-interest and recoverable passed/saved choices remain. Real accounts, matching, and notifications remain outside this demo.

## Motion system — November 19

Installed and read LottieFiles' motion-design skill from `LottieFiles/motion-design-skill/skills/motion-design` at user level. Applied its causal feedback, staged arrival, and distinct entrance/exit principles alongside Apple-design and ui-animation gesture guidance. The dial now captures pointer drag on its ring, tracks angular movement continuously, and settles to half-hour detents using a damped spring with release velocity. The native range remains the keyboard/assistive fallback; only the dial owns its touch gesture, surrounding content scrolls normally. Skill and save choices update in place rather than redrawing/scrolling the screen. Finishing setup reaches a personalized plan summary with an explicit action into sample partners. Reduced motion skips spring/entrance movement. No animation dependencies or sound were added.
