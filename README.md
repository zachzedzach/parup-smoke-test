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

## Current local redesign (not published)

The current local draft positions Roundfolk as a “better than random” improvement to the usual tee-time process. Its story is: keep the tee time golfers already book; get a better sense of who is joining the group; arrive with a little common ground already in place. The page uses the locally hosted Allo variable font, an irregular candy-colored visual system, and Pexels golf photos credited on the page. Frank’s example uses the interests he supplied (Saturday golf, fishing, shooting). The sample group and screens are clearly framed as a concept, not working app features.

The page has three benefit-led steps and one early-access email form. The old store badges and download dialog are no longer referenced by `index.html`. The active page styles are in `styles.css`; `badge-overrides.css` and `allo-style.css` remain in the folder but are not linked by the current page.

The current local redesign must not be published until Zach explicitly requests it. GitHub Pages still serves the previous published design. The working tree contains a new product-story draft beyond commit `ea73d79`.

## Visitor flow

The early-access call to action scrolls to the signup form. The form asks for an email address and says the team will send one update when Roundfolk is ready. It does not claim the app is available or that matching currently works.

The page tracks section visibility, scroll depth, visible time, first store-link click per session, signup start, and signup outcome using Microsoft Clarity and, if configured, Google Analytics. Signup source and UTM campaign tags are stored with the signup. Tracking is by visit/session; it does not identify which named person read each section. Email is excluded from analytics.

## Publish status (checked November 17, 2026)

- Roundfolk is published at `https://zachzedzach.github.io/parup-smoke-test/`; GitHub Actions Pages deployment succeeded.
- The live site remains on the earlier landing page. A temporary revert was pushed to restore that prior version after a design was published prematurely; keep the redesign local until Zach explicitly says to publish.
- A new local product-story draft is in progress. It has not been visually inspected at both desktop and mobile widths, and Pexels image loading still needs confirmation in the local browser.
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
