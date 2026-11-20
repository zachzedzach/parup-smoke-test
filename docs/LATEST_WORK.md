# Latest work

## Less jitter in headline and availability motion — November 19, 2026

Fixed each animated glyph to a measured x-position while preserving pair kerning, so changing weight no longer redistributes line spacing. Limited the app wave to its welcome phrase; setup and results headings stay still. The 6.4-second wave uses a periodic 16-point curve from weight 570–730, with both phrase endpoints still. Weekday selection now updates in place instead of replacing the full screen. Syntax and whitespace checks pass. Published in commit `b842186`; [GitHub Pages run 44651728934](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44651728934) succeeded. `jsdom` and the in-app browser control were unavailable and Firefox aborted in headless mode, so post-publish visual confirmation remains outstanding.

## Headline spacing and Allo wave — November 19, 2026

Tightened the `F`–`i` pair in “Find your” with a small SVG advance adjustment. Increased the interior letters’ weight range and shortened the wave cycle to 4.8 seconds; first and last letters remain still and the measured line width remains fixed. Reduced-motion behavior remains static. Updated cache versions. Published in commit `4bee913`; Pages run [44647606386](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44647606386) succeeded. Visually checked the live installed welcome screen and confirmed the image, headline layout, and motion load.

Active project: The Fourth Club at [thefourth.club](https://www.thefourth.club/). GitHub source: [zachzedzach/parup-smoke-test](https://github.com/zachzedzach/parup-smoke-test).

## Direct touch response and calmer navigation — November 19, 2026

Removed the overlapping outgoing-screen copy, delayed entrances, and post-click animation on controls that were immediately replaced. A page now enters once from the navigation direction over 180 ms; progress follows over the same interval. Button press feedback stays on the live control in CSS, and in-place choice updates remain immediate. Replaced per-frame JavaScript writes for the Allo letter wave with browser-timed, phase-offset letter animations; the first and last letters stay still, line width remains fixed, and reduced-motion settings keep the text static. Live browser review confirmed the welcome layout, immediate profile progression, numbered experience selection and course screen. JavaScript syntax and whitespace checks pass. The jsdom stress suite is unavailable because its test dependency is absent from `/private/tmp/tfc-qa`; browser interaction checks covered the visible flow. Physical iPhone frame pacing is not measured. Published in commit `307df20`; Pages run [44645981493](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44645981493) succeeded.

## Welcome headline line break — November 19, 2026

The installed welcome view now forces “golf group.” onto its own line, matching the embedded phone preview regardless of device width and font measurement. The updated stylesheet cache version is live in commit `a6ea4cc`; GitHub Pages run [44645187063](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44645187063) succeeded. The live `/?homescreen=1&release=a6ea4cc` screen was checked: accessibility text exposes “Find your” and “golf group.” as separate heading lines, and the screenshot confirms the intended visual break. JavaScript syntax and whitespace checks pass. The jsdom stress suite could not run because its external dependency is absent from `/private/tmp/tfc-qa`.

## Published review and copy revision — November 19, 2026

Applied the remaining phone-screen annotations: shortened the seven numbered game descriptions; kept the sample-photo step and starting tees out; made the results say plainly that the golfers want to play around the same time and that playing together is optional, with both people deciding before a booking; and added the chosen game description and bio to the completion summary. Course selection remains stable in place.

Captured and inspected browser screenshots for the welcome, profile, all seven game choices, course list before and after selection, availability with separate weekday times, round details, completion, results, fit explanation, saved plans, waiting response, and accepted response. Expanded fit content and example actions remained legible above app navigation. The live course row did not move when selected. All 51 stress checks, syntax checks, and `git diff --check` pass. Published in commit `1fdd6c4`; GitHub Pages run [44633502731](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44633502731) succeeded. The published `/?homescreen=1&release=1fdd6c4` was opened and the full setup and golf-plan flow was checked live. Physical iPhone gesture, keyboard, and frame-rate behavior remain device checks.

## Published revision — November 19, 2026

Commit `46a7ed3` is live; GitHub Pages run [44620003589](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44620003589) succeeded. Course selections now update in place: nearby ordering stays anchored to the home city, selected courses do not reorder the results, and a fixed-height selection rail prevents the list moving when choices are added or removed. Full county names shown beside courses work in search; switching to A–Z preserves scroll. The optional handicap field and numbered seven-description scale are included; all seven choices fit on one phone screen. Local and live phone-width browser review confirmed stable row positions after taps. The suite passes all 51 checks; syntax and diff checks pass. Physical iPhone gesture and keyboard behavior still need device review.

## Previous published onboarding revision — November 19, 2026

Reworked the shared app’s first-run and preference setup after Zach’s nine inline comments. The welcome now has one main setup action and one optional example route. The profile step no longer asks for a sample photo. Seven experience descriptions are shorter and numbered on a quiet blue-to-pink scale. The course picker is full width and shares ordinary page scrolling without a clipped inner list; it clusters around a typed city or selected courses and sorts by area or A–Z. Weekly availability reveals one native start-time field per selected day. Removed starting-tee and unused score-history questions. The completion screen summarizes courses and day-specific starts and explains that sample golfers want to play around those times, both people decide, then the course booking happens. Footer spacing and selected states were tightened.

Local validation: 46 automated checks, syntax checks, and `git diff --check` pass. The shared app was visually clicked through from welcome to completion in a phone-width browser frame. Automated layout checks cover 320px and 390px widths. Published in commit `e89d34b`; GitHub Pages run [44614547569](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44614547569) succeeded. The live installed-app route was opened and the course list measured in the browser: its full list now expands in the main page scroll with no clipped inner wheel. The welcome and course picker were visually reviewed live; local browser checks also reviewed independent weekday inputs and the full setup flow. Detailed notes are in [ONBOARDING_QA.md](ONBOARDING_QA.md).

## Previous change — November 19, 2026

Allo variable-weight waves now animate the marketing hero and major app headings. The first and last glyph stay fixed; interior glyph weight travels across each line, with SVG text length held constant. Reduced-motion settings stop the wave. Live-browser typing check entered `Zach` once in the first-name field; the app code does not duplicate user input. Added automated checks for endpoints, fixed text lengths, accessibility text, and input persistence. See [MOTION_REWORK.md](MOTION_REWORK.md).

Published in commit `371c757`; GitHub Pages deployment completed successfully. The live homepage serves the new wave script and updated hero markup. Validation: 41 stress checks passed, JavaScript syntax checks passed, and `git diff --check` passed.

## Published November 19, 2026

Commit `f1b0a5b` is live. Continue advances the setup indicator left to right as the new page enters from the right and settles left; Back mirrors the transition. Welcome-story changes use a short opacity fade. Entering a city clusters nearby courses before a favorite is chosen; selected courses then guide the cluster. The standalone app skips downloading the hidden 260 KB marketing hero photo.

GitHub Pages run [44604061947](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44604061947) succeeded. The live homepage and app v31 return HTTP 200. All 39 stress checks, JavaScript syntax checks and `git diff --check` pass. Firefox reviewed the published first-run screens at 390×844 and 1440×1000. Physical iPhone touch, keyboard and motion timing have not been measured.

The preview uses authored example golfers and sample plans. It does not search real members, send requests, reserve tee times or connect to course inventory. Current product boundaries, deployment safety, and prior verification notes are in [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md). See [PRODUCT_FOUNDATION.md](PRODUCT_FOUNDATION.md), [BOOKING_EXPERIENCE_MAP.md](BOOKING_EXPERIENCE_MAP.md), [ONBOARDING_QA.md](ONBOARDING_QA.md), and [MOTION_REWORK.md](MOTION_REWORK.md) for detail.
