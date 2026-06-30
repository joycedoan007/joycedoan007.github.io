---
title: How I Extract a Real Design System from Any Website
date: "2026-05-01"
readTime: 8 min read
description: Most AI tools can generate UI. The problem is they don't know your design system. Here's how to fix that.
notionUrl: https://cumbersome-mailbox-4e9.notion.site/How-I-Extract-a-Real-Design-System-from-Any-Website-and-Use-It-to-Generate-Consistent-UI-with-AI-360a5487c1e880b5be06f1104fffc780
popular: true
category: AI & tools
---

Most AI tools can generate UI.

But the problem is: they don't know your design system.

So the output becomes:

- inconsistent spacing
- random typography
- different button styles every time

That's why instead of prompting *"Design a dashboard"*, I do this:

**First → extract the design system. Then → generate UI using that system.**

## What This Workflow Actually Does

You're using Claude Code to:

- Go into a real website
- Analyze how it's built (not just how it looks)
- Extract its design rules
- Save everything into a `design_system.md` file

Then you give that file to AI tools so they stop guessing.

## Step 1 — Set Up Claude Code (Don't Overthink This)

You will use:

- Mac → Terminal
- Windows → PowerShell / Windows Terminal

You don't need to "learn coding". You just need to:

- open terminal
- paste commands
- run Claude

That's it.

## Step 2 — Paste This Prompt (THIS is the important part)

This is where most people mess up. They ask AI vague things like: *"Analyze this design"*. That gives garbage.

You need to force AI to behave like a **design systems engineer**.

### Copy this EXACT prompt:

```
Act as a senior product designer and design systems engineer.

Use the browser tool to audit <paste link website here> and related internal pages. Your task is to reverse-engineer the website's design system and document it in a markdown file.

Do not rely only on visual impressions. Combine:
1. Screenshots
2. DOM inspection
3. JavaScript-based style extraction
4. CSS variable extraction
5. Computed style analysis
6. Repeated component pattern analysis

Explore the homepage and at least 5 relevant internal pages, unless fewer pages are available. For each page, identify reusable visual and UI patterns.

Extract:
- Design tokens
- Typography scale
- Color palette
- Spacing scale
- Layout rules
- Component patterns
- Interaction states
- Responsive behavior
- Motion and transition styles
- Image and icon treatments
- Form patterns
- Navigation and footer patterns

Use JavaScript to collect:
- All CSS custom properties
- Most frequent colors
- Most frequent font sizes
- Font families
- Font weights
- Line heights
- Border radii
- Box shadows
- Button styles
- Link styles
- Heading styles
- Section/container dimensions
- Common class names and repeated DOM structures

Read `/private/tmp/template_design_system.md` and use it as the output template.

Then create a new markdown file named:
`/private/tmp/website_design_system.md`

The final document should be practical enough for designers and developers to rebuild the website's UI patterns in another product.

Use this structure:
1. Overview
2. Brand and visual language
3. Design tokens
4. Color system
5. Typography
6. Spacing and sizing
7. Layout and grid
8. Components
9. Component states
10. Motion
11. Imagery and iconography
12. Accessibility review
13. Implementation recommendations
14. Source pages reviewed
15. Screenshots captured
16. Assumptions and open questions

For every design decision, label it as one of:
- Observed directly
- Extracted via JavaScript
- Inferred from repeated patterns
- Recommended improvement

Be thorough, but avoid inventing details that cannot be verified.
```

## Step 3 — Let Claude Run (What's Actually Happening)

Claude will:

- open the website
- inspect HTML + CSS
- detect repeated UI patterns
- extract tokens (colors, spacing, typography)
- analyze components (buttons, cards, nav, etc.)

Then it generates: `consortiagroup_design_system.md`

## Step 4 — Open the .md File

This file is your gold. It contains things like:

- exact color system (not guessed)
- real font sizes used
- spacing patterns (8px? 12px? 16px?)
- button variants
- layout structure
- responsive behavior

This is basically: *"How this product is designed under the hood"*

## Step 5 — Feed It Into AI Design Tools

Now go to:

- Claude
- v0
- Lovable
- Bolt
- any AI UI generator

Paste the whole `design_system.md`. Then prompt like:

- "Using this design system, create a dashboard"
- "Using this system, design a mobile onboarding flow"
- "Generate a pricing page"

## Step 6 — What Changes in Output (This is the key)

Without this workflow: AI invents UI every time.

With this workflow: AI follows rules.

So now you get:

- consistent spacing
- consistent typography
- consistent components
- consistent visual hierarchy

It starts to feel like a real product — not random Dribbble shots.

## The Big Idea (Don't Skip This)

Most people use AI like this:

> Prompt → Screen → Fix → Repeat

That doesn't scale. This workflow changes it to:

> Extract system → Feed system → Generate screens

## Why This Matters (For Designers)

You're not just designing screens anymore. You're defining:

- rules
- structure
- consistency
- system behavior

And then letting AI execute.

## If You Only Remember One Thing

**AI is not bad at design — it just lacks your system.**

Once you give it the system: everything gets 10x better.

