# Final Unslop UI review — November 19, 2026

Scope: visible text and decorative chrome in index.html and assets/homescreen.js, shared by homepage and homescreen. No --surface pass. No palette, typography, spacing tokens, business logic or section order changed. Removed only CSS supporting deleted decorative elements.

- [x] Count before
- [x] Read every visible state
- [x] Verdict: light structural changes; repeated copy/decorative tells across screens
- [x] Edit
- [x] Count again
- [x] Review diff and render
- [x] Report

## Counter results

The heuristic scans source patterns rather than rendered text. Manual findings follow separately.

| Rule | Before | After | Kept |
|---|---:|---:|---:|
| U2 decorative numbering | 3 | 3 | 3 |
| U6 status string | 4 | 3 | 3 |

Heuristic total: 7 → 6. No decorative numbering is actually rendered: the three U2 matches are legitimate zero-padding of time-input values. U6 retains per-day time summaries, the explicit example/request state, and the settings summary; these are bound to choices and needed to judge a round.

## Manual findings

| Rule | Before | After | Kept |
|---|---:|---:|---:|
| U3 | 15 | 0 | 0 |
| U4 | 7 | 0 | 0 |
| U7 | 5 | 0 | 0 |
| U8 | 14 | 0 | 0 |
| U11 | 7 | 0 | 0 |
| U14 | 1 | 0 | 0 |
| unslop 27 | 1 | 0 | 0 |
| unslop 32 | 1 | 0 | 0 |
| U9 fixed photo/check badges | 5 | 0 | 0 |

Counts are authored string/template occurrences, not the number of times a shared component appears. The U11 manual count includes SVG/text arrows the regex does not detect. U1, U10 and chart-specific U12–U16 have no other findings; U14 is applied to the repeated quantities around the occupancy diagram.

## Rewritten

Every rewritten visible string is listed below. Deletions are in the source diff; wrapper-only cleanup is excluded.
- “Your next round. Your kind of group.” → “Find your golf group.” (U8)
- “Make room for a good round.” → “Try the app” (U8)
- “Make it yours” → “Choose courses and times” (U8)
- “Find common ground” → “See who could join” (U8)
- “Decide together” → “Agree before booking” (U8)
- “Back to the first tee ↑” → “Back to top” (unslop 32)
- “Your next round. Your kind of people.” → “Find your golf group.” (U8)
- “Find golfers who enjoy the game the way you do.” → “Find golfers at your courses and times.” (U3)
- “Same course. Time for a round.” → “Golf on your schedule.” (U8)
- “A good fit? You both decide.” → “Choose your playing partners.” (U8)
- “See a photo, read a little about their game, and choose together. Save someone for another day, too.” → “Both golfers decide before booking.” (U3)
- “Only your first name is needed. Try a sample photo, or leave it for later.” → “Only your first name is needed.” (U4)
- “Find a Utah course / Course or city” → “Course or city” (U7)
- “Your usual start” → “[Selected day] start” (U7)
- “[Holes] · [Count] open spots · Weekly playing preference” → “[Holes]” (U6)
- “A little common ground, [name].” → “Your preferences are ready.” (U8)
- “Make it your round.” → “Your playing preferences” (U8)
- “Where do you like to play?” → “Where do you play?” (U3)
- “When do you usually play?” → “When can you play?” (U3)
- “How do you like to play?” → “How do you play?” (U3)
- “How many are coming with you?” → “How many golfers?” (U3)
- “Better golf starts with your group.” → “Get The Fourth Club.” (U8)
- “Choose a few favorites. You can change these anytime.” → “Select any courses you play.” (U4)
- “For another round.” → “Saved and skipped rounds” (U8)
- “A little more room?” → “No rounds fit yet.” (unslop 27)
- “Saved and skipped plans stay here. Nothing is lost when you pass.” → “Skipped rounds stay here too.” (U4)
- “Interactive preview · sample golfers” → “Sample golfers” (U7)

- “Use another example” → “Remove sample photo” (U4; the existing action removes the sample)
- “＋ Add a sample photo” → “Add a sample photo” (U11)

## Kept on purpose

- Numbered setup progress and booking sequence: real order, not decorative numbering (U2).
- Weekday-specific times and setting summaries: values used to choose a round (U6).
- Earlier/later plan label, selection checkmarks and saved state: bound to the current data/choice (U9).
- Visible form labels, required-name constraint, seven distinct level descriptions and private preference note: information needed to act (U3/U7).
- Dial gesture hint: the custom control needs an affordance; the native slider remains labeled (U4).
- Navigation, reset and disclosure icons: controls; outbound course arrows communicate leaving for course booking (U11).
- Sample-data, mutual-decision and reservation boundaries: needed to explain this preview accurately.
- Requested Allo lettering wave and established visual identity: outside this copy/decorative cleanup.

## Verification

24 existing stress checks passed after the edits. JS syntax and whitespace checks passed. Local in-app browser inspected homepage, welcome stories, sample results, setup field labels, seven-level selection and course search at mobile widths. Final live verification is recorded in LATEST_WORK.md. No email, real request or reservation was submitted.

Live verification: deployment 327e6ba succeeded. Public HTML serves v19. At 320px, sample results fit without horizontal overflow; saving changes the label to Saved with no icon reinserted; About you opens directly; Add a sample photo changes to Remove sample photo and removes it correctly. No captured warnings/errors. Temporary viewport override reset.
