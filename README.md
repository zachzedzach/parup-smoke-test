# ParUp smoke-test site

A GitHub Pages landing page for the team's golfer-matching download-interest test.

## Funnel

1. Visitors see the ParUp app offer and can click **Download the app**.
2. The page measures section views, scroll depth, time while visible, download clicks, and signup outcomes. Campaign tags are retained in analytics and signup source.
3. The button opens an early-access form. It explains that the app is not available to download yet and asks for an email plus optional matching preferences.
4. A completed signup is recorded in the private ParUp Smoke Test Signups Sheet. The public Apps Script endpoint only adds rows; keep the Sheet private.

The signup form is masked in Clarity session recordings. Email and matching preferences stay in the private Sheet and are not sent to analytics. Tracking measures visits and sessions; it does not identify a named visitor who viewed a section.

## Current setup

- The Apps Script handler is deployed as version 2 and stores the signup source.
- config.js contains the signup endpoint and Microsoft Clarity project ID. Google Analytics still needs a measurement ID.
- The repository is public. GitHub Pages is configured to build from main at the root; check the published URL after a commit/build.
- Use the free GitHub Pages address for the test. The team has not chosen a custom domain; use grant funding before any domain or ad purchase.

Before recruiting visitors, configure GA4, verify the published page, and complete a real test signup to confirm the private Sheet receives it.
