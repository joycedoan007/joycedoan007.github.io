---
title: Token-Efficient Design Context
date: "2025-05-25"
readTime: 10 min read
description: A one-time Figma extraction workflow that turns your design system into a reusable local file — so AI tools stop burning tokens reading the same design over and over.
notionUrl: https://cumbersome-mailbox-4e9.notion.site/Token-Efficient-Design-Context-34ca5487c1e880a9bb87d279e489fd39
category: AI & tools
popular: true
---

The purpose of this workflow is to avoid repeatedly burning tokens by asking AI to inspect the same Figma design again and again.

Instead, do a one-time extraction from Figma, convert the design into a local `design_system.md`, and reuse that file as the source of truth for future UI work.

## Goal

Create a reusable local design context file: `./design_system.md`

This file should summarize the design system from an existing Figma file so any AI coding assistant can reuse it without repeatedly reading raw Figma data.

## When to use this

Use this when you have an existing Figma design and want an AI assistant to generate or modify UI while following the same visual rules.

This works with many tools, for example:

- Codex CLI
- Claude Code
- Claude desktop app
- Cursor
- Windsurf
- ChatGPT desktop app
- Any local coding agent that can call APIs, read files, and write `design_system.md`

## Step 1 — Create a temporary Figma token

Generate a Personal Access Token (PAT) in Figma.

1. Open Figma.
2. Click your avatar in the top-right corner.
3. Go to **Settings**.
4. Open **Security**.
5. Under **Personal access tokens**, click **Generate new token**.
6. Give the token a clear name, for example: `design-context-extraction`.
7. Set the expiration to **1 day**.
8. Grant only the minimum required permissions:
   - `file_content:read`
   - `file_metadata:read`
9. Click **Create**.
10. Copy the token immediately.

> **Security note:** Keep the token temporary and read-only. Do not store it permanently in source code, Git, shared notes, or long-lived `.env` files unless you intentionally want a reusable integration.

## Step 2 — Run extraction with your AI tool of choice

Open the tool you want to use for extraction. It can be Codex CLI, Claude Code, a desktop AI app, Cursor, Windsurf, or another coding agent.

The tool only needs to be able to:

- call the Figma API, usually with `curl` or an HTTP client
- read the returned Figma JSON
- summarize the design rules
- write a local markdown file

Use a prompt like this:

```
I have this Figma token:
<paste figma token here>

I want you to call the Figma API and read this Figma file:
<paste your figma file link here>

Your task:
1. Fetch the Figma file or page data.
2. Analyze the design offline after fetching it.
3. Extract the reusable design system.
4. Save the result to:
   ./design_system.md

The design system should include:

# 0. Overview

**Purpose**
Define a consistent, scalable UI/UX system across all products.

**Scope**
- Platforms: Web / Mobile / Tablet
- Coverage:
  - Foundations (Color, Typography, Spacing, Radius, Shadow)
  - Components
  - UX Patterns
  - Accessibility

# 1. Foundations

## 1.1 Color System

Color Scale (MANDATORY FULL RANGE)
Every color MUST have full scale from light to dark.

### Primary

| Token | Value | Usage |
| --- | --- | --- |
| primary-50 | | Background subtle |
| primary-100 | | Hover bg |
| primary-200 | | Border |
| primary-300 | | Disabled |
| primary-400 | | Secondary |
| primary-500 | | Main brand |
| primary-600 | | Hover |
| primary-700 | | Active |
| primary-800 | | Strong |
| primary-900 | | Dark |

### Neutral (Gray)

| Token | Value | Usage |
| --- | --- | --- |
| gray-50 | | Page background |
| gray-100 | | Section background |
| gray-200 | | Border light |
| gray-300 | | Divider |
| gray-400 | | Placeholder |
| gray-500 | | Secondary text |
| gray-600 | | Body text |
| gray-700 | | Heading |
| gray-800 | | Strong text |
| gray-900 | | Primary text |

### Semantic Colors

Success / Warning / Error (same 50–900 scale)

### Background Colors

| Token | Value | Usage |
| --- | --- | --- |
| bg-page | | App background |
| bg-surface | | Cards |
| bg-elevated | | Modals |
| bg-hover | | Hover state |
| bg-disabled | | Disabled |

### Text Colors

| Token | Usage |
| --- | --- |
| text-primary | Main text |
| text-secondary | Secondary |
| text-disabled | Disabled |
| text-inverse | On dark bg |

### Border Colors

| Token | Usage |
| --- | --- |
| border-default | Default |
| border-strong | Emphasis |
| border-subtle | Divider |
| border-focus | Focus |

### Rules

- Always use tokens (no raw hex)
- Background + text MUST meet contrast (WCAG AA)
- Do NOT mix semantic meaning

## 1.2 Typography

### Font Family

- Primary:
- Secondary:

### Font Weights

| Token | Value |
| --- | --- |
| regular | 400 |
| medium | 500 |
| semibold | 600 |
| bold | 700 |
| extrabold | 800 |

### Typography Scale

#### Heading

| Token | Size | Line | Weight | Letter Spacing | Usage |
| --- | --- | --- | --- | --- | --- |
| h1 | | | | | Page title |
| h2 | | | | | Section |
| h3 | | | | | Subsection |
| h4 | | | | | Card title |
| h5 | | | | | Small section |
| h6 | | | | | Label title |

#### Subtitle

| Token | Size | Line | Weight | Letter Spacing | Usage |
| --- | --- | --- | --- | --- | --- |
| subtitle-lg | | | | | Section intro |
| subtitle-md | | | | | Secondary |

#### Body

| Token | Size | Line | Weight | Letter Spacing | Usage |
| --- | --- | --- | --- | --- | --- |
| body-lg | | | | | Main content |
| body-md | | | | | Default |
| body-sm | | | | | Secondary |
| body-xs | | | | | Meta |

#### Caption

| Token | Size | Line | Weight | Letter Spacing | Usage |
| --- | --- | --- | --- | --- | --- |
| caption-lg | | | | | Table |
| caption-sm | | | | | Helper |

#### Label

| Token | Size | Line | Weight | Letter Spacing | Usage |
| --- | --- | --- | --- | --- | --- |
| label-lg | | | | | Button |
| label-md | | | | | Input |
| label-sm | | | | | Small UI |

#### Button Text

| Token | Size | Line | Weight | Letter Spacing | Usage |
| --- | --- | --- | --- | --- | --- |
| button-lg | | | | | Large button |
| button-md | | | | | Default |
| button-sm | | | | | Small |

#### Common (Optional)

| Token | Usage |
| --- | --- |
| overline | Uppercase label |
| badge | Tag |

## 1.3 Spacing

| Token | Value |
| --- | --- |
| spacing-1 | 4px |
| spacing-2 | 8px |
| spacing-3 | 12px |
| spacing-4 | 16px |
| spacing-5 | 20px |
| spacing-6 | 24px |
| spacing-7 | 32px |
| spacing-8 | 40px |

## 1.4 Border Radius (Rounded Corners)

| Token | Value | Usage |
| --- | --- | --- |
| radius-none | 0 | Sharp |
| radius-xs | 2px | Small UI |
| radius-sm | 4px | Inputs |
| radius-md | 8px | Buttons |
| radius-lg | 12px | Cards |
| radius-xl | 16px | Modals |
| radius-full | 999px | Pills |

## 1.5 Shadow (Elevation)

| Token | Value | Usage |
| --- | --- | --- |
| shadow-xs | | Subtle |
| shadow-sm | | Card |
| shadow-md | | Dropdown |
| shadow-lg | | Modal |
| shadow-xl | | Popover |
| shadow-2xl | | Overlay |
| shadow-3xl | | Heavy |

## 1.6 Border

| Token | Value | Usage |
| --- | --- | --- |
| border-thin | 1px | Default |
| border-medium | 2px | Focus |
| border-thick | 3px | Strong |

# 2. Components

## Button

**Variants:** Primary · Secondary · Ghost · Danger

### States

| State | Background | Text | Border |
| --- | --- | --- | --- |
| Default | | | |
| Hover | | | |
| Active | | | |
| Disabled | | | |

### Sizes

| Size | Height | Padding | Radius |
| --- | --- | --- | --- |
| sm | | | |
| md | | | |
| lg | | | |

## Input

- Background:
- Border:
- Focus border:
- Error border:

## Card

- Background: bg-surface
- Border: border-subtle
- Radius: radius-lg
- Shadow: shadow-sm

## Badge

- Background:
- Text:
- Radius: radius-full

## Table

- Header bg:
- Row hover:
- Border:
- Text:

## Modal

- Background: bg-elevated
- Shadow: shadow-lg
- Radius: radius-xl

# 3. Background System

| Element | Token |
| --- | --- |
| App background | bg-page |
| Section | bg-surface |
| Card | bg-surface |
| Modal | bg-elevated |
| Hover | bg-hover |

# 4. Accessibility

- Contrast ratio ≥ 4.5:1
- Text vs background must be readable
- Focus states visible

# 5. Rules

- Do NOT use random values
- Always use tokens
- Maintain consistency across components
- One purpose = one style

Please minimize the number of requests sent to Figma.
Prefer fetching enough data once, then analyzing it locally instead of repeatedly calling the Figma API.
```

## Expected output

After extraction, your project should contain: `./design_system.md`

That file becomes the reusable design context for future AI-assisted UI work.

## Step 3 — Reuse the extracted design context

For future UI tasks, do not ask the AI to inspect Figma again unless the design has changed.

Instead, ask it to read `design_system.md` first.

Example:

```
Before changing any UI, read ./design_system.md first.
Use it as the source of truth for colors, typography, spacing, layout, and component style.

If a required rule is missing, infer the closest matching pattern from the existing design system instead of calling Figma again.
```

## Why this saves tokens

Raw Figma files can be large and noisy. If the AI repeatedly reads them, you pay the cost again and again.

This workflow turns the Figma file into a compact, reusable design contract:

> Figma design → one-time extraction → `design_system.md` → repeated reuse

The result is cheaper, faster, and more consistent UI generation.

## Step 4 — Import into Claude Design

Once you have `design_system.md`, you can install it into Claude Design so it becomes persistent context.

**Flow:**

1. Go to Claude Design → **Design systems** tab
2. Click **Create** (top-right)
3. In **Set up your design system** screen:
   - Paste the full content of `design_system.md` into: **Company name and blurb (or name of design system)**
4. (Optional) Attach additional resources:
   - GitHub repo (frontend code helps Claude understand real usage)
   - Local code folder
   - `.fig` file
   - Fonts / assets
5. Click **Continue to generation**

**Important Notes:**

- Claude Design does NOT need raw Figma if your `design_system.md` is good enough
- The better your extraction → the less tokens burned later
- Treat `design_system.md` as your **compressed design context**

**Mental model:**

> Figma → extract once → `design_system.md` → paste into Claude Design → reuse forever

**When to re-import:**

Only redo this if:
- Design system changed significantly
- New component patterns introduced
- Token structure updated

Otherwise: do NOT reconnect to Figma, do NOT re-feed raw design, reuse existing design system. This is the key to avoiding token waste.

---

Feel free to leave a comment or reach out to [joycedoan007](https://www.linkedin.com/in/joycedoan007/) directly if you have any questions.

Learn more:
- [The real problem isn't tokens. It's sync.](https://www.linkedin.com/posts/joycedoan007_aiindesign-claudeai-generativeai-activity-7457836583107469312-OzKo)
- [How I Extract a Real Design System from Any Website](https://www.linkedin.com/feed/update/urn:li:activity:7460794426869682176/)
