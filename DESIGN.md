---
name: Ashish Portfolio
description: A quiet, text-led portfolio.
colors:
  canvas: "rgb(255 255 255)"
  canvas-raised: "rgb(243 243 243)"
  ink: "rgb(41 43 40)"
  ink-secondary: "rgb(98 101 94)"
  ink-tertiary: "rgb(114 118 108)"
  edge: "rgb(222 222 214)"
  edge-subtle: "rgb(234 233 227)"
  accent: "rgb(72 99 75)"
  accent-background: "rgb(237 240 233)"
  highlight: "rgb(248 185 157)"
  highlight-ink: "rgb(53 37 30)"
  dark-canvas: "rgb(21 22 20)"
  dark-raised: "rgb(38 38 38)"
  dark-ink: "rgb(238 239 233)"
  dark-ink-secondary: "rgb(180 184 172)"
  dark-ink-tertiary: "rgb(155 161 143)"
  dark-edge: "rgb(54 58 49)"
  dark-edge-subtle: "rgb(41 45 37)"
  dark-accent: "rgb(191 206 169)"
  dark-accent-background: "rgb(41 49 36)"
  dark-highlight: "rgb(113 70 50)"
  dark-highlight-ink: "rgb(255 240 230)"
typography:
  display:
    fontFamily: "Caveat, cursive"
    fontSize: "38px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "20px"
  metadata:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: "20px"
  activity-label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: "16px"
  identity:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: "24px"
  contact-title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: "28px"
rounded:
  highlight: "4px"
  avatar: "12px"
  preview: "16px"
spacing:
  compact: "12px"
  group: "24px"
  section: "48px"
components:
  project-preview:
    backgroundColor: "{colors.canvas-raised}"
    rounded: "{rounded.preview}"
  icon-button:
    textColor: "{colors.ink-secondary}"
    size: "36px"
---

## Overview

**Creative North Star: "Let the work speak quietly."**

Use the palette tokens above and Geist typography. Keep the introduction compact, give projects room, and preserve the distinction between reading and browsing work. The handwritten Highlights title provides one human accent.

## Colors

Use canvas and raised canvas for tonal depth. Olive-gray text creates hierarchy; peach highlights emphasize the two professional roles. Dark mode translates the same hierarchy onto a dark olive canvas. Tokens originate in `src/index.css`; Tailwind maps them to semantic names.

Small text on a raised canvas uses secondary ink, rather than tertiary ink, to meet contrast requirements.

## Typography

Self-host Geist for body, headings, navigation, and labels. Reserve Caveat for Highlights. Body paragraphs use a relaxed line height; project titles use medium weight and restrained tracking. The primary heading remains available to assistive technology, while the visible introduction uses prose.

## Layout

The reading container is 624px including 32px side padding on larger screens, leaving a 560px reading measure. The project showcase is 1064px including padding, leaving 1000px for three equal columns with 24px gaps. Below 640px, projects form one column with 24px page padding.

The full GitHub year scales to its container; below 480px it splits into two half-year rows, with no scrollbars or hidden days. Below 360px the header uses the first name to keep navigation readable; the full name remains in the introduction's accessible heading and About section.

## Visitor count

The footer on the home page begins with a two-line visitor note above the copyright row: one sentence in secondary ink with the visitor's ordinal emphasized, then a quiet tertiary line with the running total and a small pulsing accent dot that respects reduced motion. Nothing visitor-related appears near the top of the page.

## Elevation & Depth

Main surfaces remain flat, using pale preview backgrounds and fine borders. Avoid decorative shadows. The skip link may use a small shadow when keyboard-focused.

## Shapes

Project previews are gently rounded rectangles with a 1.7:1 aspect ratio. Avatar corners are softer than a square, while navigation and icon buttons are circular. Peach word highlights have small corners.

## Components

Highlights show three featured projects as a logo or line-glyph preview, one title, and an arrow; no subtitles, descriptions, technology lists, or years. Each preview and title form one link to the project's own page, with an All projects link beside the heading. `/projects` lists every project in quiet rows (glyph, name, one-line summary, status and year). A project page is deliberately short and uses the reading column: back link, mark, name and summary, one meta line, a single short paragraph, at most three one-line points, the stack on one line, and only public links. Line glyphs inherit text color so they work in both themes. Experience entries do not expand and link to verified company websites, except a confidential entry.

A confidential experience entry is a non-link row: its placeholder name and logo are blurred (aria-hidden, with a screen-reader label saying the company name is withheld) and a small lock replaces the external arrow.

Experience uses a native list of compact rows with 24px logos, company and role side by side, and dates aligned on the right at desktop sizes, with no descriptions. Founder roles link to their project page; internships link to the company site. Logos retain a white backdrop for legibility in both themes. Rows have a minimum 44px target and no dividers. On mobile, the date moves below the company and role without wrapping. Location stays in the link's hover title and accessible description.

Cursor status opens on avatar hover or keyboard focus; the status button also toggles it on tap. The popover remains open while the pointer moves into it and closes with Escape or an outside tap. Its content is labeled as last recorded activity. Spotify shows live or last-played activity when available, otherwise the selected song labeled On repeat. Theme buttons name the destination theme and retain a visible focus outline.

Text links use subtle underlines. Icon buttons use tonal hover feedback. Hover movement and the cursor cat respect reduced motion.

## Do's and Don'ts

- Do retain the quiet palette, modest type scale, and reading width.
- Do use factual existing assets, names, and destinations.
- Do keep project links accessible from the keyboard.
- Don't add expansion controls; project depth belongs on its own page.
- Don't invent product screenshots, metrics, or live activity.
- Don't clip or horizontally scroll the GitHub calendar.
