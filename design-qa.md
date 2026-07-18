# Design QA

- source visual truth path: `C:\Users\赵明啸\.codex\generated_images\019f5638-d73d-75d3-a918-a3bcd073473a\exec-2696ae43-953f-4f55-a436-fcc57eed332c.png`
- implementation screenshot path: `C:\Users\赵明啸\Documents\Codex\2026-07-12\n\portfolio-site\outputs\home-desktop-v2.png`
- full comparison path: `C:\Users\赵明啸\Documents\Codex\2026-07-12\n\portfolio-site\outputs\design-comparison-final.png`
- viewport: desktop 1440 × 1024; responsive check 390 × 844
- state: homepage hero at rest; selected project defaults to 《寻味德州》

## Full-view comparison evidence

The source direction and implementation were placed together in `design-comparison-final.png`. The implementation preserves the source system: black-dominant canvas, oxblood fluid background, oversized condensed wordmark, offset cinematic project stage, signal-red Chinese headline, horizontal project rail, restrained about block, and minimal contact finish. The implementation deliberately uses 《寻味德州》 as the first project and truthful portfolio facts instead of the concept image's invented content.

## Focused region evidence

- Hero: `outputs/home-desktop-v2.png` matches the source hierarchy and uses the supplied project poster at rest, transitioning to video on hover.
- Work stage: `outputs/work-desktop-v2.png` confirms the split project copy/media layout, in-site video treatment, and five-project rail.
- About and contact: `outputs/about-desktop-v2.png` confirms the quiet work-first profile section and factual contact details.
- Mobile: `outputs/home-mobile-v2.png` confirms a 390 px layout with no horizontal overflow or clipped primary controls.

## Required fidelity surfaces

- Fonts and typography: condensed display typography and restrained sans-serif body copy reproduce the target hierarchy; Chinese display type remains readable and does not clip.
- Spacing and layout rhythm: the 1700 px maximum content width, full-height hero and work stages, thin rules, and asymmetric media placement match the target's cinematic pacing.
- Colors and visual tokens: true black, warm bone white, deep oxblood and signal red are consistent across all sections; no blue/purple or template-like surfaces remain.
- Image quality and asset fidelity: real project posters and videos are used. The fixed fluid background is a dedicated raster asset in the selected art direction. No placeholder imagery is present.
- Copy and content: names, school, contact details, project titles, roles, years and project descriptions are drawn from the real portfolio data; concept-image inventions were not carried into the site.

## Comparison history

- Iteration 1 finding [P2]: the autoplaying hero video happened to show a tight facial close-up in the captured state, materially drifting from the source's wider project composition.
- Fix: added the real 《寻味德州》 poster as the hero's resting image and transitioned to the looping video only on hover.
- Post-fix evidence: `outputs/home-desktop-v2.png` and `outputs/design-comparison-final.png` show the wider subject crop and restored source-like composition.

## Primary interactions tested

- Mouse movement updates the fixed fluid background parallax values.
- Selecting 《重生逆袭》 updates the active title, project metadata, video and selected state.
- `VIEW FULL CASE` navigates to `/work/rebirth`, where both final-film entries and the full case structure render.
- WORK and ABOUT navigation links scroll to the intended sections.
- All seven homepage videos reported a playable ready state during desktop verification.
- Browser console checked: no warnings or errors.

## Findings

No actionable P0, P1 or P2 issues remain. Differences from the conceptual board are intentional content corrections or responsive adaptation.

## Follow-up polish

- [P3] Future flat/brand-design projects can be introduced into the same five-item rail without changing the page structure.

final result: passed
