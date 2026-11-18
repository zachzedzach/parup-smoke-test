# Roundfolk smoke-test site

Static GitHub Pages landing page for the Roundfolk golfer-matching interest test. The Roundfolk source is published to GitHub Pages as of November 16, 2026.

## Current setup

- Site: `https://zachzedzach.github.io/parup-smoke-test/`
- GitHub repository: `https://github.com/zachzedzach/parup-smoke-test`
- Signup endpoint: Google Apps Script web app, configured in `index.html` so the form does not depend on a separate config script being loaded.
- Signup destination: the team’s private Google Sheet (the existing sheet/project still uses the legacy ParUp name).
- Microsoft Clarity is configured. The form is masked; email addresses are not sent to analytics. GA4 has no measurement ID configured yet.
- A synthetic `.invalid` test signup reached the private Sheet with `download_button_clicked` attribution; the test row was removed and confirmed absent. The live site’s form is connected. GA4 still has no measurement ID; finish GA4 setup before recruiting visitors.
- The endpoint is public and accepts email submissions into the private Sheet; expect spam risk. Keep the Sheet private.

## Current published smoke test

The page sells the app outcome: golfers find people who fit their pace, experience, schedule, interests, and preferred kind of round. The promise applies across genders, ages, experience levels, and schedules; Frank is one example, not the default customer. The current product story is the four features in the course notes: set available days and times, add a short bio, add one photo, and receive a notice if a golfer fits. After the hero and ticker, one illustrative app screen shows all four features together: a golfer’s usual Saturday window, short bio, photo, and a fit notice for that kind of round. Visitors can open the notice to see the sample golfer and why it may fit. There is no availability picker, profile form, or match-making task. The sample content is illustrative, not an active profile or real match; the page does not save profiles or find real golfers.

The App Store and Google Play style buttons are the primary smoke-test action. They open a local dialog and never link to a store or payment page. Only after that click, the dialog says Roundfolk is in progress and offers one email with the download link when it is ready. It says the email stays private and is used only for that launch note. The offer and boundary are clear before any user can provide an email or reach a payment flow. Email is optional and submitted only after the visitor chooses to complete the form. The page tracks badge clicks by platform, gate display, section visibility, scroll depth, visible time, signup start, and signup outcome in Clarity; GA4 is still unconfigured. Email is excluded from analytics.

The visual direction draws on Josh Puckett’s project sites: strong type, expressive color, editorial pacing, small motion, and deliberate interaction states. The hero uses Dave Garcia’s black-and-white golfer photo (`assets/roundfolk-hero-dave.jpg`), framed to keep the golfer visible near the bottom of the hero. CSS applies a shared warm/soft treatment. The shared cream page background layers a warm translucent wash over a locally stored 128px tile of Apple Notes’ light paper texture, tinting its grayscale grain to the current palette. Avoid words with sexual connotations and use ordinary terms such as “golfers,” “group,” and “round.” The active page styles are in `styles.css`; `badge-overrides.css` and `allo-style.css` remain unlinked.

The updated Roundfolk page was published to GitHub Pages on November 17, 2026, including Zach’s selected Dave Garcia hero photo. The wordmark uses the exact pink golf-ball logo image Zach selected, rotated with the existing mark tilt. Commit `5c91dd2` deployed successfully; Firefox confirmed the exact image on the live page. The local preview remains available at `http://127.0.0.1:18766/`. Firefox confirmed the Allo font, stylesheet, photos, three steps, badge art, click-through dialog, and hero image/crop. The November 17 preference-chip update and visible photo-credit removal are included in the current source; check the latest Pages deployment before recruiting visitors. Headless Playwright Firefox is not installed; do not install another browser for this check.

The November 17 mobile-first pass was reviewed in Firefox at 393px, 390px, and 320px widths. The hero card stays in frame while the golfer remains visible; the store badges remain side by side. At phone widths the header is compact, the ticker is level, and horizontal overflow is clipped to prevent sideways page movement. The app screen stacks beneath its brief introduction and its fit notice expands inline. The email note promises one private launch email without the awkward payment phrase. Decorative star marks use text-style glyphs in the pink brand color. The current overhaul was reviewed at 393px and 320px. The earlier screenshot is `/tmp/roundfolk-iphone-393.png`.

## Visitor flow

Before a store-button click, the page focuses on the Roundfolk benefit and how it improves a golf day. A tap on either store-style badge opens the availability dialog instead of navigating away. The dialog says the app is not available yet, explains that an email will receive a download link when ready, and has an optional email form. There is no store or payment destination.

The page tracks badge clicks by platform, gate display, section visibility, scroll depth, visible time, signup start, and signup outcome using Microsoft Clarity and, if configured, Google Analytics. Signup source and UTM campaign tags are stored with the signup. Tracking is by visit/session; it does not identify which named person read each section. Email is excluded from analytics.

## Publish status (checked November 17, 2026)

- Roundfolk is published at `https://zachzedzach.github.io/parup-smoke-test/`; GitHub Actions Pages deployment succeeded.
- The live site now reflects the current Roundfolk redesign. Zach explicitly requested publication on November 17 and confirmed GitHub use is allowed. The page includes the Dave Garcia Pexels hero photo, a single app screen with the golfer profile and expandable fit notice, and the one-email download notice after the store-style button click. The user rejected the older golf picker and requested an overhaul; commit `d8cd17e` deployed successfully. Firefox confirmed the live notice expands and the picker is absent. The earlier commit `1b94e3a` removed the standalone explanatory section and kept `#good-round` as a direct link to the app demo.
- On November 17, 2026, the page received hover feedback, Allo variable-font tuning, keyboard focus visibility, reduced-motion support, and navigation informed by Josh Puckett’s project sites. The first sample-round picker and roster were superseded by the four-feature app screen after Zach said the concept demo itself needed an overhaul. The live design goal is to show how a profile leads to a useful fit notice, without asking visitors to configure a made-up round. Zach clarified Roundfolk should appeal to any golfer seeking people they would enjoy playing with, including women golfing together; the story covers different schedules, experience, and pace instead of centering Saturday golf or Frank. Pexels imagery supports the story, led by the selected Dave Garcia hero photo. Zach selected Dave Garcia’s black-and-white golfer image (`assets/roundfolk-hero-dave.jpg`) for the hero; its crop is shifted down to retain the golfer in frame. Visible photo-credit labels have been removed. Avoid words with sexual connotations.
- November 17: after review of the CSS dimple treatment and a photo-based version, Zach selected the exact generated logo image `assets/roundfolk-pink-golf-ball-logo.png`. The image is used as-is, with the existing -12-degree mark tilt and a circular crop; no extra letter, recoloring layer, or texture is added. Firefox visual review confirmed it in the mobile header. The exact-image revision was published in commit `5c91dd2`; GitHub Pages succeeded and Firefox confirmed the live logo. On November 17, the cream wash over the Apple Notes paper tile was reduced after Zach could not see the texture; Firefox confirmed the paper grain is now visible behind the hero and ticker.
- The signup endpoint was tested with a synthetic `.invalid` address and wrote the expected `download_button_clicked` source to the private Sheet. That exact test row was removed and verified absent.
- Microsoft Clarity is configured. GA4 still needs a measurement ID. No local golfers have been recruited.
- No custom domain has been selected or purchased; the free Pages URL is sufficient for this test.

## Before recruiting

1. Create/configure a GA4 property and add the measurement ID to the inline configuration in `index.html` (and `config.js` if maintaining a separate copy).
2. The endpoint write and cleanup were verified with a synthetic `.invalid` test address. Verify the live form’s browser success message when doing the next browser QA; do not create additional test rows unless needed.
3. Confirm the page uses Roundfolk branding and the correct concept details before sending visitors. Do not imply the concept mock screens are a live product.
4. Use a custom domain only after the team chooses one and the grant process permits the cost.

## Implementation notes

`site.js` supports `window.ROUNDFOLK_CONFIG` and the legacy `window.PARUP_CONFIG` name. It accepts the existing deployed Apps Script response type (`parup-signup`) as well as a future Roundfolk response type for compatibility with the existing endpoint. The current form’s source field identifies download-link clicks and campaign tags. The endpoint’s public URL is not a secret; anyone can submit to it.

Official platform guidance: [Apple App Store Marketing Resources and Identity Guidelines](https://developer.apple.com/app-store/marketing/guidelines/) and [Google Play brand guidelines](https://developer.android.com/distribute/marketing-tools/brand-guidelines).


On November 17, Zach requested removal of the visible photo credits. The hero, supporting photo gallery, and three-step image no longer display photo-credit text. The sample card was narrowed and shifted so it no longer covers the hero golfer on desktop; on mobile, the same photo is zoomed and shifted inside its frame so the golfer is visible beside the card. Local Firefox confirmed the credit-free layout and visible golfer at desktop and mobile sizes. Commit `48959e9` deployed successfully; GitHub Pages completed and Firefox confirmed the credit-free page and visible golfer at desktop and mobile sizes.


A follow-up mobile review on November 17 found one remaining green decorative star on the sample golfer board; it now uses the pink text-style star used elsewhere. Firefox review also covered the complete mobile page and 1440px desktop hero.


On November 17, Zach said the numbered process cards, standalone explanation, and sample golf picker felt disconnected from the actual app. Those earlier versions were removed or superseded. The current app screen presents the four recorded features together and lets a visitor open one sample fit notice. The old `#good-round` link still lands on the demo heading.
