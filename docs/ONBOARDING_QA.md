# Homescreen clarity and stress checks — November 19, 2026

## Latest verification — November 19

The current suite has 39 passing checks. It covers the six-step setup, all seven game descriptions, per-day times, course search/order and city-based clustering, plan filtering/recovery, action and booking boundaries, reduced motion, awkward names, separate homepage/standalone hero-image behavior, and matched forward/back transition direction. Firefox headless inspection of the published 390×844 first-run welcome confirms the current image, copy, fixed pagination, and clear actions render without the hidden marketing page. Full physical-iPhone touch/keyboard/frame-pacing verification remains outstanding.

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
