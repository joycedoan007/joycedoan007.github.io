---
title: Ngữ cảnh thiết kế tiết kiệm token
date: "2026-04-01"
readTime: 10 phút đọc
description: Quy trình trích xuất Figma một lần để biến design system của bạn thành một file cục bộ có thể tái sử dụng — để các công cụ AI không còn đốt token vào việc đọc đi đọc lại cùng một thiết kế.
notionUrl: https://cumbersome-mailbox-4e9.notion.site/Token-Efficient-Design-Context-34ca5487c1e880a9bb87d279e489fd39
category: AI & công cụ
popular: true
---

Mục đích của quy trình này là tránh đốt token lặp đi lặp lại khi yêu cầu AI kiểm tra cùng một thiết kế Figma hết lần này đến lần khác.

Thay vào đó, hãy trích xuất một lần từ Figma, chuyển thiết kế thành file `design_system.md` cục bộ, và dùng lại file đó làm nguồn sự thật cho các công việc UI sau này.

## Mục tiêu

Tạo một file ngữ cảnh thiết kế cục bộ có thể tái sử dụng: `./design_system.md`

File này nên tóm tắt design system từ một file Figma hiện có để bất kỳ trợ lý lập trình AI nào cũng có thể dùng lại mà không phải đọc đi đọc lại dữ liệu Figma thô.

## Khi nào nên dùng

Hãy dùng khi bạn đã có một thiết kế Figma và muốn trợ lý AI tạo hoặc chỉnh sửa UI theo đúng các quy tắc thị giác đó.

Cách này hoạt động với nhiều công cụ, ví dụ:

- Codex CLI
- Claude Code
- Ứng dụng Claude desktop
- Cursor
- Windsurf
- Ứng dụng ChatGPT desktop
- Bất kỳ coding agent cục bộ nào có thể gọi API, đọc file và ghi `design_system.md`

## Bước 1 — Tạo Figma token tạm thời

Tạo một Personal Access Token (PAT) trong Figma.

1. Mở Figma.
2. Nhấp vào avatar của bạn ở góc trên bên phải.
3. Vào **Settings**.
4. Mở **Security**.
5. Tại **Personal access tokens**, nhấp **Generate new token**.
6. Đặt cho token một tên rõ ràng, ví dụ: `design-context-extraction`.
7. Đặt thời hạn là **1 day**.
8. Chỉ cấp các quyền tối thiểu cần thiết:
   - `file_content:read`
   - `file_metadata:read`
9. Nhấp **Create**.
10. Sao chép token ngay lập tức.

> **Lưu ý bảo mật:** Hãy giữ token ở dạng tạm thời và chỉ đọc. Không lưu vĩnh viễn trong mã nguồn, Git, ghi chú chia sẻ hoặc file `.env` dài hạn, trừ khi bạn chủ ý muốn một tích hợp có thể tái sử dụng.

## Bước 2 — Chạy trích xuất bằng công cụ AI bạn chọn

Mở công cụ bạn muốn dùng để trích xuất. Đó có thể là Codex CLI, Claude Code, một ứng dụng AI desktop, Cursor, Windsurf hoặc một coding agent khác.

Công cụ chỉ cần có khả năng:

- gọi Figma API, thường bằng `curl` hoặc một HTTP client
- đọc JSON Figma được trả về
- tóm tắt các quy tắc thiết kế
- ghi một file markdown cục bộ

Hãy dùng một prompt như sau:

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

## Kết quả mong đợi

Sau khi trích xuất, dự án của bạn sẽ có: `./design_system.md`

File đó trở thành ngữ cảnh thiết kế có thể tái sử dụng cho các công việc UI có hỗ trợ AI sau này.

## Bước 3 — Tái sử dụng ngữ cảnh thiết kế đã trích xuất

Với các tác vụ UI sau này, đừng yêu cầu AI kiểm tra lại Figma trừ khi thiết kế đã thay đổi.

Thay vào đó, hãy yêu cầu nó đọc `design_system.md` trước.

Ví dụ:

```
Before changing any UI, read ./design_system.md first.
Use it as the source of truth for colors, typography, spacing, layout, and component style.

If a required rule is missing, infer the closest matching pattern from the existing design system instead of calling Figma again.
```

## Vì sao cách này tiết kiệm token

File Figma thô có thể lớn và nhiễu. Nếu AI đọc đi đọc lại, bạn phải trả chi phí đó hết lần này đến lần khác.

Quy trình này biến file Figma thành một "hợp đồng thiết kế" gọn nhẹ, có thể tái sử dụng:

> Thiết kế Figma → trích xuất một lần → `design_system.md` → tái sử dụng nhiều lần

Kết quả là việc tạo UI rẻ hơn, nhanh hơn và nhất quán hơn.

## Bước 4 — Nhập vào Claude Design

Khi đã có `design_system.md`, bạn có thể cài đặt nó vào Claude Design để nó trở thành ngữ cảnh lâu dài.

**Quy trình:**

1. Vào Claude Design → tab **Design systems**
2. Nhấp **Create** (góc trên bên phải)
3. Ở màn hình **Set up your design system**:
   - Dán toàn bộ nội dung `design_system.md` vào: **Company name and blurb (or name of design system)**
4. (Tùy chọn) Đính kèm thêm tài nguyên:
   - GitHub repo (code frontend giúp Claude hiểu cách dùng thực tế)
   - Thư mục code cục bộ
   - File `.fig`
   - Font / asset
5. Nhấp **Continue to generation**

**Lưu ý quan trọng:**

- Claude Design KHÔNG cần Figma thô nếu `design_system.md` của bạn đủ tốt
- Trích xuất càng tốt → về sau càng đỡ tốn token
- Hãy coi `design_system.md` là **ngữ cảnh thiết kế đã được nén** của bạn

**Mô hình tư duy:**

> Figma → trích xuất một lần → `design_system.md` → dán vào Claude Design → dùng lại mãi mãi

**Khi nào nên nhập lại:**

Chỉ làm lại khi:
- Design system thay đổi đáng kể
- Có pattern component mới
- Cấu trúc token được cập nhật

Ngoài ra: KHÔNG kết nối lại với Figma, KHÔNG đưa lại thiết kế thô, hãy dùng lại design system hiện có. Đây là chìa khóa để tránh lãng phí token.
