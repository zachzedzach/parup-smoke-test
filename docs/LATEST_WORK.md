# Latest work

Active project: The Fourth Club at [thefourth.club](https://www.thefourth.club/). GitHub source: [zachzedzach/parup-smoke-test](https://github.com/zachzedzach/parup-smoke-test).

## Current change — November 19, 2026

Allo variable-weight waves now animate the marketing hero and major app headings. The first and last glyph stay fixed; interior glyph weight travels across each line, with SVG text length held constant. Reduced-motion settings stop the wave. Live-browser typing check entered `Zach` once in the first-name field; the app code does not duplicate user input. Added automated checks for endpoints, fixed text lengths, accessibility text, and input persistence. See [MOTION_REWORK.md](MOTION_REWORK.md).

## Published November 19, 2026

Commit `f1b0a5b` is live. Continue advances the setup indicator left to right as the new page enters from the right and settles left; Back mirrors the transition. Welcome-story changes use a short opacity fade. Entering a city clusters nearby courses before a favorite is chosen; selected courses then guide the cluster. The standalone app skips downloading the hidden 260 KB marketing hero photo.

GitHub Pages run [44604061947](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44604061947) succeeded. The live homepage and app v31 return HTTP 200. All 39 stress checks, JavaScript syntax checks and `git diff --check` pass. Firefox reviewed the published first-run screens at 390×844 and 1440×1000. Physical iPhone touch, keyboard and motion timing have not been measured.

The preview uses authored example golfers and sample plans. It does not search real members, send requests, reserve tee times or connect to course inventory. Current product boundaries, deployment safety, and prior verification notes are in [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md). See [PRODUCT_FOUNDATION.md](PRODUCT_FOUNDATION.md), [BOOKING_EXPERIENCE_MAP.md](BOOKING_EXPERIENCE_MAP.md), [ONBOARDING_QA.md](ONBOARDING_QA.md), and [MOTION_REWORK.md](MOTION_REWORK.md) for detail.
