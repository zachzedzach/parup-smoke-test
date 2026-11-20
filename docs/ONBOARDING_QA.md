# Onboarding QA — November 19, 2026

## Seven-level colorway and Utah overview — November 19

The seven numbered golf-game descriptions use a warm red, orange, ochre, and brown sequence drawn from the supplied Utah palette references. Each choice receives a light color tint and a stronger selected state, while labels remain dark. The course step includes a compact Utah map beside the bounded list; its area band and highlighted dots follow the rows currently in view. Search, sort, and entering the step repaint the map, and a city entered in profile still places the list near that region. `node --check` passes for the app and stress-test script; `git diff --check` passes. The stress-test script cannot run because `jsdom` is not installed. The Impeccable detector ran; it returned general homepage warnings and advisories. Browser visual confirmation was attempted, but the browser control reports `browser.user is unavailable`.

## Handicap slider — November 19

The optional index is now unset by default. Selecting “I keep a handicap index” reveals a range from plus 10 through 54, in 0.1 increments; its live readout uses golf notation (for example, +2.1). Disabling the option clears it. The selection is included in the profile and completion summaries. The stress suite now covers opt-in, slider changes, plus-index formatting, summary display, and clearing. JavaScript syntax and whitespace checks pass; the jsdom interaction suite could not run because the dependency is absent. Commit `9ef8791` is live; Pages run `44654308984` succeeded, and JS/CSS v43/v45 were confirmed live.

## City-based course starting point — November 19

Entering “Provo,” “Provo, UT,” “Provo Utah,” or “Provo, Utah County” identifies Provo and Utah County. Exact-city courses lead the list, followed by other courses in the county; the picker opens at the matching area. Other Utah city inputs follow the same city/county rule, and a county name can be entered directly. The list uses a bounded touch-scroll area. Search and order changes retain the first visible course when it remains in the results. Direct matching checks also covered “Provo, Utah, United States” and “Orem, UT.” JavaScript syntax and whitespace checks pass. `tests/homescreen-stress.cjs` was updated, but could not run because `jsdom` is not installed. Commit `a2ac58f` is live; Pages run `44653586117` succeeded. Live assets were confirmed, but interactive visual confirmation was unavailable because the in-app browser control was unavailable in this session.

## Motion jitter correction — November 19

The wave uses measured, fixed x-coordinates for each glyph, preserving pair kerning instead of constraining the whole line with SVG `textLength`. Only the welcome phrase animates; setup and results headings stay still. Its 6.4-second periodic wave uses 16 samples from weight 570–730, with the first and last glyph stationary. Weekday chips and schedule details update in place rather than rerendering the screen. Reduced-motion remains static. Syntax and whitespace checks pass. Published in `b842186`; GitHub Pages run `44651728934` succeeded. The browser automation was unavailable and `jsdom` is missing, so the visual walkthrough remains outstanding.

## Headline detail — November 19

The “Find your” welcome heading applies a small optical adjustment to the `F`–`i` pair. The “golf group.” letters now move through a wider weight range on a 4.8-second wave, with the first and last glyph still, fixed line width, and reduced-motion support. Published as `4bee913` (Pages run `44647606386`, successful); live installed welcome view visually checked after deployment. Syntax and whitespace checks pass. Automated stress suite remains unavailable in this environment because `jsdom` is missing.

## Latest revision — November 19, 2026

Navigation uses one 180 ms directional entrance with no delayed start or fading duplicate page. Controls keep direct pressed-state feedback while choices update in place. The Allo letter wave is browser-timed per glyph rather than updated from a JavaScript animation-frame loop; its first and last characters stay still, and each line retains its measured width. Reduced-motion settings disable the wave.

The welcome screen now places “golf group.” on a dedicated second line in both the installed view and embedded preview, avoiding device-dependent inline wrapping.

The profile accepts an optional handicap index and carries the selected numbered game description and short bio into the completion summary. All seven concise descriptions fit in one phone screen, use no rank titles, and retain the experience progression. Results now state that golfers want to play around the visitor’s usual times, that choosing a plan is optional, and that both people decide before anyone books.

## Latest verification — November 19

All 51 automated stress checks pass. Captured and reviewed browser screenshots of the published phone app at `/?homescreen=1&release=1fdd6c4`: first-run welcome, profile, all seven game choices, Utah course search before/after selection, weekly availability with Friday 4:30 PM and Sunday 10:30 AM, round details, round style, profile summary, results, expanded “Why this round?” explanation, waiting-for-reply state, and accepted example. The selected course kept its original position; selected count and course chip updated in place. Results identify same-time golfers before presenting course, open places, golfer photo and description, and the optional “Tell [name] I’m in” action. Waiting and accepted states say they are examples and that no real golfer is contacted. Setup carries each independent weekday time into the summary. The mobile layout uses ordinary page scrolling and fixed actions; hardware-specific gestures, keyboard behavior, and frame rate still require a physical iPhone.

The full suite covers the six-step setup, seven numbered descriptions, independent weekday starts, area/A–Z search and home-city clustering, stable course selection, plan filters/recovery, save/skip/request/accept flows, booking boundaries, reduced motion, difficult names, responsive width checks, and forward/back direction. The live installed-app welcome, immediate profile progression, selected experience state, and course screen were visually checked. JavaScript syntax and whitespace checks pass. The jsdom stress suite was unavailable in this check because its test dependency is absent from `/private/tmp/tfc-qa`. Physical-iPhone keyboard, safe-area, gesture, and frame-pacing checks remain hardware-only.


## Intended experience

Preferences describe golf, not social interest in a person. Each chosen weekday has its own start time. The dial edits the explicitly chosen weekday. Results lead with day/time/course and explain that the example golfer wants to play that round. Requesting a round means asking to golf; the other golfer can accept or decline. No real golfer is contacted, no reservation is made, and generated example plans are labeled as examples based on preferences.

## Findings and fixes

- One start time incorrectly represented all weekdays. Added independent time inputs and per-day dial selection; values survive Back/Continue and deselection/reselection.
- Large portrait cards obscured the task. Replaced them with golf-plan cards, compact golfer context, a shared-window explanation, and “Ask to play this round.”
- “Interest sent” was ambiguous. Request feedback now explains accept/decline and that nothing is booked.
- Empty days still led to generic people. Empty schedules now produce an explicit no-plans state directing visitors to Preferences.
- Everyone could coexist with narrower partner choices. Selecting Everyone clears other choices; selecting a specific group clears Everyone.
- Long values could escape the plan layout. Added wrapping to plan details and summary and fixed image sizing.

## Automated checks

`tests/homescreen-stress.cjs` runs with Node plus jsdom. The jsdom install used for this review is outside the repo at `/private/tmp/tfc-qa`; it is a test-only dependency. Run `NODE_PATH=/private/tmp/tfc-qa/node_modules node tests/homescreen-stress.cjs` in this checkout. Tests are excluded from the Pages allowlist.

13 checks passed: empty required name; single-letter, long, CJK, Arabic, apostrophe and HTML-shaped names; separate Friday 16:30 / Saturday 07:00 / Sunday 10:30 schedules and result context; conflicting preference resolution; no days/no plans; save/pass/revisit/repeated request; missing course query and apostrophe search; 20 Back/Continue cycles; clean reload. Animation APIs are mocked in these checks, so they do not establish visual smoothness or frame rate.

## Remaining limits

The people and plans are sample data built around selected schedule/course preferences, not an actual search or ranking service. Partner demographic choices do not filter a real population. Live course inventory, real mutual acceptance, and notifications remain outside this preview. Physical iPhone keyboard/safe-area and gesture behavior require hardware checks. Browser visual verification of this revision is recorded in LATEST_WORK.md after deployment.

Live browser check at 320×640: entered the long Polish name, chose Friday/Saturday/Sunday, set 16:30/07:00/10:30 independently, finished all steps, and confirmed those exact times in the completion summary and Friday/Saturday plan headings. Screenshot inspected for wrapped summary, readable instructions and plan-first hierarchy. Browser viewport reset after testing. This check exposed two residual ambiguities: a single “Usually” time repeated below per-day times and a sample bio referring to after-work golf on a Saturday example. Removed both; also removed the redundant broad time-window choices so the per-day starts are the sole schedule source. Time input display now normalizes to the accepted half-hour range. All 13 tests passed again after these fixes.

## Shared-app revision — November 19

24 automated checks now pass. Added shared embedded mounting/unique IDs/private-course exclusion, sample shortcut and distinct starts, tolerance filtering, two-person capacity, holes, direct section editing/save/back, day filtering and skip recovery, direct booking before requesting, full reset, private partner preferences against fictional profile categories, and reduced-motion navigation with zero WAAPI calls.

Local in-app browser walkthrough: profile name/city/two lines/sample photo, seven skill levels, Fox Hollow search/selection, Friday 16:30/Saturday 07:00/Sunday 10:30. Keyboard ArrowRight on the Saturday slider changed only Saturday to 07:30. Completed all six steps with the exact independent schedule reflected at completion. Screenshots inspected at 320×640 and 390×844. Homepage width checks: 320/390/768/1280, no document or inner app horizontal overflow. Tablet initially misplaced the phone; correction yields a 390px hardware frame at 768px page width.

Nested scroll verified in the actual embedded app: at inner bottom 1909px, another downward scroll moved outer page Y from 1106 to 1440.5 while inner stayed at bottom. At inner top 0, upward scrolling moved outer Y from 1440.5 to 928.5. Request → preview acceptance showed the official Fox Hollow link and explicit manual reservation handoff. Signup dialog still opened normally; no email was submitted in this pass. No captured browser warnings/errors. Physical iPhone gesture/keyboard and measured frame rates remain outside these checks.

Published verification: 102df1d deployment succeeded. On the live standalone app, selecting Women golfers returned the two authored fictional profiles Alex and Casey; keyboard Space saved Alex, Saved showed the plan, requesting and previewing acceptance exposed the official Fox Hollow link. At 390px the root and visible viewport measured 844px high and document width stayed 390px. No captured warnings/errors. The temporary viewport was reset.


## Course-selection stability review — November 19

Selecting or removing a course updates its checkmark and the selected-course rail in place. The results are anchored to the home city and no longer reorder around the most recently selected course. A reserved 48px selection rail prevents the list from moving when the first course is added or the last is removed. The entire course catalog remains in the main page scroll. Search accepts the displayed full county name, and switching between By area and A–Z preserves the scroll position.
