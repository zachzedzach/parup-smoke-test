# ParUp smoke-test site

Static GitHub Pages landing page for the team's proposed local golfer-matching smoke test.

## Before publishing

1. Create a Google Sheet named `ParUp Smoke Test Signups`. In the sheet, open **Extensions → Apps Script**, replace the starter code with `backend/Code.gs`, save, and run `setup` once to create the `Signups` tab and header row. Review and authorize the script as the sheet owner.
2. In Apps Script, choose **Deploy → New deployment → Web app**. Set **Execute as** to your account and access to **Anyone**. This lets golfers submit without signing into Google; it also means the endpoint can add rows to this sheet. Keep the sheet itself restricted to the team. Copy the deployed web-app URL.
3. Put the deployed web-app URL in `config.js` as `signupEndpoint`.
4. Create GA4 and Microsoft Clarity properties, then put their IDs in `config.js`. Clarity masks inputs and dropdowns by default; the whole signup form is also explicitly marked for masking. Verify both before bringing in visitors.
5. Run an end-to-end signup using a test address. Confirm the success message and matching row in the sheet, then remove the test row.
6. Deploy to GitHub Pages and add the team's chosen domain when it is ready.

Do not publish until the signup endpoint and analytics IDs are configured. The current mockup has no fabricated golfer profiles or claims of existing matches.
