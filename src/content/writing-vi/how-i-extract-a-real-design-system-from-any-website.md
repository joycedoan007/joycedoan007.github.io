---
title: Cách tôi trích xuất design system thực từ bất kỳ website nào
date: "2026-05-01"
readTime: 8 phút đọc
description: Hầu hết công cụ AI đều có thể tạo UI. Vấn đề là chúng không biết design system của bạn. Đây là cách khắc phục.
notionUrl: https://cumbersome-mailbox-4e9.notion.site/How-I-Extract-a-Real-Design-System-from-Any-Website-and-Use-It-to-Generate-Consistent-UI-with-AI-360a5487c1e880b5be06f1104fffc780
popular: true
category: AI & công cụ
---

Hầu hết công cụ AI đều có thể tạo UI.

Nhưng vấn đề là: chúng không biết design system của bạn.

Vì vậy kết quả trở thành:

- khoảng cách không nhất quán
- typography ngẫu nhiên
- mỗi lần lại một kiểu button khác

Đó là lý do thay vì prompt *"Thiết kế một dashboard"*, tôi làm thế này:

**Trước tiên → trích xuất design system. Sau đó → tạo UI bằng chính system đó.**

## Quy trình này thực sự làm gì

Bạn dùng Claude Code để:

- Truy cập vào một website thật
- Phân tích cách nó được xây dựng (không chỉ nhìn vẻ ngoài)
- Trích xuất các quy tắc thiết kế của nó
- Lưu toàn bộ vào một file `design_system.md`

Sau đó bạn đưa file này cho các công cụ AI để chúng không còn phải đoán mò.

## Bước 1 — Cài đặt Claude Code (đừng nghĩ quá nhiều)

Bạn sẽ dùng:

- Mac → Terminal
- Windows → PowerShell / Windows Terminal

Bạn không cần "học code". Bạn chỉ cần:

- mở terminal
- dán lệnh
- chạy Claude

Vậy là xong.

## Bước 2 — Dán prompt này (ĐÂY mới là phần quan trọng)

Đây là chỗ hầu hết mọi người làm sai. Họ hỏi AI những câu mơ hồ như: *"Phân tích thiết kế này"*. Kết quả sẽ rất tệ.

Bạn cần buộc AI hành xử như một **design systems engineer**.

### Sao chép CHÍNH XÁC prompt này:

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

## Bước 3 — Để Claude chạy (chuyện gì đang diễn ra)

Claude sẽ:

- mở website
- kiểm tra HTML + CSS
- phát hiện các pattern UI lặp lại
- trích xuất token (màu sắc, khoảng cách, typography)
- phân tích component (button, card, nav, v.v.)

Sau đó nó tạo ra: `consortiagroup_design_system.md`

## Bước 4 — Mở file .md

File này là mỏ vàng của bạn. Nó chứa những thứ như:

- hệ thống màu chính xác (không phải đoán)
- cỡ chữ thực tế được dùng
- pattern khoảng cách (8px? 12px? 16px?)
- các biến thể button
- cấu trúc layout
- hành vi responsive

Về cơ bản, đây là: *"Sản phẩm này được thiết kế như thế nào ở bên dưới lớp vỏ"*

## Bước 5 — Đưa vào các công cụ thiết kế AI

Bây giờ hãy vào:

- Claude
- v0
- Lovable
- Bolt
- bất kỳ công cụ tạo UI bằng AI nào

Dán toàn bộ nội dung `design_system.md`. Sau đó prompt như:

- "Dùng design system này, tạo một dashboard"
- "Dùng system này, thiết kế luồng onboarding trên mobile"
- "Tạo một trang bảng giá"

## Bước 6 — Kết quả thay đổi thế nào (đây là điểm mấu chốt)

Không có quy trình này: AI bịa ra UI mỗi lần.

Có quy trình này: AI tuân theo quy tắc.

Và bạn sẽ có:

- khoảng cách nhất quán
- typography nhất quán
- component nhất quán
- phân cấp thị giác nhất quán

Nó bắt đầu giống một sản phẩm thật — chứ không phải những bài Dribbble ngẫu nhiên.

## Ý tưởng lớn (đừng bỏ qua)

Hầu hết mọi người dùng AI như thế này:

> Prompt → Màn hình → Sửa → Lặp lại

Cách đó không mở rộng được. Quy trình này đổi nó thành:

> Trích xuất system → Đưa system vào → Tạo màn hình

## Vì sao điều này quan trọng (với designer)

Bạn không còn chỉ thiết kế các màn hình nữa. Bạn đang định nghĩa:

- quy tắc
- cấu trúc
- sự nhất quán
- hành vi của hệ thống

Rồi để AI thực thi.

## Nếu bạn chỉ nhớ một điều

**AI không kém về thiết kế — nó chỉ thiếu system của bạn.**

Một khi bạn đưa system cho nó: mọi thứ đều tốt hơn gấp 10 lần.
