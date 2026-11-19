# Latest work

Active project: The Fourth Club, this repository. Public site: https://www.thefourth.club/ and homescreen app: https://www.thefourth.club/?homescreen=1.

## November 19 shared-app design pass

Research and acceptance criteria: [NIGHT_DESIGN_RESEARCH.md](NIGHT_DESIGN_RESEARCH.md). Product truth: [../PRODUCT.md](../PRODUCT.md). Visual/motion rules: [../DESIGN.md](../DESIGN.md). Booking research: [BOOKING_EXPERIENCE_MAP.md](BOOKING_EXPERIENCE_MAP.md).

The homepage phone and homescreen use one app, assets/homescreen.js and .css. Legacy demo markup and its separate site.js behavior were removed. The site keeps approved paper/Allo/photo/logo/iPhone assets. Welcome has manual stories and an explicit sample shortcut. Setup retains six steps and all seven skill levels. Per-day times and adjustable tolerance filter sample plans alongside holes and party capacity. Preferences edits by section and returns without replaying setup. Results explain golf context, open spots, differences, saved/skipped recovery, request/acceptance and separate course booking. Direct course booking is available without requesting.

24 automated jsdom checks pass; syntax and diff checks pass. Local in-app browser checks cover all six setup steps, independent weekday times and keyboard slider input, request/acceptance handoff, signup dialog, 320/390/768/1280 layouts, and both scroll-boundary handoffs. See ONBOARDING_QA.md. Publication/live verification follows. Physical iPhone behavior remains unverified. The examples are frontend only: no live inventory, actual requests, reservations, notifications or persisted profile data. Current-session answers reset on reload. Signup destination and Clarity masking remain unchanged; GA4 remains unconfigured.

Recovery: revert the shared-app design commit if necessary and redeploy Pages. Publishing allowlist remains index.html, styles.css, site.js, manifest.webmanifest, CNAME and assets only. Docs, tests and backend source must remain unavailable publicly.

Deployment correction: GitHub Pages was still configured with build_type=legacy, causing a competing branch-root build alongside the allowlisted custom workflow. Changed Pages build_type to workflow through the GitHub API, preserving www.thefourth.club and HTTPS enforcement. Cancelled the competing legacy run; subsequent pushes must produce only the custom deploy. Verify docs/backend 404 after deployment.
