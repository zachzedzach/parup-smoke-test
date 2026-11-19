# Annotated iPhone feedback — November 19, 2026

Source: Zach's IMG_5003–5010 HEIC screenshots, IMG_5014 HEIC and IMG_5015 PNG. Original files remain untouched. Reviewed a converted contact sheet and the full geographic-picker annotation. These captures show an older blue-control build; current shared-app source is the implementation authority.

## Changes

- IMG_5003: weekday rows now follow Monday–Sunday regardless of selection order, retaining each day's value and the active dial day.
- IMG_5004: time inputs and the rotary/range controls now use five-minute increments. All display, input formatting and spring detents use the same minute rounding. Inputs still cover 6 AM–7 PM. Nearby-time tolerance remains separate.
- IMG_5005: “Starting tees” explains the starting positions and shorter/longer distances. Visible choices label front/Championship distances. “Playing pace” offers Relaxed / Steady / Fast with a plain description of the current choice; summaries and plan facts use the same labels.
- IMG_5006: “During the round” plus a short multiselect instruction replaces the ambiguous atmosphere label.
- IMG_5007: “Which are you up for?” and “Change these any time” introduce the interest choices.
- IMG_5008: experience is its own Any experience / Newer golfers control, separate from Everyone / Women golfers / Men golfers. The two filters combine independently. Everyone is the default gender preference.
- IMG_5009: completion already says “Your preferences are ready” and “See golf plans”; the rejected older wording was not restored.
- IMG_5010: request buttons now say “Ask [name] to golf” and “Asked [name] to golf.” They remain explicit simulations and do not send messages.
- IMG_5014/5015: course browsing defaults north to south, retains A–Z, searches course/city/county, displays county and access, and shows removable selected courses. A small Utah locator shades the current visible latitude band and highlights its course points as the list scrolls. Search starts at the first filtered course. No location permission or user coordinates are collected.

## Geographic source

The existing official UGRC polygon service supplied all 118 course geometries:
https://services1.arcgis.com/99lidPhWCzftIe9K/ArcGIS/rest/services/GolfCourses/FeatureServer/0

Computed area-weighted polygon centroids in WGS84 (six decimal places) and joined by exact source name. Every existing course matched, and coordinate bounds were checked. The lightweight Utah outline is an approximate geographic locator, not a navigational map or precise county-boundary map. County labels come from the source. All 23 private records remain excluded from the UI. The prior directory completeness/current-access limitations still apply.

## Verification

30 automated checks pass, including nonchronological weekday taps, five-minute values and slider independence, latitude/A–Z ordering, county search, selection removal, independent experience filters and literal named request actions. Existing saved/skip/reply/booking, reduced-motion and name-escaping checks still pass.

Local in-app browser at 390×844: course list and Utah locator render; scrolling changed the indicator from Box Elder to Davis County and moved its band; Utah county search worked. Tuesday/Thursday added after Friday/Saturday/Sunday rendered in calendar order. Friday 16:05 remained unchanged while keyboard ArrowRight moved Saturday 07:10 to 07:15. Tee explanations, pace descriptions and separate experience controls were inspected. Live/320px checks follow publication. Actual iPhone hardware gesture behavior is not claimed from the browser check.
