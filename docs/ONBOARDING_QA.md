# Homescreen clarity and stress checks — November 19, 2026

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
