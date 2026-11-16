# Roundfolk smoke-test site

Static GitHub Pages landing page for the Roundfolk golfer-matching interest test. The source is rebranded locally; the public Pages deployment still serves the prior ParUp version.

## Current setup

- Site: `https://zachzedzach.github.io/parup-smoke-test/`
- GitHub repository: `https://github.com/zachzedzach/parup-smoke-test`
- Signup endpoint: Google Apps Script web app, configured in `index.html` so the form does not depend on a separate config script being loaded.
- Signup destination: the team’s private Google Sheet (the existing sheet/project still uses the legacy ParUp name).
- Microsoft Clarity is configured. The form is masked; email addresses are not sent to analytics. GA4 has no measurement ID configured yet.
- The team has not verified a full signup end-to-end. GA4 has no measurement ID. Do not recruit visitors until tracking is configured and a test signup is confirmed in the private Sheet.
- The endpoint is public and accepts email submissions into the private Sheet; expect spam risk. Keep the Sheet private.

## Visitor flow

The landing page describes the Roundfolk concept and has Google Play and App Store style store links. The artwork is custom, not an official badge or evidence that the app is listed. The official Apple badge is for apps available on the App Store, and Google directs app developers distributing through Play to its official badge resources. Because Roundfolk is not available in either store, these links open an honest “Hold on! We’re not there yet” dialog instead of linking to an unrelated app listing. The dialog asks for only an email address and says the app is not available yet.

The page tracks section visibility, scroll depth, visible time, first store-link click per session, signup start, and signup outcome using Microsoft Clarity and, if configured, Google Analytics. Signup source and UTM campaign tags are stored with the signup. Tracking is by visit/session; it does not identify which named person read each section. Email is excluded from analytics.

## Publish and launch blockers (checked November 15, 2026)

- The nested Git checkout now has `origin` configured and a local Roundfolk commit ready to push (`7d27cf8`).
- `gh auth status` reports that the saved `zachzedzach` GitHub token is invalid. Publishing needs a fresh GitHub authorization.
- GA4 has no property ID, and no test signup has been verified in the private Sheet.
- No custom domain has been selected or purchased. Use the free Pages URL for the test.

## Before recruiting

1. Create/configure a GA4 property and add the measurement ID to the inline configuration in `index.html` (and `config.js` if maintaining a separate copy).
2. Submit a test address through the live form and verify the success message and matching row in the team’s private Sheet. Remove only the disposable test row afterward.
3. Confirm the page uses Roundfolk branding and the correct concept details before sending visitors.
4. Use a custom domain only after the team chooses one and the grant process permits the cost.

## Implementation notes

`site.js` supports `window.ROUNDFOLK_CONFIG` and the legacy `window.PARUP_CONFIG` name. It accepts the existing deployed Apps Script response type (`parup-signup`) as well as a future Roundfolk response type for compatibility with the existing endpoint. The current form’s source field identifies download-link clicks and campaign tags. The endpoint’s public URL is not a secret; anyone can submit to it.

Official platform guidance: [Apple App Store Marketing Resources and Identity Guidelines](https://developer.apple.com/app-store/marketing/guidelines/) and [Google Play brand guidelines](https://developer.android.com/distribute/marketing-tools/brand-guidelines).
