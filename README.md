# ParUp smoke-test site

Static GitHub Pages landing page for the team’s proposed local golfer-matching smoke test.

## Before publishing

1. The private `ParUp Smoke Test Signups` Sheet and bound Apps Script are already set up, and the `Signups` tab has its header row. The script can write only to the Sheet it is attached to.
2. The public Apps Script web-app endpoint is deployed. It accepts anonymous form submissions and can add rows to the private Sheet; keep the Sheet itself restricted to the team.
3. `config.js` already has the deployed endpoint as `signupEndpoint` and the Microsoft Clarity project ID. Create a GA4 property and add its measurement ID when available.
4. Before recruiting visitors, verify the signup flow from the page through the success message to a matching row in the Sheet. Clarity masks fields by default; the whole form is explicitly marked for masking.
5. Publish through GitHub Pages, then add a custom domain only after the team chooses it and the grant process is settled.

The page describes ParUp as a concept under test and includes no fabricated golfer profiles or claims of existing matches. The repository is currently private, so the page is not live.
