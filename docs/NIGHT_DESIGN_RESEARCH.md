# Design research and implementation brief — November 19, 2026

## Research completed

Read the logged-in X search for onboarding screens and inspected the rendered compositions/videos in the in-app browser. This is a qualitative observation pass, not frame-by-frame timing measurement or a usability study. No posts, likes, or messages were sent.

- [Damini Maurya: wireframe to music onboarding](https://x.com/UxDamini_/status/2123041742027096321): one composed product scene, short benefit, quiet progression. Adopt composition and hierarchy, not music imagery or arbitrary floating cards.
- [Amena: screen-control onboarding](https://x.com/AmenaiSabuwala/status/2123382249127284777): choices are concrete, a selected row is unmistakable, the result makes the benefit visible. Adopt a tangible availability preview.
- [rishi: dayface calendar](https://x.com/pxlrshi/status/2121628265370787893): calendar content is the explanation; a stable frame supports sequenced information. Adopt motion that shows common playing time. Do not copy its long pacing.
- [Kamran Hasanli: Screenbase](https://x.com/kamrangasanli/status/2122412526046445574): demonstrates its actual product. The homepage phone and installed view must use the same app, not separate concepts.
- [Chisa's shared account interaction](https://x.com/chisajoboson/status/1850916452074688576): immediate input feedback creates character. Apply to selecting a day, saving a plan and adding an example photo; no decorative mascot.
- [Emil: origin-aware motion](https://x.com/emilkowalski/status/2123029498694410401): keep actions and responses spatially connected.
- [Emil: animation cleanup workflow](https://x.com/emilkowalski/status/2116583281332503038): remove excessive movement, improve the useful interactions, check performance.
- [Emil: motion vocabulary](https://x.com/emilkowalski/status/2061426518333571576), [Good vs Great](https://emilkowal.ski/ui/good-vs-great-animations), [You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations): fast, interruptible feedback, purposeful direction, limited repeated effects.
- [Apple onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding), [motion](https://developer.apple.com/design/human-interface-guidelines/motion): teach through trying; defer optional configuration; keep gestures predictable and motion optional.

Golf expectations are documented in BOOKING_EXPERIENCE_MAP.md (Fox Hollow MemberSports, Thanksgiving Point foreUP, Cedar Hills). Weekly preferences, group agreement, inventory and reservations are distinct stages.

## Experience map / design decisions

1. Homepage: explain finding a group around the times and courses people already play; one route into a working preview. Preserve exact supplied hero, golf ball identity, Allo and paper.
2. Phone preview: same application as homescreen; brief guided intro and an explicit shortcut to a sample setup. Avoid a second, contradictory date-booking prototype.
3. Setup: clear iOS controls, six focused steps. Name, seven levels, courses, per-day availability, style, atmosphere. Optional detail stays optional. Touch feedback immediate, page movement under 300ms.
4. Availability: each day keeps its own start. Adjustable tolerance makes 'similar times' explicit. Native time input and slider remain alongside the tactile dial.
5. Results: lead with day/course/time and group capacity, then golfer photo and description. Examples have visible differences rather than being perfect copies of the user's preferences. Explain shared time and differences. No romantic or swipe framing.
6. Preferences: a real summary with direct editing by section, not a return to the start of onboarding. Save returns to results; back retains answers.
7. Save / skip / request: plans remain recoverable. Request feedback stays beside the chosen plan. Preview acceptance is explicit; course booking is a separate outbound action. Direct course booking remains available without agreement.
8. Empty results: explain whether days are missing, examples are outside tolerance, capacity doesn't fit, or plans were skipped; offer the correct recovery.
9. Installed view: no phone frame or fake status bar; browser safe areas and keyboard space respected. Each launch begins fresh per the requested demo behavior.

## Acceptance criteria

Same experience on homepage and homescreen; no horizontal overflow at 320/390/768/1280; inner scroll hands off to page at edges; no artificial loading; independent weekdays; controls keyboard operable and labeled; no invented live data; mutual agreement cannot be mistaken for a reservation; no private data added to analytics; reduced motion supported; public build excludes docs/tests/backend; source checks, representative stress tests, browser walkthrough, deployment verification.

## Implemented and checked

Unified both app surfaces and removed the separate booking-demo markup/handlers. Retained the approved identity and actual PSD-derived hardware. Introduced green action/stone operational surfaces, compact selection groups, direct preference edits, explicit tolerance, three differentiated fictional golf plans, capacity/holes/time/private-partner filtering, contextual reasons, saved/skipped recovery, request/reply and direct booking fallback. Sample profile categories are authored fiction, not inferred identities of stock-photo subjects.

Corrected two issues found visually: line-icon styling accidentally reached the animated SVG lettering, and an older tablet grid rule put the phone in the wrong column. Both were fixed and rechecked. Removed competing parent/child entrance animations; welcome choreography ends within 300ms, setup movement is 280ms, request feedback 220ms. Reduced-motion uses no WAAPI transitions in the test suite.

The supplied frame is also available as a pixel-exact lossless WebP (322,282 bytes vs approximately 489 KB PNG). Original PNG and PSD source are untouched. Font subsetting was not applied: the local font tool lacked its WOFF2 decoder dependency, so the full original variable font remains.
