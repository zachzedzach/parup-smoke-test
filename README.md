# ParUp smoke-test site

Static GitHub Pages landing page for the team's proposed local golfer-matching smoke test.

## Before publishing

1. Create a Google Sheet named `ParUp Smoke Test Signups`. In the sheet, open **Extensions → Apps Script**, replace the starter code with `backend/Code.gs`, then in Apps Script **Project Settings**, turn on **Show "appsscript.json" manifest file in editor** and replace its contents with `backend/appsscript.json`. Save and run `setup` once to create the `Signups` tab and header row. This limits spreadsheet access to the Sheet containing the script. Review and authorize the script as the sheet owner.
2. In Apps Script, choose **Deploy → New deployment → Web app**. Set **Execute as** to your account and access to **Anyone**. This allows visitors to submit without a Google sign-in; it also means anyone can add rows to the private sheet through the form endpoint. Copy the deployed web-app URL.
3. Put the deployed web-app URL in `config.js` as `signupEndpoint`.
4. Create GA4 and Microsoft Clarity properties, then put their IDs in `config.js`. Clarity masks inputs and dropdowns by default; the whole signup form is also explicitly marked for masking. Verify both before bringing in visitors.
5. Run an end-to-end signup using a test address. Confirm the success message and matching row in the sheet, then remove the test row.
6. Deploy to GitHub Pages and add the team's chosen domain when it is ready.

Do not publish until the signup endpoint and analytics IDs are configured. The page describes ParUp as a concept under test and includes no fabricated golfer profiles or claims of existing matches.
