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

## Visitor flow

The landing page describes the Roundfolk concept and has Google Play and App Store style store links. The artwork is custom, not an official badge or evidence that the app is listed. The official Apple badge is for apps available on the App Store, and Google directs app developers distributing through Play to its official badge resources. Because Roundfolk is not available in either store, these links open an honest “Hold on! We’re not there yet” dialog instead of linking to an unrelated app listing. The dialog asks for only an email address and says the app is not available yet.

The page tracks section visibility, scroll depth, visible time, first store-link click per session, signup start, and signup outcome using Microsoft Clarity and, if configured, Google Analytics. Signup source and UTM campaign tags are stored with the signup. Tracking is by visit/session; it does not identify which named person read each section. Email is excluded from analytics.

## Publish status (checked November 16, 2026)

- Roundfolk is published at `https://zachzedzach.github.io/parup-smoke-test/`; GitHub Actions Pages deployment succeeded.
- The public HTML response reports the Roundfolk title, not-available dialog, and favicon. The page was not visually inspected in a browser.
- The signup endpoint was tested with a synthetic `.invalid` address and wrote the expected `download_button_clicked` source to the private Sheet. That exact test row was removed and verified absent.
- Microsoft Clarity is configured. GA4 still needs a measurement ID. No local golfers have been recruited.
- No custom domain has been selected or purchased; the free Pages URL is sufficient for this test.

## Before recruiting

1. Create/configure a GA4 property and add the measurement ID to the inline configuration in `index.html` (and `config.js` if maintaining a separate copy).
2. The endpoint write and cleanup were verified with a synthetic `.invalid` test address. Verify the live form’s browser success message when doing the next browser QA; do not create additional test rows unless needed.
3. Confirm the page uses Roundfolk branding and the correct concept details before sending visitors.
4. Use a custom domain only after the team chooses one and the grant process permits the cost.

## Implementation notes

`site.js` supports `window.ROUNDFOLK_CONFIG` and the legacy `window.PARUP_CONFIG` name. It accepts the existing deployed Apps Script response type (`parup-signup`) as well as a future Roundfolk response type for compatibility with the existing endpoint. The current form’s source field identifies download-link clicks and campaign tags. The endpoint’s public URL is not a secret; anyone can submit to it.

Official platform guidance: [Apple App Store Marketing Resources and Identity Guidelines](https://developer.apple.com/app-store/marketing/guidelines/) and [Google Play brand guidelines](https://developer.android.com/distribute/marketing-tools/brand-guidelines).
