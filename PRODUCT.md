# Ashish Prajapati's portfolio

<!-- impeccable:product-schema 1 -->

## Platform
Web. React, TypeScript, Vite, and Tailwind CSS; Spotify runs through the existing Vercel API route.

## Purpose
Present Ashish's existing work, experience, skills, résumé, and contact options. Visitors can explore project details and contact Ashish.

## Required capabilities
Preserve every project and experience entry (the original five now live in `src/data/projects.ts` and `src/data/experience.ts`), technology links in the introduction, résumé PDF, email and social destinations, light/dark theme persistence, Spotify activity and retry, GitHub contributions and refresh, and the draggable cursor cat. Experience entries link directly to company websites. Highlights stay minimal (logo, title), and each links to its own project page, where the description, role, stack, and any public links live.

## Constraints
The site is a quiet, text-led redesign that must preserve all functionality. Keep Ashish's own content, assets, and destinations. Use email as the direct contact method; do not publish a phone number or WhatsApp link, including in the résumé. Do not invent project screenshots, metrics, employment, or social handles. Existing YouTube and Instagram links have no configured destinations.

## Follow-up requirements
Position Ashish as an AI engineer, full-stack developer, and AI expert, per his explicit instruction. Show a non-scrolling full-year GitHub graph, use a selected song when Spotify activity is unavailable, and put Cursor status on the avatar.
Use https://x.com/Ashishx29 for X. Keep Highlights premium and minimal: logo previews, single titles, and direct links only. No project subtitles, descriptions, technology lists, or years. Prefer a project's website URL; otherwise use its GitHub destination, with Ashish's GitHub profile as the final fallback.

## Visitors
The home page keeps its original order, with nothing visitor-related at the top. The footer closes with a personal line: “Congratulations, you are the 486th visitor of this site” for a newly counted visitor, “Welcome back. You were the 486th visitor” for a returning one, and a plain total when the live counter is unavailable. The numbers are exact: a past baseline of 485 plus one per new visitor recorded live (once per day per visitor).

## Projects and confidentiality
Highlights show exactly three projects: Orbit Editor, Milkey AI, and Ventmark (Ventmark replaced AgentUI at the user's request; AgentUI stays on `/projects`). Every other project lives on `/projects`. Use the real project names; milkeyai.com no longer resolves, so Milkey AI links only to its public SDK repository. Vora was removed at the user's request.

Ventmark (renamed from the working name suremrr) is Ashish's live startup directory at useventmark.com. It is a Highlight, and its project page shows its launch film, rendered from the product's own Remotion project. The film autoplays muted and loops with no visible controls, per the user; the frame itself pauses and resumes it. Its repository is private, so the page links only to the website. Describe only what the live product states (free listings, domain verification before publishing, self-reported versus verified numbers, optional prepaid plans); do not add user counts or other metrics to the site.

The current AI/ML internship employer and its product are confidential. Show a blurred placeholder company name and blurred placeholder logo, mark the role AI/ML Intern from Jun 2026, and show no description for it; experience rows stay minimal, with no descriptions. Never add the real company, product, domain, or logo to the site's pages, code, or data. The downloadable résumé is the one exception: by the user's decision (2026-10-28) it names the employer and its product. One unreleased product is intentionally not shown yet. The Spotify fallback is “Finding Her” by Kushagra, Bharath, and Saaheal.

Skills stay a single minimal line each in the introduction and About, including Rust and NestJS.

## Research

Hitherto (repository `~/code/strata`, private) is a personal research memory engine for coding agents. It has a project page and a working paper at `/research/hitherto-temporal-memory`, styled with the page-scoped `signal` theme at the user's request (a look in the spirit of a research report: monospace labels, one blue, a stat grid, animated figures). Do not compare its numbers with other memory products' published results, per the user; the runs are not like for like. Figures come from the repository's generated evaluation JSON (copied into `public/assets/research/hitherto/`), not from its README table, which can lag behind. Keep every caveat: synthetic agent-authored scenarios, retrieval-only benchmarks, the miscalibrated gate, one laptop, not peer reviewed, code not public. It is not a Highlight and is not on the résumé.
Keep Research & writing directly accessible in the header and in a home-page section immediately after Experience. Show the three newest entries there and link to the data-driven index so future articles can be added. List the Pocket TTS model adaptation as a project and link it to its independent working paper. Keep listening examples, interactive results, experiment records, citations, and limitations accessible; do not present the work as peer reviewed.
