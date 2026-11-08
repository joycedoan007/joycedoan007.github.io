---
title: Mẫu Markdown cho Design System
date: "2026-03-01"
readTime: 14 phút đọc
description: Mẫu thực tế để ghi chép UI component, style và hướng dẫn sử dụng, từ color token đến quy tắc cho component.
notionUrl: https://joycedoan.notion.site/design-system-template
category: Hệ thống thiết kế
---

Mẫu này dùng để ghi chép và duy trì một design system, bao gồm token, component và các quy tắc. Hãy nhân bản mẫu cho mỗi sản phẩm mới và điền giá trị của bạn.

[Tải mẫu Markdown →](https://drive.google.com/file/d/1j07EdXSv6ADf0vgMlGK-d1YJCRaEzDzf/view?usp=sharing)

## Tổng quan

| | |
|---|---|
| **Tham chiếu** | Liên kết Figma / Storybook |
| **Công nghệ** | Tên framework |

**Gói nền tảng:** Màu sắc, Typography, Khoảng cách, Bo góc, Pattern

**Gói component:** Liệt kê các thư viện component của bạn tại đây

---

## 1. Nền tảng

### Hệ thống màu

Thang màu: **[TÊN FRAMEWORK] TÊN ĐẦY ĐỦ**  
Dùng thang này cho mọi tên token (dải 50–950).

**Màu chính (Primary)**

| Token | Sáng | Tối |
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

**Trung tính (Gray)**

| Token | Sáng | Tối |
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

**Màu ngữ nghĩa (Semantic)**

**Màu nền**

| Semantic | Ý nghĩa | Sáng | Tối |
|---|---|---|---|
| bg-page | Nền gốc của trang | | |
| bg-surface | Thẻ, panel | | |
| bg-overlay | Dropdown, tooltip | | |
| bg-modal | Lớp nền của modal | | |

**Màu chữ**

| Semantic | Ý nghĩa | Sáng | Tối |
|---|---|---|---|
| text-bright | Tiêu đề, nhấn mạnh | | |
| text-primary | Chữ nội dung mặc định | | |
| text-secondary | Chữ phụ trợ | | |
| text-disabled | Phần tử không hoạt động | | |
| text-inverse | Trên nền tối | | |
| text-accent | Liên kết, điểm nhấn | | |

**Màu viền**

| Semantic | Ý nghĩa | Sáng | Tối |
|---|---|---|---|
| border-subtle | Đường phân cách, viền nhẹ | | |
| border-default | Input, thẻ | | |
| border-strong | Vòng focus, nhấn mạnh | | |

**Font**
- Luôn chèn phần import font của bạn tại đây
- Tham chiếu: `font-primary`, `font-mono`

---

### Typography

**Font Family**

| Vai trò | Font |
|---|---|
| Primary | ví dụ: Poppins, Inter |
| Mono | ví dụ: JetBrains Mono |

**Font Weight**

| Tên | Giá trị |
|---|---|
| Bold | 700 |
| Semibold | 600 |
| Medium | 500 |
| Regular | 400 |

**Thang Typography**

**Heading**

| Token | Cỡ chữ | Line Height | Weight | Letter Spacing | Cách dùng |
|---|---|---|---|---|---|
| h1 | | | | | |
| h2 | | | | | |
| h3 | | | | | |
| h4 | | | | | |

**Subtitle**

| Token | Cỡ chữ | Line Height | Weight | Letter Spacing | Cách dùng |
|---|---|---|---|---|---|
| subtitle-lg | | | | | |
| subtitle-sm | | | | | |

**Body**

| Token | Cỡ chữ | Line Height | Weight | Letter Spacing | Cách dùng |
|---|---|---|---|---|---|
| body-lg | | | | | |
| body-md | | | | | |
| body-sm | | | | | |

**Caption**

| Token | Cỡ chữ | Line Height | Weight | Letter Spacing | Cách dùng |
|---|---|---|---|---|---|
| caption | | | | | |

**Label**

| Token | Cỡ chữ | Line Height | Weight | Letter Spacing | Cách dùng |
|---|---|---|---|---|---|
| label | | | | | |

**Chữ trong nút**

| Token | Cỡ chữ | Line Height | Weight | Letter Spacing | Cách dùng |
|---|---|---|---|---|---|
| btn-lg | | | | | |
| btn-md | | | | | |
| btn-sm | | | | | |

**Overline (Tùy chọn)**

| Token | Cỡ chữ | Line Height | Weight | Letter Spacing | Cách dùng |
|---|---|---|---|---|---|
| overline | | | | | |

---

### Khoảng cách (Spacing)

| Token | Cấp | Giá trị |
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

### Bo góc (Border Radius)

| Token | Cấp | Giá trị | Cách dùng |
|---|---|---|---|
| radius-none | 0 | 0px | Góc vuông |
| radius-sm | sm | 4px | Phần tử nhỏ |
| radius-md | md | 8px | Nút, input |
| radius-lg | lg | 12px | Thẻ, panel |
| radius-xl | xl | 16px | Card lớn |
| radius-2xl | 2xl | 24px | Modal |
| radius-full | full | 9999px | Pill, chip |

---

### Đổ bóng (Elevation)

| Tên | Sáng | Tối |
|---|---|---|
| shadow-sm | | |
| shadow-md | | |
| shadow-lg | | |
| shadow-xl | | |

---

### Viền (Border)

| Tên | Sáng | Tối |
|---|---|---|
| border-subtle | | |
| border-default | | |
| border-strong | | |

---

## 2. Component

### Button

- **Primary**: nền: `primary-700`, chữ: `text-inverse`
- **Secondary**: nền: `bg-surface`, viền: `border-default`
- **Disabled**: độ mờ: 0.4
- **Ghost**: nền: trong suốt, chữ: `text-primary`

**Đường phân cách:** `border-subtle` ngang / dọc

**Kích thước:**

| Kích thước | Chiều cao | Padding | Font |
|---|---|---|---|
| sm | 32px | 0 12px | btn-sm |
| md | 40px | 0 16px | btn-md |
| lg | 48px | 0 20px | btn-lg |

---

### Input

- Nền: `bg-surface`
- Viền: `border-default` → khi focus `border-strong`
- Chữ: `text-primary`
- Placeholder: `text-disabled`
- Label: token `label`

---

### Card

- Nền (mặc định): `bg-surface`
- Đổ bóng: `shadow-sm`
- Viền: `border-subtle`
- Bo góc: `radius-lg`

---

### Badge

- Nền (mặc định): `bg-surface`
- Chữ: `text-secondary`
- Bo góc: `radius-full`

---

### Table

- Nền: `bg-page`
- Header: `bg-surface`
- Hover hàng: `bg-surface`
- Đường phân cách: `border-subtle`

---

### Modal

- Nền: `bg-surface`
- Overlay: `bg-overlay` với độ mờ 60%
- Bo góc: `radius-xl`

---

## 3. Hệ thống nền

| Cấp | Token | Sáng | Tối |
|---|---|---|---|
| 0 | bg-page | | |
| 1 | bg-surface | | |
| 2 | bg-overlay | | |
| 3 | bg-modal | | |

---

## 4. Khả năng tiếp cận

- Độ tương phản: mọi chữ nội dung phải đạt WCAG AA (tối thiểu 4.5:1)
- Focus: luôn hiển thị rõ, không bao giờ dùng `outline: none` mà không có vòng thay thế
- Chuyển động: bọc transition trong `prefers-reduced-motion`, giảm về 0ms
- Màu sắc: không bao giờ dùng màu làm tín hiệu duy nhất (kết hợp với icon hoặc chữ)
- Vùng chạm: tối thiểu 44×44px trên mobile

---

## 5. Quy tắc

1. **Không dùng magic number**: mọi giá trị đều truy về một token
2. **Token trước class**: component sử dụng token, không dùng giá trị hardcode
3. **Một nguồn sự thật duy nhất**: Figma là ý đồ, code là bản triển khai; đối chiếu lại mỗi sprint
4. **Component không phụ thuộc ngữ cảnh**: layout là trách nhiệm của phần tử cha
5. **Dark mode không phải là một tính năng**: kiểm thử mọi token ở cả hai chế độ trước khi phát hành
6. **Ghi lại lý do**: comment giải thích các ràng buộc, không mô tả code làm gì
7. **Deprecate trước khi xóa**: dành một sprint để migrate trước khi gỡ token hoặc component
