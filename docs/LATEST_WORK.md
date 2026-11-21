## Current change — November 21, 2026

Expanded public-round visibility choices by default on the final setup screen. Bumped homescreen JS to v80.

## Current change — November 21, 2026

Added “You can change this later” to the usual-round introduction. Bumped homescreen JS to v79.

## Current change — November 21, 2026

Moved the Utah locator beside the course search at the top of the course picker. The course list stays full width, with less vertical space spent on the map. Bumped app assets to homescreen JS v78 and CSS v74.

## Current change — November 21, 2026

Changed nearby course ordering to keep city and county matches together, then sort each group north to south so the map’s visible-area band follows the list consistently. Bumped the homescreen script cache version to v77.

## Current change — November 21, 2026

Enlarged the Utah course locator in the course picker to 62×87px so it reads clearly beside the full-width list. Bumped the homescreen stylesheet cache version to v73.

## Current change — November 21, 2026

Changed the empty bio field’s placeholder to “Enter your bio here.” Bumped the homescreen script cache version to v76.

## Current change — November 21, 2026

Changed the browser and Messages preview titles to “The Fourth Club – Golf match” to test whether the en dash keeps the brand visible in Messages. `og:site_name` remains “The Fourth Club.” Use a fresh URL when checking Messages because link cards may be cached.

## Current change — November 21, 2026

Separated the browser title from the Messages preview title. Browser tabs use “The Fourth Club: Golf match”; Open Graph uses “Golf match” with “The Fourth Club” as the site name, following [Apple’s Messages preview guidance](https://developer.apple.com/documentation/technotes/tn3156-create-rich-previews-for-messages). This lets Messages show the concise page title while the browser keeps the branded title.

## Current change — November 21, 2026

Updated the browser title and Open Graph title to “The Fourth Club: Golf match,” replacing “Better than random.” Published in commit `da92b8d`; GitHub Pages run [44944546195](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44944546195) passed. The live page now serves the new title. Previously generated share cards may continue showing their cached title.

## Current change — November 21, 2026

Restyled “Open the full-screen preview” as a green button with an arrow. On touch devices, the first tap anywhere on the preview phone opens it full screen without activating the tapped in-app control; the next tap works normally. Regression coverage now checks a nested app button, and a 390×844 page capture confirms the CTA treatment. The Canvas report screenshot says the Interest Tests Report is due Saturday, Nov. 21 at 11:59 p.m.; it calls for Wow Factor and $100 first, then a Wizard of Oz test with at least three people outside friends and family, observing behavior against a pass bar set before testing. Field plan: share the phone view with three participants. All 27 checks pass. Commit `8213910` is live; GitHub Pages run [44938408428](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44938408428) succeeded, and the live page serves the updated CTA stylesheet.

## Current change — November 21, 2026

The first profile screen’s name, city, and bio fields now have a tinted fill and a clear green-gray outline against the white page. Focus adds a stronger green ring. Updated the homescreen stylesheet cache version. `npm test` passes all 27 checks; a 390×844 render confirms the field edges read clearly. The live page serves homescreen CSS v72. Physical iPhone review is not available in this environment. Commit `1483832` is live; GitHub Pages run [44937763742](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44937763742) succeeded.

## Current change — November 21, 2026

The marketing hero now cycles through the existing golf photos on each visit, and the iPhone welcome screen uses the same visit’s lead photo. A device-local counter chooses a new three-photo set on the next load; only those three are requested, and installed-app mode still skips marketing-photo downloads. Updated the image descriptions to match the rotating content and bumped site/app script cache versions. All 27 interaction checks, syntax checks, and whitespace checks pass. Commit `30db23d` is live; GitHub Pages run [44937204144](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44937204144) succeeded.

## Current annotation pass — November 21, 2026

Worked through the eight browser annotations: the profile asks “Write a line or two about yourself”; golfer group and score preferences share one “Who do you want to play with?” disclosure below the self-rating; the Utah locator is larger; availability and usual group-size prompts use direct language; public-round visibility has a visible optional label and chevron; sample rounds use the selected days, time window, holes and course, with a clear explanation when no sample profile fits; and the launch signup says the app is not in the stores yet and offers one launch email. Desktop visits to `/?homescreen=1` return to the main site, while phone-size and installed-app views keep the full-screen preview. Updated product docs and cache versions (site CSS, app JS v74, app CSS v71). `npm test` passes all 27 interaction checks; JavaScript syntax and whitespace checks pass. 390px screenshot shows the full-screen app, and 1440px screenshot shows the main site. Live assets and copy are verified. Physical phone behavior was not tested. Commit `3672155` is live; GitHub Pages run [44936424008](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44936424008) succeeded.

## Current change — November 21, 2026

Changed the profile bio prompt to “Write a line or two about yourself:” so it plainly asks for a short introduction. Bumped the app script cache version to v73.

## Current change — November 20, 2026

Clarified the self-rating as the score a golfer usually shoots over 18 holes. The course picker now trims repeated labels and spacing, uses a compact Utah locator, and gives its course list more height and the full row width. Partner audience is a native one-choice radio group, so Everyone cannot be selected with women or men golfers. The results screen now explains the sample action and removes extra space around the schedule, filters, and cards. Bumped the app asset URLs to JS v69/CSS v67. `npm test` passes all 27 interaction checks. Captures at 390×844 were reviewed for the score, course, group-preference, and results screens; a 1440×900 capture checked the welcome layout. Physical iPhone touch behavior was not tested. This supersedes the earlier audience multi-select note below.

## Current change — November 20, 2026

Restored a decimal Handicap Index slider on the profile screen, starting at 0.0, with exact text entry alongside it. The slider displays plus indexes with a `+` sign; exact entry retains plus indexes beyond the slider’s +10.0 endpoint, and ordinary indexes remain capped at 54.0. The USGA confirms 54.0 as the maximum issued Handicap Index and documents plus indexes as values better than scratch. Local `npm test` and GitHub Actions both pass all 27 interaction checks, including decimal slider movement and plus-index entry. The live page uses homescreen assets v68/v66 to bypass iPhone caches; deployment [44826240510](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44826240510) succeeded.

## Current change — November 20, 2026

Replaced the obsolete onboarding stress checks with 27 checks for the current six-screen flow, course selection, availability, matching, booking links, and dated-round planning. Added a locked `jsdom` test dependency and made the GitHub Pages deploy job wait for the test job. Dated-round planning now says “Plan a specific round” and clarifies that the usual weekly schedule stays the same. Local `npm test`, JavaScript syntax checks, and `git diff --check` pass.

## Current change — November 20, 2026

The score choices now have seven short cues, no range is selected automatically, and the instruction says the estimate can change later. Selection uses the app’s forest-green state, while score-range colors stay on the numbered markers. The score may be left unset and is shown as “Not set” in preferences. The example group seat label now reads “Room for you” or “Room for your group.”

Verified in a local browser at phone width: score list before and after selection and the group-results card. Targeted jsdom checks confirm no default score, single selection, optional skip, and corrected capacity copy. JavaScript syntax and `git diff --check` pass. Published in commit `274a27e`; GitHub Pages run [44823265778](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44823265778) succeeded. The cache-busted live page references app assets v67/65. The historical stress suite still contains assumptions for an older setup flow; this pass did not treat its partial run as a passing regression check. Impeccable’s changed-file scan flagged inherited landing-page patterns outside these edits. Physical iPhone review remains outstanding.

## Previous current change — November 20, 2026

Reworked onboarding in response to the latest usability review. Setup is six screens; the optional partner-score filter is tucked under the self-rating, while the separate group audience question is labeled distinctly. Replaced the vague bio field label, clarified group size with one-to-four-player choices, and simplified round preferences. Course map now sits above a full-width course list. Availability uses weekday buttons and shows time fields only for chosen days. Profile completion opens example groups directly; planning one dated round is secondary. The round planner is single-column, with optional details collapsed. Set the handicap field to a 16px input font to prevent iOS focus zoom and removed tap highlights from app controls. Handicap uses an optional entry for a standard index, including plus values; non-plus indexes cap at 54.0, and no unsupported lower bound is imposed.

Research: USGA Rules of Handicapping define 54.0 as the maximum Handicap Index and format better-than-scratch indexes with a plus sign. Apple’s onboarding guidance favors brief, optional setup; iOS guidance favors focused tasks and fewer simultaneous controls. Sources: [USGA Rules of Handicapping](https://www.usga.org/content/dam/usga/pdf/2024-revision/2024-Rules-of-Handicapping-USGA.pdf), [Apple Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding), [Apple Designing for iOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-ios).

Local verification: JavaScript syntax and whitespace checks pass. GitHub Pages deployment run [44820751884](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44820751884) succeeded for commit `ba5349a`; a cache-busted live request returned HTTP 200 and confirmed the published app assets are version 66/64. The interaction suite still contains assumptions for the previous onboarding order and needs a focused refresh before it can serve as a full regression check. The mobile takeover flow is covered by an updated expectation. Physical iPhone review remains outstanding.

## Previous change — November 20, 2026

Removed “Nonbinary” from the profile’s gender choices at the owner’s request. “Woman,” “Man,” and “Prefer not to say” remain. Bumped the app script cache version so the published site loads the change.

Clarified the app preview introduction. The old “Your Friday afternoon and Saturday morning can be different” line is now “Choose your usual courses and times. See who wants to play around then.”

GitHub Pages failed three deployments because the deploy step could not find the uploaded Pages artifact. Added a short wait after upload to allow its metadata to become available. Commit `e3bef2d` deployed successfully in run [44813961058](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44813961058); a cache-busted live page check confirmed the revised line.

On touch devices, the first tap anywhere inside the phone preview, including on an app button, opens the full-screen app; its tap is not sent to the embedded app until after expansion. Desktop clicks and subsequent expanded-app interactions remain unchanged. Verify the button-entry flow on physical iPhone after publishing.

## Clear playing levels and round preferences — November 20, 2026

Reworked the final onboarding choices into four paired, plain-language preferences: conversation, competition, music, and tips. Each topic makes clear what the choice describes, and selecting one option in a pair clears its opposite. The old golf slang is gone. The level filter directly follows the self-rating and now explicitly says it filters score ranges the golfer is happy to play with. Tightened all seven numbered descriptions to one clear 18-hole score band plus a practical cue; the restrained color progression is carried by a light tile tint and number, without the extra side stripe. The experience remains skippable and the choices can be changed later. All 68 app interaction checks, JavaScript syntax checks, and whitespace checks pass. Impeccable’s scan reports pre-existing page-level findings outside this onboarding change.

## Quarter-hour availability and clear matching windows — November 20, 2026

Kept each weekday’s independent start-time picker on 15-minute increments and clarified the separate matching window: the selected start time is shown alongside the range of other starts that can match. The flexibility slider moves in 15-minute steps. Compact weekday rows preserve room for the native time field, while the example copy is shorter so it stays legible above the fixed action button. Updated the live asset version. Stress checks cover quarter-hour snapping, slider increments, and matching examples; visual review on the live phone-sized layout confirmed the example and controls. Physical iPhone review remains a device-only check.

## Profile visibility and gender controls — November 20, 2026

Added an explicit gender choice to the first profile step and profile editing. Added a separate public-round visibility preference with independent exclusions for women golfers, men golfers, and people who smoke; it is summarized on the profile and shown on a public round. Example join requests now respect those visibility settings. Kept “Show me rounds without smoking” as an incoming example-plan filter and labeled it clearly so it cannot be mistaken for a visibility rule. Updated the app script cache version and README. All 67 homescreen stress checks pass. The live home-screen app was opened at `/?homescreen=1&release=1045af2`; the gender choice, audience controls, visibility exclusions, and separate example-plan filter were visually verified. Published in commit `1045af2`; GitHub Pages run [44799966372](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44799966372) succeeded.

## Allo wave direction and handicap slider refresh — November 20, 2026

The animated “golf group.” phrase now travels right-to-left, with the first and last characters held still and spaces/punctuation excluded from phase spacing. Weight variation is reduced to a restrained 608–692 range to avoid a jittery, uncertain feel. The profile handicap is a native slider from 0 to 54 in whole-number increments, defaulting to 0. Updated asset versions to clear stale live files. All 66 app stress checks, JavaScript syntax checks, and `git diff --check` pass. Commit `f7d1c48` is live; GitHub Pages run [44798204312](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44798204312) succeeded. The current `?homescreen=1&release=f7d1c48` live page loads the animated golf-group heading.

## Final preference heading — November 20, 2026

Replaced the vague “What makes a good round?” heading with the direct question “What do you enjoy in a round?” It labels the preference choices without implying there is one right kind of golf day. The live onboarding is seven steps; older screenshots showing “Your kind of round” and six steps do not reflect the current version. Published with the audience multi-select update below.

## Playing-partner audience — November 20, 2026

The final preference step now allows selecting women golfers, men golfers, or both; “Everyone” is an exclusive shortcut that clears the two narrower choices. Audience choices are independent, so visitors can include both groups. Example plans follow the selected audience, and clearing all choices leaves the audience unrestricted. All 66 interaction checks pass. Commit `c92936e` is live; GitHub Pages run [44796537215](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44796537215) succeeded.

## Profile wording, golf ability scale, and course map — November 20, 2026

The self-rating now asks what a person typically shoots, reassures them that the answers are a changeable guide, and uses short numbered descriptions with clearly separated 18-hole score bands. A cool-blue to warm-coral ramp distinguishes the seven choices while keeping the text dark and readable. Selected golf courses turn their matching Utah map dots green, with a legend for the selected dots. Cart choice is explicitly tied to one planned round; the on-course phrase “Mulligans welcome” is replaced with plain wording. All 66 interaction checks pass; JS syntax and whitespace checks pass. Published phone view confirms all seven choices fit on one screen and a selected Bear Lake marker renders green. Commit `b26d27d` is live; GitHub Pages run [44795242939](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44795242939) succeeded.

## Seven-level game descriptions — November 20, 2026

Rewrote the numbered golf-game choices so each gives a concrete self-assessment: learning contact, controlling direction and distance, then typical 18-hole score bands from 120+ down to below 80, with short descriptions sized for the phone screen. The helper now frames scores as a guide, not a test. The same descriptions drive the player's self-rating and the separate level filter; color progression and numbering are unchanged. Verification: all 63 onboarding stress checks, JavaScript syntax, and whitespace checks pass. The live script was fetched and confirmed to contain the updated choices. Commit `00eb977` is live; GitHub Pages run [44791783675](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44791783675) succeeded.

## Handicap control — November 20, 2026

The first profile screen now starts the handicap index at 0 and presents a whole-number slider from 0 to 54. Removed the optional checkbox and decimal display so the control is immediately usable and matches the annotated phone screenshots. The same selected integer still appears in the profile summary. Updated cache versions. Verification: stress suite, syntax and whitespace checks; published phone view confirmation to follow.

## Course-specific booking handoff — November 19, 2026

After an example group accepts, the card now keeps the selected course, suggested weekday/start, group size, and holes visible and links directly to that course’s booking route. The copy says this weekly-time example is not a reservation; the golfer chooses a real date and available time with the course. Phone-only routes open the phone dialer. The generic statewide directory handoff is removed. All 94 active public/public-access Utah course records have a destination in `assets/course-booking-links.js`; the directory is documented in `docs/UTAH_COURSE_BOOKING_LINKS.md`. Removed the closed Cascade Fairways entry, changed the four St. George municipal routes to individual city course pages, corrected The Hideout route, and replaced unrelated/uncertain course links with course phone routes where applicable. The list has full name coverage, but provider pages may change and live availability remains external. The live phone-size app was checked at `/?homescreen=1&release=04c5ea1`: after the sample agreement, Fox Hollow Golf Course, Friday 4:30 PM, a 3-golfer group, and the course’s MemberSports tee-time link were all visible together. All 63 stress checks, JavaScript syntax checks, and `git diff --check` pass. Commit `04c5ea1` is live; [GitHub Pages run 44679186380](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44679186380) succeeded.

## Seven-step profile and dated round plan — November 19, 2026

The first-run flow now separates a golfer’s self-rating from the seven levels they want to see in others. The profile handicap starts at 0 and uses whole numbers; weekday start times use 15-minute steps. Course rows stay clustered near the entered city and the Utah overview tracks the visible area. Completing the profile leads directly to a dated round plan with its own course, time, holes, cart choice, and public/private setting. A public sample plan can receive an example request that the host accepts or declines. It does not create a device calendar event, publish a real listing, contact golfers, or reserve a tee time. Removed a repeated golfer photo from the group-seat display. The live mobile viewport review exposed and fixed a cramped privacy-choice label and ensured its helper line clears the fixed action. All 63 jsdom stress checks, JavaScript syntax checks, and diff checks pass. The in-app browser confirms the published seven-step flow; a real iPhone review is still needed for native picker and safe-area behavior. See [ONBOARDING_QA.md](ONBOARDING_QA.md) for the test steps and current limitations.

# Latest work

## Handicap entry — November 21, 2026

Removed the Handicap Index slider. The profile now uses one optional text field and accepts whole numbers only; prefix plus indexes with `+`. Standard indexes are limited to 0–54. The default is `0`. Updated regression coverage and cache versions.

## Example request button copy — November 20, 2026

The request button previously read “Preview asking to play,” which mixed the simulated nature of the demo with the action. The intro now explains that this example sends no real request; the button says “Ask to play,” and the disabled result says “Request previewed.” All 27 interaction checks pass, including the updated button and result state. The live JS v71 was fetched and checked. Published in commit `e781423`; [GitHub Pages run 44833702102](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44833702102) succeeded.

## Headline voice and motion — November 20, 2026

Replaced the generic “Find your golf group” headline with “There’s room for one more,” used the same invitation in the app welcome, and clarified the supporting copy. The right-to-left Allo wave animates “for one more.” with a stronger weight shift, a slight lift, and a 4-second cycle; reduced motion leaves it stable. Stylesheet cache is v69; script caches are `allo-wave.js` v6 and `homescreen.js` v70. Mobile and desktop captures confirm the copy fits. All 27 interaction checks, syntax checks, and whitespace checks pass. Normal and reduced-motion captures were inspected; the live page serves the new copy and assets. Published in commit `2d3c022`; [GitHub Pages run 44833089156](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44833089156) succeeded.

## Mobile preview takeover and app-ready signup — November 20, 2026

On touch devices, tapping the phone preview or its full-screen link moves the existing interactive app into a viewport-filling dialog with a continuous zoom from its page position. It keeps its current app state and URL; the mock bezel and simulated phone status strip disappear, and a Done button returns to the page. Taps on app controls remain app actions. Reduced-motion preferences skip the zoom. After completing profile setup or reaching golf plans, both the expanded preview and direct home-screen route show the existing one-email signup for the eventual download link. Copy says the app is being prepared and the link will arrive later; no store download is claimed. The direct route now uses the same signup visibility rules, with stylesheet cache key `20261120-mobile-takeover-3`. Mobile takeover was published in commit `744b9af`; live desktop zoom and close control were checked, but physical iPhone animation and direct-route signup still need a mobile visual check.

## Focused phone preview — November 19, 2026

The “Open the full-screen preview” link selects by input: touch devices keep the direct `?homescreen=1` route with no bezel; desktop moves the existing interactive phone into the centered full-screen layer and grows it to the largest size that fits the viewport. The destination explicitly resets the phone to the first grid cell; otherwise its page two-column placement pushed it off-center. The entrance now has a 560ms spatial move followed by a 420ms scale-up, with a dimmed, softened backdrop. Escape, the close button, or the backdrop returns the phone to its page position; reduced-motion skips the movement and scale. The live desktop browser screenshot confirms the phone fills the viewport height and is centered, and closing returns it to the preview section. All 63 stress checks, JavaScript syntax, and `git diff --check` pass. Commit `625a4fb` is live; [GitHub Pages run 44670079360](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44670079360) succeeded.

## Homepage golfer photo stack — November 19, 2026

Replaced the single hero photograph with three distinct golf photos: a group playing, a golfer lining up a shot, and a golfer at the tee. Each appears once in the site markup and comes from a source not used elsewhere in the live page. The cards overlap in a calm editorial stack; tapping or focusing one brings it forward. Hover zoom is limited to pointer devices, pressed state is immediate, and reduced-motion removes transitions. The first photo loads with high priority; the other two are lazy-loaded. All 54 homepage stress checks pass, CSS parses, and `git diff --check` is clean. Commit `7b61606` is live; [GitHub Pages run 44660012723](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44660012723) succeeded, and the live page plus versioned CSS/JS return HTTP 200. Could not capture a browser screenshot this session: the local browsers exited before rendering and the in-app browser controller was unavailable, so visual appearance still needs a real-device glance.

## Weekly availability picker — November 19, 2026

Replaced the weekday chips and appended time rows with a stable seven-day grid. Each day has its own add/remove control and native time input, disabled until selected, with five-minute precision from 6:00 AM to 7:00 PM. Toggling a day leaves the rest of the grid in place; its last time is retained if reselected. Time flexibility appears only after at least one day is chosen. All 52 stress checks pass, including independent Friday/Saturday/Sunday starts, toggling, precision, summaries, and filtering. Commit `67aa19f` is live; [GitHub Pages run 44658158612](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44658158612) succeeded. Confirmed the live page serves JS v47 and CSS v48 and fetched both assets. Browser automation could not access the tab and Firefox exited before a screenshot; visual appearance of the native picker remains to be checked on a real iPhone.

## Seven-level colorway and Utah course overview — November 19, 2026

Applied a warm Utah basketball/desert palette to the seven numbered golf-game descriptions, moving from red through orange and ochre to brown while keeping text dark and legible. Restored the Utah course map beside the bounded course list; its shaded latitude area, visible course dots, and county label update as the list scrolls, after a search, and when entering the course step. The city-based starting region and row anchoring remain in place. Stress checks surfaced and fixed a handicap-slider input handler that was not updating its live value. The test’s heading and edit-flow assumptions were also corrected to match the current interface; all 52 checks pass with a temporary `jsdom` install. JS syntax and `git diff --check` pass. Impeccable scan completed; its warnings concern existing homepage patterns, not the updated setup controls. The in-app browser controller was unavailable and the headless Firefox screenshot did not produce an image, so screenshot-level visual confirmation remains outstanding. The palette/map release is commit `9a508bb` (Pages run `44656019054`, successful); the slider fix is commit `2b8f98a` (Pages run `44656621169`, successful). The live page serves JS v45 and CSS v46, both confirmed with HTTP 200.

## Earlier handicap slider — November 19, 2026

The first version used an opt-in slider. On November 20 it was simplified to start at 0 without a checkbox; see the current entry above.

## City-aware course picker — November 19, 2026

The city entered in profile setup now resolves common forms such as “Provo,” “Provo, UT,” and “Provo, Utah County.” The course picker opens at the matching city or county, ranks exact-city courses first, then groups nearby courses from that county. Search and A–Z changes preserve the visible row. The course list remains its own touch-scroll area. JavaScript syntax checks and direct matching checks pass; the automated interaction suite could not run because `jsdom` is absent. Commit `a2ac58f` is live; [GitHub Pages run 44653586117](https://github.com/zachzedzach/parup-smoke-test/actions/runs/44653586117) succeeded. The live homepage points to JS v42 and CSS v44 and both assets return successfully. Interactive visual confirmation was unavailable because the in-app browser control is unavailable in this session.

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
