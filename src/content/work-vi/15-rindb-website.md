---
title: Thiết kế website RinDB
subtitle: Công cụ cho developer · B2B
description: Thiết kế website end-to-end cho RinDB, một cơ sở dữ liệu key-value nhẹ và có thể nhúng — từ design thinking, kiến trúc thông tin đến wireframe, design system và UI hoàn thiện.
skills: ["WEB DESIGN", "BRANDING", "UI/UX", "FIGMA"]
role: Nhà thiết kế UI/UX
company: "Personal Project"
year: "2025"
hasImage: false
order: 15
category: "Thiết kế web"
---

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); overflow: hidden; margin-bottom: 56px;">
  <div style="background: var(--bg-surface); padding: 20px 24px;">
    <div class="overline" style="margin-bottom: 6px;">Sản phẩm</div>
    <div style="font: 400 13px/20px 'Poppins', sans-serif; color: var(--text-primary);">RinDB — Cơ sở dữ liệu Key-Value</div>
  </div>
  <div style="background: var(--bg-surface); padding: 20px 24px;">
    <div class="overline" style="margin-bottom: 6px;">Trọng tâm</div>
    <div style="font: 400 13px/20px 'Poppins', sans-serif; color: var(--text-primary);">Marketing cho developer · Branding · IA</div>
  </div>
  <div style="background: var(--bg-surface); padding: 20px 24px;">
    <div class="overline" style="margin-bottom: 6px;">Phạm vi</div>
    <div style="font: 400 13px/20px 'Poppins', sans-serif; color: var(--text-primary);">Toàn bộ website · Một trang</div>
  </div>
  <div style="background: var(--bg-surface); padding: 20px 24px;">
    <div class="overline" style="margin-bottom: 6px;">Công cụ</div>
    <div style="font: 400 13px/20px 'Poppins', sans-serif; color: var(--text-primary);">Figma</div>
  </div>
  <div style="background: var(--bg-surface); padding: 20px 24px;">
    <div class="overline" style="margin-bottom: 6px;">Đối tượng</div>
    <div style="font: 400 13px/20px 'Poppins', sans-serif; color: var(--text-primary);">Developer · Kỹ sư</div>
  </div>
  <div style="background: var(--bg-surface); padding: 20px 24px;">
    <div class="overline" style="margin-bottom: 6px;">Năm</div>
    <div style="font: 400 13px/20px 'Poppins', sans-serif; color: var(--text-primary);">2024</div>
  </div>
</div>

<div style="margin: 0 0 20px;">
  <div class="overline" style="color: var(--text-accent); margin-bottom: 8px;">01 — Bối cảnh</div>
  <h2 style="font: 600 22px/1.2 'Poppins', sans-serif; letter-spacing: -0.02em; color: var(--text-bright); margin: 0;">Thách thức</h2>
</div>

RinDB là một cơ sở dữ liệu key-value nhẹ, có thể nhúng, dành cho developer cần lưu trữ nhanh, ít overhead mà không phải gánh sự phức tạp của một database engine đầy đủ. Sản phẩm vững về mặt kỹ thuật — vấn đề là truyền đạt điều đó đến đúng đối tượng theo cách khiến họ thực sự tin tưởng.

Marketing cho công cụ developer nằm ở một vị trí khó. Các trang database dành cho doanh nghiệp thường nói quá và mất uy tín với kỹ sư ngay lập tức. Các trang dự án open-source thì thường chẳng có thiết kế — đáng tin về kỹ thuật nhưng khó đánh giá nhanh. RinDB cần đứng ở giữa: nghiêm túc về kỹ thuật, trực quan gọn gàng và dễ đọc lướt.

<div style="background: var(--bg-surface); border-left: 2px solid var(--primary-500); border-radius: 0 var(--radius-lg) var(--radius-lg) 0; padding: 20px 24px; margin: 28px 0 56px;">
  <div class="overline" style="color: var(--text-accent); margin-bottom: 8px;">Vai trò của tôi</div>
  <p style="font: 400 15px/26px 'Poppins', sans-serif; color: var(--text-primary); margin: 0;">Tôi làm chủ toàn bộ quy trình thiết kế từ đầu đến cuối — empathy map, kiến trúc thông tin, sitemap, wireframe, design system, quản lý file Figma và UI high-fidelity. Đây là dự án thiết kế một mình, không bàn giao cho designer nào khác. Tôi đảm nhận toàn bộ design system — color token, typography, spacing, mọi component và từng trạng thái tương tác.</p>
</div>

<div style="margin: 0 0 20px;">
  <div class="overline" style="color: var(--text-accent); margin-bottom: 8px;">02 — Khám phá</div>
  <h2 style="font: 600 22px/1.2 'Poppins', sans-serif; letter-spacing: -0.02em; color: var(--text-bright); margin: 0;">Nghiên cứu & Insight chính</h2>
</div>

Trước khi chạm vào pixel, tôi vẽ ra người dùng là ai và họ thực sự cần gì từ một landing page của công cụ developer. Bốn pattern đã định hình mọi quyết định sau đó.

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 24px 0 56px;">
  <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px;">
    <div style="font: 600 11px/16px 'JetBrains Mono', monospace; color: var(--text-accent); margin-bottom: 10px;">01</div>
    <p style="font: 600 14px/20px 'Poppins', sans-serif; color: var(--text-bright); margin: 0 0 8px;">Developer đánh giá, chứ không lướt xem</p>
    <p style="font: 400 13px/22px 'Poppins', sans-serif; color: var(--text-secondary); margin: 0;">Kỹ sư đến với những câu hỏi cụ thể: Đã sẵn sàng cho production chưa? So với SQLite hay LevelDB thì thế nào? Có thể thử trong 5 phút không? Website cần trả lời những câu đó — thật nhanh.</p>
  </div>
  <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px;">
    <div style="font: 600 11px/16px 'JetBrains Mono', monospace; color: var(--text-accent); margin-bottom: 10px;">02</div>
    <p style="font: 600 14px/20px 'Poppins', sans-serif; color: var(--text-bright); margin: 0 0 8px;">Ngôn ngữ marketing phá hỏng uy tín</p>
    <p style="font: 400 13px/22px 'Poppins', sans-serif; color: var(--text-secondary); margin: 0;">Developer rất dị ứng với buzzword và value prop mơ hồ. Sự cụ thể tạo ra niềm tin — con số rõ ràng, use case thực tế và ngôn ngữ thẳng thắn cho thấy sản phẩm là thật.</p>
  </div>
  <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px;">
    <div style="font: 600 11px/16px 'JetBrains Mono', monospace; color: var(--text-accent); margin-bottom: 10px;">03</div>
    <p style="font: 600 14px/20px 'Poppins', sans-serif; color: var(--text-bright); margin: 0 0 8px;">Thời gian để dùng thử mới là chỉ số chuyển đổi thật sự</p>
    <p style="font: 400 13px/22px 'Poppins', sans-serif; color: var(--text-secondary); margin: 0;">Một developer đã chạy một lệnh CLI tức là họ đã cam kết. Đưa họ đến khoảnh khắc đó — thay vì bấm vào CTA "Contact Sales" — mới là thứ thực sự chuyển đổi trong lĩnh vực này.</p>
  </div>
  <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px;">
    <div style="font: 600 11px/16px 'JetBrains Mono', monospace; color: var(--text-accent); margin-bottom: 10px;">04</div>
    <p style="font: 600 14px/20px 'Poppins', sans-serif; color: var(--text-bright); margin: 0 0 8px;">Ngôn ngữ hình ảnh thể hiện văn hóa</p>
    <p style="font: 400 13px/22px 'Poppins', sans-serif; color: var(--text-secondary); margin: 0;">Giao diện tối, typography monospace và thẩm mỹ gần với code cho thấy đây là công cụ do kỹ sư làm cho kỹ sư — ngay cả trước khi người dùng đọc một chữ nào.</p>
  </div>
</div>

<div style="margin: 0 0 20px;">
  <div class="overline" style="color: var(--text-accent); margin-bottom: 8px;">03 — Thiết kế</div>
  <h2 style="font: 600 22px/1.2 'Poppins', sans-serif; letter-spacing: -0.02em; color: var(--text-bright); margin: 0;">Các quyết định thiết kế chính</h2>
</div>

<div style="display: flex; flex-direction: column; gap: 10px; margin: 24px 0 56px;">
  <div style="border-left: 2px solid var(--primary-500); background: var(--bg-surface); border-radius: 0 var(--radius-xl) var(--radius-xl) 0; padding: 24px 28px;">
    <div class="overline" style="color: var(--text-accent); margin-bottom: 8px;">Quyết định 01</div>
    <p style="font: 600 15px/1.4 'Poppins', sans-serif; color: var(--text-bright); margin: 0 0 10px;">Ví dụ CLI ngay trên above the fold</p>
    <p style="font: 400 14px/24px 'Poppins', sans-serif; color: var(--text-primary); margin: 0;">Hầu hết website công cụ developer chôn cách sử dụng thực tế sau lớp copy marketing. Tôi đẩy ví dụ CLI lên cao — sát hero — để developer thấy ngay việc dùng RinDB trông như thế nào trước khi quyết định đọc tiếp. Cho thấy giao diện sử dụng là tín hiệu tin cậy mạnh nhất có thể có.</p>
  </div>
  <div style="border-left: 2px solid var(--primary-500); background: var(--bg-surface); border-radius: 0 var(--radius-xl) var(--radius-xl) 0; padding: 24px 28px;">
    <div class="overline" style="color: var(--text-accent); margin-bottom: 8px;">Quyết định 02</div>
    <p style="font: 600 15px/1.4 'Poppins', sans-serif; color: var(--text-bright); margin: 0 0 10px;">Bảng màu tối với điểm nhấn đỏ cam</p>
    <p style="font: 400 14px/24px 'Poppins', sans-serif; color: var(--text-primary); margin: 0;">Nền tối (<code style="font: 500 12px/18px 'JetBrains Mono', monospace; color: var(--text-accent);">#0D0D0D</code>) cùng điểm nhấn đỏ cam (<code style="font: 500 12px/18px 'JetBrains Mono', monospace; color: var(--text-accent);">#C0392B → #E74C3C</code>) là một tín hiệu văn hóa có chủ đích. Nó gợi cảm giác low-level, tập trung vào hiệu năng và đậm chất kỹ sư — không phải một dashboard SaaS. Độ tương phản cũng đảm bảo các code block luôn dễ đọc.</p>
  </div>
  <div style="border-left: 2px solid var(--primary-500); background: var(--bg-surface); border-radius: 0 var(--radius-xl) var(--radius-xl) 0; padding: 24px 28px;">
    <div class="overline" style="color: var(--text-accent); margin-bottom: 8px;">Quyết định 03</div>
    <p style="font: 600 15px/1.4 'Poppins', sans-serif; color: var(--text-bright); margin: 0 0 10px;">Kiến trúc phẳng một trang</p>
    <p style="font: 400 14px/24px 'Poppins', sans-serif; color: var(--text-primary); margin: 0;">Website nhiều trang sẽ làm đứt gãy hành trình đánh giá. Một lần cuộn duy nhất giữ developer trong mạch ngữ cảnh khi họ đi qua value prop → tính năng → kiến trúc → dùng thử. Mỗi section trả lời câu hỏi tiếp theo có khả năng xuất hiện nhất, giảm nhu cầu phải rời trang rồi quay lại.</p>
  </div>
</div>

<div style="margin: 0 0 20px;">
  <div class="overline" style="color: var(--text-accent); margin-bottom: 8px;">04 — Kiến trúc</div>
  <h2 style="font: 600 22px/1.2 'Poppins', sans-serif; letter-spacing: -0.02em; color: var(--text-bright); margin: 0;">Kiến trúc thông tin</h2>
</div>

Trang được cấu trúc như một lần cuộn có dẫn dắt — mỗi section trả lời câu hỏi tự nhiên nảy sinh từ section trước. Không ngõ cụt, không phải rời trang.

<div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px 28px; margin: 24px 0 56px;">
  <div class="overline" style="margin-bottom: 16px;">Luồng trang</div>
  <div style="display: flex; flex-direction: column; gap: 0;">
    <div style="display: flex; gap: 16px; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0;">
        <span style="width: 24px; height: 24px; border-radius: 50%; background: var(--primary-500); color: var(--text-inverse); font: 600 11px/24px 'JetBrains Mono', monospace; text-align: center; display: block;">1</span>
        <span style="width: 1px; height: 18px; background: var(--border-subtle); display: block;"></span>
      </div>
      <div style="padding-bottom: 18px;">
        <p style="font: 600 13px/18px 'Poppins', sans-serif; color: var(--text-bright); margin: 2px 0 2px;">Hero</p>
        <p style="font: 400 12px/18px 'Poppins', sans-serif; color: var(--text-secondary); margin: 0;">Tên sản phẩm + value prop một dòng + hai CTA (Get Started, View Docs)</p>
      </div>
    </div>
    <div style="display: flex; gap: 16px; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0;">
        <span style="width: 24px; height: 24px; border-radius: 50%; background: var(--bg-elevated); border: 1px solid var(--border-default); color: var(--text-secondary); font: 600 11px/22px 'JetBrains Mono', monospace; text-align: center; display: block;">2</span>
        <span style="width: 1px; height: 18px; background: var(--border-subtle); display: block;"></span>
      </div>
      <div style="padding-bottom: 18px;">
        <p style="font: 600 13px/18px 'Poppins', sans-serif; color: var(--text-bright); margin: 2px 0 2px;">Vì sao chọn RinDB</p>
        <p style="font: 400 12px/18px 'Poppins', sans-serif; color: var(--text-secondary); margin: 0;">Ba trụ cột: Nhẹ & có thể nhúng, Sạch/An toàn/Chính xác, Ưu tiên developer</p>
      </div>
    </div>
    <div style="display: flex; gap: 16px; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0;">
        <span style="width: 24px; height: 24px; border-radius: 50%; background: var(--bg-elevated); border: 1px solid var(--border-default); color: var(--text-secondary); font: 600 11px/22px 'JetBrains Mono', monospace; text-align: center; display: block;">3</span>
        <span style="width: 1px; height: 18px; background: var(--border-subtle); display: block;"></span>
      </div>
      <div style="padding-bottom: 18px;">
        <p style="font: 600 13px/18px 'Poppins', sans-serif; color: var(--text-bright); margin: 2px 0 2px;">Phù hợp ở đâu → Hoạt động thế nào</p>
        <p style="font: 400 12px/18px 'Poppins', sans-serif; color: var(--text-secondary); margin: 0;">Sơ đồ kiến trúc: Dung lượng tối thiểu → Bảng ETL → Snapshot → Observability</p>
      </div>
    </div>
    <div style="display: flex; gap: 16px; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0;">
        <span style="width: 24px; height: 24px; border-radius: 50%; background: var(--bg-elevated); border: 1px solid var(--border-default); color: var(--text-secondary); font: 600 11px/22px 'JetBrains Mono', monospace; text-align: center; display: block;">4</span>
        <span style="width: 1px; height: 18px; background: var(--border-subtle); display: block;"></span>
      </div>
      <div style="padding-bottom: 18px;">
        <p style="font: 600 13px/18px 'Poppins', sans-serif; color: var(--text-bright); margin: 2px 0 2px;">Dùng thử không cần code</p>
        <p style="font: 400 12px/18px 'Poppins', sans-serif; color: var(--text-secondary); margin: 0;">Khối ví dụ CLI — có thể copy, chạy được ngay</p>
      </div>
    </div>
    <div style="display: flex; gap: 16px; align-items: flex-start;">
      <div style="flex-shrink: 0;">
        <span style="width: 24px; height: 24px; border-radius: 50%; background: var(--primary-500); color: var(--text-inverse); font: 600 11px/24px 'JetBrains Mono', monospace; text-align: center; display: block;">5</span>
      </div>
      <div>
        <p style="font: 600 13px/18px 'Poppins', sans-serif; color: var(--text-accent); margin: 2px 0 2px;">Ví dụ → FAQ → Tìm hiểu thêm</p>
        <p style="font: 400 12px/18px 'Poppins', sans-serif; color: var(--text-secondary); margin: 0;">Edge case, giải đáp băn khoăn và lối vào tài liệu</p>
      </div>
    </div>
  </div>
</div>

<div style="margin: 0 0 20px;">
  <div class="overline" style="color: var(--text-accent); margin-bottom: 8px;">05 — Nền tảng</div>
  <h2 style="font: 600 22px/1.2 'Poppins', sans-serif; letter-spacing: -0.02em; color: var(--text-bright); margin: 0;">Design System</h2>
</div>

Tôi xây dựng và quản lý toàn bộ design system trong Figma. Với đối tượng là developer, mỗi quyết định trong hệ thống đều có lý do — không có yếu tố trang trí nào thiếu mục đích.

<div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px 28px; margin: 24px 0 20px;">
  <div class="overline" style="margin-bottom: 16px;">Cấu trúc file Figma</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div>
      <div style="font: 500 12px/18px 'JetBrains Mono', monospace; color: var(--text-disabled); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px;">Các page</div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <div style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--text-accent); font-size: 12px;">📄</span><span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Cover</span></div>
        <div style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--text-accent); font-size: 12px;">📄</span><span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Design System</span></div>
        <div style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--text-accent); font-size: 12px;">📄</span><span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Empathy Map & IA</span></div>
        <div style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--text-accent); font-size: 12px;">📄</span><span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Wireframes</span></div>
        <div style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--text-accent); font-size: 12px;">📄</span><span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Desktop — UI hoàn thiện</span></div>
        <div style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--text-accent); font-size: 12px;">📄</span><span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Mobile — UI hoàn thiện</span></div>
      </div>
    </div>
    <div>
      <div style="font: 500 12px/18px 'JetBrains Mono', monospace; color: var(--text-disabled); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px;">System Token</div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Nền tối <code style="font: 500 11px 'JetBrains Mono', monospace; color: var(--text-accent);">#0D0D0D</code></span>
        <span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Màu nhấn đỏ cam <code style="font: 500 11px 'JetBrains Mono', monospace; color: var(--text-accent);">#E74C3C</code></span>
        <span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Font sans-serif hệ thống cho phần thân</span>
        <span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Monospace cho đoạn code mẫu</span>
        <span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Lưới spacing cơ sở 8px</span>
      </div>
    </div>
  </div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 12px 0 16px;">
  <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px;">
    <div class="overline" style="margin-bottom: 14px;">Component</div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Card tính năng</span>
      <span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Đoạn code block</span>
      <span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Accordion FAQ</span>
      <span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Thanh điều hướng sticky</span>
    </div>
  </div>
  <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px;">
    <div class="overline" style="margin-bottom: 14px;">Trạng thái component</div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Default</span>
      <span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Hover</span>
      <span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Active</span>
      <span style="font: 400 13px/18px 'Poppins', sans-serif; color: var(--text-primary);">Disabled</span>
    </div>
  </div>
</div>

<div style="margin: 48px 0 20px;">
  <div class="overline" style="color: var(--text-accent); margin-bottom: 8px;">06 — Kết quả</div>
  <h2 style="font: 600 22px/1.2 'Poppins', sans-serif; letter-spacing: -0.02em; color: var(--text-bright); margin: 0;">Thành quả</h2>
</div>

RinDB có một website marketing tương xứng với chất lượng sản phẩm — đáng tin về kỹ thuật, dễ đọc lướt và có thể hành động ngay. Ngôn ngữ hình ảnh truyền tải văn hóa kỹ sư trước cả khi người dùng đọc một chữ. Luồng trang đưa developer từ "đây là gì" đến "để mình thử" mà không có ma sát.

<div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-xl); padding: 28px 32px; margin-top: 28px;">
  <div class="overline" style="color: var(--text-accent); margin-bottom: 12px;">Nhìn lại</div>
  <p style="font: 400 15px/26px 'Poppins', sans-serif; color: var(--text-primary); margin: 0;">Thiết kế cho đối tượng developer là một trải nghiệm khiêm tốn — họ đọc các lựa chọn thiết kế một cách phản biện, chứ không chỉ về mặt thẩm mỹ. Điều lớn nhất tôi học được ở đây là sự tiết chế chính là một tính năng. Với mỗi yếu tố định thêm vào, tôi đều tự hỏi: điều này giúp developer ra quyết định nhanh hơn, hay làm họ chậm lại? Nếu câu trả lời không rõ ràng là "nhanh hơn" thì nó không được giữ lại.</p>
</div>
