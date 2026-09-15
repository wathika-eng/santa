# Design

## Source of truth
- Status: Active for the public parish site; factual directory content pending parish confirmation.
- Last refreshed: 2026-09-14.
- Primary product surfaces: public home, daily readings, events, notices, Jumuia, leadership, giving, visit, and bilingual navigation.
- Evidence reviewed: `src/App.tsx`, previous `src/pages/Home.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/index.css`, `public/assets/`, and the [Archdiocese of Nairobi's Kiambu Deanery directory](https://archdioceseofnairobi.org/?page_id=4674). UX references: [Laws of UX](https://lawsofux.com/), [Chrome Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance/get-started), [W3C language guidance](https://www.w3.org/International/questions/qa-html-language-declarations.html).

## Brand
- Personality: welcoming, calm, reverent, local, and trustworthy; closer to a useful parish bulletin than a promotional landing page.
- Trust signals: verified Archdiocese identity, clear content status, no unverified payment numbers or invented people.
- Avoid: Brazilian Santa Rita imagery and information, fake events, hidden assumptions about giving, generic marketing heroes, dense navigation, and repeated empty cards.

## Product goals
- Goals: help parishioners find reminders and community information quickly; make visitors feel welcome; explain how to give safely.
- Non-goals: accepting payments before a parish-verified payment channel exists; publishing private or unverified personal details.
- Success signals: visitors can find events, notices, Jumuia, leadership, and giving in one or two obvious actions, in English or Kiswahili.

## Personas and jobs
- Primary personas: local parishioners, Jumuia members and leaders, families looking for ceremony or bereavement notices, and visitors or donors outside Kenya.
- User jobs: check upcoming dates; read official notices; find one's Jumuia; identify parish leaders; request verified giving instructions.
- Key contexts of use: mobile phone, slow connection, indoor/outdoor light, and varied digital confidence. Most users are expected to be over 30; do not assume any impairment from age.

## Information architecture
- Primary navigation: Home, Readings, Notices, Events, Jumuia, Leadership, Giving, Find us. Language switch stays visible.
- Core routes: `/`, `/readings`, `/events`, `/notices`, `/jumuia`, `/leadership`, `/giving`, `/visit`; authentication/admin routes remain separate.
- Content hierarchy: compact parish identity, today's Kenya-calendar readings, parish bulletin, practical page links, then devotional patron art. Dedicated pages carry events/reminders, three notice categories, Jumuia, leadership, giving, and location.

## Design principles
- Make important choices easy to scan: a short top navigation and clearly grouped notices reflect [Hick's Law](https://lawsofux.com/hicks-law/) and the Law of Proximity.
- Make actions easy to tap and understand: large labeled controls with spacing reflect [Fitts's Law](https://lawsofux.com/fittss-law/).
- Give immediate feedback for language/menu/disclosure changes and preserve familiar web patterns.
- Keep one honest verification message on the home page and concise per-section guidance where records are absent.
- Tradeoff: the site launches with useful structure and verified identity before the parish supplies its current calendar and rosters.

## Visual language
- Color: white and soft stone with ink and oxblood; brass appears only as a restrained rule. Body text meets readable contrast against its surface.
- Typography: self-hosted Alegreya for headings and Source Sans 3 for body copy around 17–18px with generous line height; no tracked all-caps labels.
- Spacing/layout rhythm: ruled bulletin sections, useful first-screen information, comfortable padding, short readable lines.
- Shape/radius/elevation: mostly flat surfaces and thin rules; cards only when content grouping truly benefits.
- Motion: minimal, purposeful, and reduced-motion aware.
- Imagery/iconography: text labels carry navigation without repeated icons. The homepage shows a locally stored, public-domain painting of the patron saints by Jusepe de Ribera as a secondary inset, credited in its caption; it is devotional art, not a photograph of the Kiambu parish. Use a real parish photo only if supplied and approved.

## Components
- Existing components to reuse: React router shell and auth/admin boundary.
- New/changed components: bilingual context, public header/footer, routed pages, Kumo controls, Universalis daily-readings integration, event and notice lists, plain pending states, directory/leader listings, giving instructions.
- Variants and states: current records or clearly labeled pending records; giving details remain masked until parish verification.
- Token/component ownership: Cloudflare Kumo semantic tokens and standalone styles for public controls; limited parish-specific layout in `src/index.css`; content and translations in `src/data/parishContent.ts`.

## Accessibility
- Target standard: WCAG 2.2 AA as a design target, with manual verification still needed.
- Keyboard/focus behavior: skip link, visible focus, semantic landmarks/headings, native links/buttons/details.
- Contrast/readability: large type, high contrast, no information conveyed by color alone.
- Screen-reader semantics: document `lang` updates on switch; status and control labels are meaningful.
- Reduced motion and sensory considerations: respect `prefers-reduced-motion`; avoid auto-advancing content.

## Responsive behavior
- Supported breakpoints/devices: narrow phones through desktop using responsive grids.
- Layout adaptations: stacked ruled links and compact menu on narrow screens; no horizontal scroll at 320px.
- Touch/hover differences: all navigation and disclosures work with touch and keyboard, without hover-only content.

## Interaction states
- Loading: static verified content loads without network calls; future dynamic records need visible loading status.
- Empty: show a consolidated parish verification notice and short section-specific guidance; avoid a long stack of empty cards.
- Error: no public API-dependent sections at launch.
- Success: route navigation changes actual pages; language switch updates the complete public UI and persists locally; saved event reminders download as calendar entries when real events are published.
- Disabled: no payment CTA until verified channels exist.
- Offline/slow network: essential identity and guidance are bundled with the site; readings show a direct Kenya-calendar source link when the publisher feed is unavailable.

## Content voice
- Tone: plain, respectful, hopeful, and specific.
- Terminology: English and Kiswahili are first-class; retain the familiar word “Jumuia” and explain it as Small Christian Communities; “wedding banns” and “bereavement notices” are distinct.
- Microcopy rules: never imply a date, name, contact, or account is official without verification; keep international visitors included.

## Implementation constraints
- Framework/styling system: React 18, TypeScript, Vite, Cloudflare Kumo, and existing Tailwind/CSS. Kumo and its required icon peer were explicitly requested.
- Design-token constraints: prefer Kumo components and semantic tokens; use the standalone Kumo CSS build while this repository remains on Tailwind v3.
- Performance constraints: the dated Universalis JSONP script is the only third-party script on the public page and runs only to display permitted daily readings; the patron artwork and fonts are self-hosted.
- Compatibility constraints: baseline widely available browser features with native fallback behavior.
- Test/screenshot expectations: run TypeScript, lint, tests, build, and inspect the public page at mobile and desktop widths when a browser is available.

## Open questions
- [ ] Parish office: confirm complete Jumuia names, areas, chairpersons, and secretaries before publishing a directory.
- [ ] Parish office: confirm current clergy and lay leadership names/roles.
- [ ] Parish office: provide event dates, Mass times, general announcements, wedding banns, and bereavement notices with permission to publish.
- [ ] Parish office: provide an authenticated contact channel and giving instructions, including international transfer guidance.
- [ ] Parish office: provide approved photography/logo if desired.
- [ ] KCCB/Paoline: obtain a licensed Kiswahili reading feed before publishing translated lectionary text.
