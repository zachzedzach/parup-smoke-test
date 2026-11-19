# Latest work

Active project: The Fourth Club at [thefourth.club](https://www.thefourth.club/). GitHub source: [zachzedzach/parup-smoke-test](https://github.com/zachzedzach/parup-smoke-test).

## Current change — November 19, 2026

Reworked the shared app’s first-run and preference setup after Zach’s nine inline comments. The welcome now has one main setup action and one optional example route. The profile step no longer asks for a sample photo. Seven experience descriptions are shorter and numbered on a quiet blue-to-pink scale. The course picker is full width and uses ordinary page scrolling; it clusters around a typed city or selected courses and sorts by area or A–Z. Weekly availability reveals one native start-time field per selected day. Removed starting-tee and unused score-history questions. The completion screen summarizes courses and day-specific starts and explains that sample golfers want to play around those times, both people decide, then the course booking happens. Footer spacing and selected states were tightened.

Local validation: 45 automated checks, syntax checks, and `git diff --check` pass. The shared app was visually clicked through from welcome to completion in a phone-width browser frame. Automated layout checks cover 320px and 390px widths. Publishing and live-site verification remain the next steps. Detailed notes are in [ONBOARDING_QA.md](ONBOARDING_QA.md).

## Previous change — November 19, 2026

Allo variable-weight waves now animate the marketing hero and major app headings. The first and last glyph stay fixed; interior glyph weight travels across each line, with SVG text length held constant. Reduced-motion settings stop the wave. Live-browser typing check entered `Zach` once in the first-name field; the app code does not duplicate user input. Added automated checks for endpoints, fixed text lengths, accessibility text, and input persistence. See [MOTION_REWORK.md](MOTION_REWORK.md).

Published in commit `371c757`; GitHub Pages deployment completed successfully. The live homepage serves the new wave script and updated hero markup. Validation: 41 stress checks passed, JavaScript syntax checks passed, and `git diff --check` passed.

## Published November 19, 2026

Commit `f1b0a5b` is live. Continue advances the setup indicator left to right as the new page enters from the right and settles left; Back mirrors the transition. Welcome-story changes use a short opacity fade. Entering a city clusters nearby courses before a favorite is chosen; selected courses then guide the cluster. The standalone app skips downloading the hidden 260 KB marketing hero photo.

GitHub Pages run [44604061947](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44604061947) succeeded. The live homepage and app v31 return HTTP 200. All 39 stress checks, JavaScript syntax checks and `git diff --check` pass. Firefox reviewed the published first-run screens at 390×844 and 1440×1000. Physical iPhone touch, keyboard and motion timing have not been measured.

The preview uses authored example golfers and sample plans. It does not search real members, send requests, reserve tee times or connect to course inventory. Current product boundaries, deployment safety, and prior verification notes are in [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md). See [PRODUCT_FOUNDATION.md](PRODUCT_FOUNDATION.md), [BOOKING_EXPERIENCE_MAP.md](BOOKING_EXPERIENCE_MAP.md), [ONBOARDING_QA.md](ONBOARDING_QA.md), and [MOTION_REWORK.md](MOTION_REWORK.md) for detail.
