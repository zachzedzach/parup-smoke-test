# ParUp smoke-test site

A static GitHub Pages landing page for the team’s golfer-matching download-interest test.

## Funnel

1. Visitors see the ParUp app offer and can click **Download the app**.
2. The click is recorded in Microsoft Clarity and Google Analytics when its ID is configured. The page also records which main sections visitors view, scroll-depth marks, and engaged time.
3. The button opens the early-access form. That step explains that the app is not available to download yet and asks for an email plus optional matching preferences.
4. A completed signup is recorded in the private ParUp Smoke Test Signups Sheet. Its Source column marks signups that followed the download button. The public Apps Script endpoint only adds form rows; keep the Sheet private.

The form is masked in Clarity session recordings. Signup event data includes whether the download button was clicked; the form does not send email or matching preferences to analytics.

## Current setup

- The Apps Script handler is deployed as version 2 and stores the signup source.
- config.js contains the endpoint and Microsoft Clarity project ID. Google Analytics is still missing a measurement ID.
- The private repository cannot enable GitHub Pages on its current plan. The page is not live until the repo is made public or the account is upgraded.
- No custom domain has been chosen. Use the GitHub Pages address after publication; buy a domain only after the team chooses one and settles grant funding.

Before recruiting visitors, finish GA4 setup and verify an end-to-end signup.
