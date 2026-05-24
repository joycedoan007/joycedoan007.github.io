---
title: Design System Markdown Template
date: "2025-06-10"
readTime: 14 min read
description: A practical template for documenting UI components, styles, and guidelines — from color tokens to component rules.
notionUrl: https://joycedoan.notion.site/design-system-template
category: Design systems
---

This template is used to document and maintain a design system — covering tokens, components, and rules. Duplicate this for each new product and fill in your values.

[Download Markdown Template →](https://drive.google.com/file/d/1j07EdXSv6ADf0vgMlGK-d1YJCRaEzDzf/view?usp=sharing)

## Overview

| | |
|---|---|
| **Reference** | Figma / Storybook link |
| **Technology** | Framework name |

**Foundation packages:** Colors, Typography, Spacing, Radius, Patterns

**Component packages:** List your component libraries here

---

## 1. Foundations

### Color System

Color Scale: **[FRAMEWORK NAME] FULL NAMES**  
Use this scale for all token names (50–950 range).

**Primary**

| Token | Light | Dark |
|---|---|---|
| primary-50 | | |
| primary-100 | | |
| primary-200 | | |
| primary-300 | | |
| primary-400 | | |
| primary-500 | | |
| primary-600 | | |
| primary-700 | | |
| primary-800 | | |
| primary-900 | | |

**Neutral (Gray)**

| Token | Light | Dark |
|---|---|---|
| gray-50 | | |
| gray-100 | | |
| gray-200 | | |
| gray-300 | | |
| gray-400 | | |
| gray-500 | | |
| gray-600 | | |
| gray-700 | | |
| gray-800 | | |
| gray-900 | | |

**Semantic Colors**

**Background Colors**

| Semantic | Meaning | Light | Dark |
|---|---|---|---|
| bg-page | Root page background | | |
| bg-surface | Cards, panels | | |
| bg-overlay | Dropdowns, tooltips | | |
| bg-modal | Modal backdrop | | |

**Text Colors**

| Semantic | Meaning | Light | Dark |
|---|---|---|---|
| text-bright | Headings, emphasis | | |
| text-primary | Default body text | | |
| text-secondary | Supporting text | | |
| text-disabled | Inactive elements | | |
| text-inverse | On dark backgrounds | | |
| text-accent | Links, highlights | | |

**Border Colors**

| Semantic | Meaning | Light | Dark |
|---|---|---|---|
| border-subtle | Dividers, quiet edges | | |
| border-default | Inputs, cards | | |
| border-strong | Focus rings, emphasis | | |

**Fonts**
- Always insert your font imports here
- Reference: `font-primary`, `font-mono`

---

### Typography

**Font Family**

| Role | Font |
|---|---|
| Primary | e.g. Poppins, Inter |
| Mono | e.g. JetBrains Mono |

**Font Weights**

| Name | Value |
|---|---|
| Bold | 700 |
| Semibold | 600 |
| Medium | 500 |
| Regular | 400 |

**Typography Scale**

**Heading**

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| h1 | | | | | |
| h2 | | | | | |
| h3 | | | | | |
| h4 | | | | | |

**Subtitle**

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| subtitle-lg | | | | | |
| subtitle-sm | | | | | |

**Body**

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| body-lg | | | | | |
| body-md | | | | | |
| body-sm | | | | | |

**Caption**

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| caption | | | | | |

**Label**

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| label | | | | | |

**Button Text**

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| btn-lg | | | | | |
| btn-md | | | | | |
| btn-sm | | | | | |

**Overline (Optional)**

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| overline | | | | | |

---

### Spacing

| Token | Size | Value |
|---|---|---|
| space-0 | 0 | 0px |
| space-1 | 1 | 4px |
| space-2 | 2 | 8px |
| space-3 | 3 | 12px |
| space-4 | 4 | 16px |
| space-5 | 5 | 20px |
| space-6 | 6 | 24px |
| space-8 | 8 | 32px |
| space-10 | 10 | 40px |
| space-12 | 12 | 48px |
| space-16 | 16 | 64px |
| space-20 | 20 | 80px |
| space-24 | 24 | 96px |

---

### Border Radius (Rounded Corners)

| Token | Size | Value | Usage |
|---|---|---|---|
| radius-none | 0 | 0px | Sharp corners |
| radius-sm | sm | 4px | Small elements |
| radius-md | md | 8px | Buttons, inputs |
| radius-lg | lg | 12px | Cards, panels |
| radius-xl | xl | 16px | Large cards |
| radius-2xl | 2xl | 24px | Modals |
| radius-full | full | 9999px | Pills, chips |

---

### Shadow (Elevation)

| Name | Light | Dark |
|---|---|---|
| shadow-sm | | |
| shadow-md | | |
| shadow-lg | | |
| shadow-xl | | |

---

### Border

| Name | Light | Dark |
|---|---|---|
| border-subtle | | |
| border-default | | |
| border-strong | | |

---

## 2. Components

### Button

- **Primary** — bg: `primary-700`, text: `text-inverse`
- **Secondary** — bg: `bg-surface`, border: `border-default`
- **Disabled** — opacity: 0.4
- **Ghost** — bg: transparent, text: `text-primary`

**Divider:** `border-subtle` horizontal / vertical

**Sizes:**

| Size | Height | Padding | Font |
|---|---|---|---|
| sm | 32px | 0 12px | btn-sm |
| md | 40px | 0 16px | btn-md |
| lg | 48px | 0 20px | btn-lg |

---

### Input

- Background: `bg-surface`
- Border: `border-default` → focus `border-strong`
- Text: `text-primary`
- Placeholder: `text-disabled`
- Label: `label` token

---

### Card

- Background (default): `bg-surface`
- Shadow: `shadow-sm`
- Border: `border-subtle`
- Border radius: `radius-lg`

---

### Badge

- Background (default): `bg-surface`
- Text: `text-secondary`
- Radius: `radius-full`

---

### Table

- Background: `bg-page`
- Header: `bg-surface`
- Row hover: `bg-surface`
- Divider: `border-subtle`

---

### Modal

- Background: `bg-surface`
- Overlay: `bg-overlay` at 60% opacity
- Border radius: `radius-xl`

---

## 3. Background System

| Level | Token | Light | Dark |
|---|---|---|---|
| 0 | bg-page | | |
| 1 | bg-surface | | |
| 2 | bg-overlay | | |
| 3 | bg-modal | | |

---

## 4. Accessibility

- Contrast: all body text must meet WCAG AA (4.5:1 minimum)
- Focus: always visible — never `outline: none` without a replacement ring
- Motion: wrap transitions in `prefers-reduced-motion` — drop to 0ms
- Color: never use color as the only signal (pair with icon or text)
- Touch targets: minimum 44×44px on mobile

---

## 5. Rules

1. **No magic numbers** — every value traces to a token
2. **Tokens over classes** — components consume tokens, not hardcoded values
3. **One source of truth** — Figma is intent, code is implementation; reconcile every sprint
4. **Components are context-agnostic** — layout is the parent's responsibility
5. **Dark mode is not a feature** — test every token in both modes before shipping
6. **Document the why** — comments explain constraints, not what the code does
7. **Deprecate before deleting** — give one sprint cycle to migrate before removing tokens or components
