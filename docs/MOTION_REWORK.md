# Motion and game descriptions — November 19, 2026

## November 20: intentional golf-group wave

The “golf group.” phrase now sends its weight peak from right to left. Its first and last characters stay still; only interior letters animate, with spaces and punctuation excluded from the phase sequence. The 6.4-second periodic motion has a restrained 608–692 weight range, fixed measured glyph origins, and reduced-motion support. Cache versions in `index.html` must be advanced when publishing this change. The profile handicap control remains a whole-number range slider, 0–54, starting at 0. Verify the current live asset versions and phone view after publish; automated checks do not establish physical-device frame pacing.

## November 19: Remove motion jitter

The Allo wave now positions each SVG glyph at a fixed x-coordinate measured at its base weight, preserving pair kerning while weights change. The previous full-line `textLength` constraint redistributed spacing as glyph weights changed, which could make letters look as though they were shuffling. The welcome phrase alone receives the wave inside the app; setup and results headings remain still. The 6.4-second cycle uses 16 evenly spaced samples of a periodic curve, so the wave does not reverse abruptly at its loop. `F`–`i` spacing is applied before positioning the `i`. Weekday selection now updates its selected state and schedule block in place instead of rebuilding the whole screen, so the tapped control is not replaced and the welcome wave is not restarted. Reduced-motion behavior remains static.

Verification should confirm fixed glyph x coordinates, unchanged first and last glyphs, weekday control identity across selection, independent saved start times, forward/back navigation, and no horizontal layout shift. Syntax and whitespace checks pass. Published in commit `b842186`; GitHub Pages run `44651728934` succeeded. Automated stress tests could not run because this checkout has no `jsdom`; the in-app browser control was unavailable during this pass, and the installed Firefox process aborted in headless mode. Physical-iPhone frame pacing remains unverified.

Applied the installed motion-design skill. Completion criteria: short directional transitions without scroll jumps; fixed header/actions; immediate local choice feedback; reduced-motion support; seven numbered, descriptive game choices; shared embedded/standalone behavior; passing regression checks and browser review before deployment.

Motion intent is calm, responsive progress. Signature easing is cubic-bezier(.2,0,0,1), with 140ms feedback, 240ms navigation, and 320ms introductory arrivals. Setup content travels 20px as one group; the progress bar, header and footer remain stationary. Outgoing content travels 12px over 140ms and retains its previous scroll offset. Its inert, hidden-from-accessibility overlay is clipped and positioned relative to the app, including inside the supplied phone. Rapid actions remove old overlays. Completion scaling is reduced from .96 to .99. Press release is .985 to 1 over 140ms. Welcome text retains the requested anchored-endpoint wave. Reduced-motion users receive static changes.

Seven numbered descriptions adapt Rosanna’s prototype LEVELS, preserving contact/course flow/predictability/course management/near-par/regional competition/tour competition distinctions. Removed rank titles and social-status claims. Corrected the source’s apparent 16-hole wording by referring to a round. Profile summaries and example golfer details use the same numbered descriptions; newer-golfer filtering uses numeric levels independently of partner gender.

Validation: 32 automated checks including retained skill selection, outgoing scroll, stationary controls and existing reduced-motion coverage. Mobile in-app browser checked setup, course selection, availability, completion and golf-request feedback without captured warnings/errors. Automated animation mocks do not establish physical-device frame rate. No claim of real-iPhone motion testing.

## November 19: Welcome story switching

Switching the three welcome stories used to reset the rendered-view marker. That made each tap replay the whole-screen exit and staggered 12px upward entrance. Story changes now remain in the same view, retain scroll position, and skip the outgoing overlay. The selected story content gets one 150ms opacity-only crossfade on the Allo-style ease-out curve (`cubic-bezier(.23,1,.32,1)`). The pagination stays fixed. Reduced-motion users get an immediate change. Automated checks assert no translated screen layers, only the short opacity fade, and no WAAPI motion under reduced motion. Physical iPhone frame pacing remains unverified.

## November 19: Setup direction

The progress fill and setup page now share one explicit direction. On Continue, the fill grows left to right while the next page enters from the right and settles left; the previous page moves 12px left underneath it. Back mirrors that motion. The entering page now travels 28px so the connection reads clearly without a large sweep. A regression check asserts the entering and exiting positions, progress-fill direction and mirrored Back behavior.


## November 19: Allo variable-weight wave

The Allo variable-font wave now appears on the marketing hero lines, welcome story phrases, and key onboarding, ready, and results headings. The first and last glyph remain at weight 650; interior glyphs travel through a sine wave over 5.8 seconds with weight amplitude 120. Each SVG text line has a measured `textLength` and spacing adjustment, so weight variation does not reflow or change line width. Text remains accessible as one label. Reduced-motion users see static text. Setup inputs are deliberately not animated.

Browser check: first-name entry rendered `Zach` once. The app listener stores the field value without inserting or rewriting characters. This did not reproduce duplicated input in the app; repeated characters in the chat composer are outside the site code. Automated checks cover stationary endpoints, stable line lengths, and one typed value through navigation.
