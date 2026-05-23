import { useState, useEffect, useRef } from 'react';

export interface WorkItem {
  id: string;
  tag: string;
  title: string;
  year: string;
  role: string;
  size: string;
  accent: 'green' | 'dark' | 'gray';
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: { value: string; label: string }[];
  featured?: boolean;
  order: number;
}

// ─── SVG dashboard thumbnail ─────────────────────────────────────────────────
function DashThumb({ accent }: { accent: WorkItem['accent'] }) {
  const stroke = accent === 'green' ? 'rgba(0,216,146,0.6)' : 'rgba(255,255,255,0.4)';
  const fill = accent === 'green' ? 'rgba(0,216,146,0.18)' : 'rgba(255,255,255,0.08)';
  return (
    <svg
      viewBox="0 0 320 220"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      preserveAspectRatio="none"
    >
      <rect x="16" y="16" width="60" height="8" rx="2" fill="rgba(255,255,255,0.2)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={16 + i * 64}
            y={36}
            width={56}
            height={40}
            rx="2"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.12)"
          />
          <rect x={22 + i * 64} y={56} width="28" height="10" rx="1.5" fill={stroke} />
        </g>
      ))}
      <rect
        x="16"
        y="88"
        width="288"
        height="116"
        rx="2"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.10)"
      />
      <polyline
        points="24,180 56,160 88,170 120,140 152,150 184,120 216,130 248,100 280,110 296,90"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
      <polygon
        points="24,180 56,160 88,170 120,140 152,150 184,120 216,130 248,100 280,110 296,90 296,200 24,200"
        fill={fill}
      />
    </svg>
  );
}

// ─── Large dashboard for Featured / Modal ────────────────────────────────────
function BigDashboard() {
  return (
    <svg
      viewBox="0 0 800 340"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      preserveAspectRatio="none"
    >
      <rect x="40" y="40" width="120" height="14" rx="3" fill="rgba(255,255,255,0.2)" />
      <rect x="180" y="40" width="60" height="14" rx="3" fill="rgba(255,255,255,0.08)" />
      <rect x="260" y="40" width="60" height="14" rx="3" fill="rgba(255,255,255,0.08)" />
      <rect
        x="660"
        y="36"
        width="100"
        height="22"
        rx="3"
        fill="rgba(0,216,146,0.25)"
        stroke="rgba(0,216,146,0.6)"
      />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={40 + i * 180}
            y={80}
            width={160}
            height={70}
            rx="4"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.12)"
          />
          <rect
            x={56 + i * 180}
            y={94}
            width="60"
            height="8"
            rx="2"
            fill="rgba(255,255,255,0.4)"
          />
          <rect
            x={56 + i * 180}
            y={114}
            width="80"
            height="20"
            rx="3"
            fill="rgba(0,216,146,0.6)"
          />
        </g>
      ))}
      <rect
        x="40"
        y="170"
        width="500"
        height="140"
        rx="4"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.10)"
      />
      <polyline
        points="60,280 110,260 160,270 210,220 260,235 310,200 360,215 410,170 460,185 510,150 530,160"
        fill="none"
        stroke="rgba(0,216,146,0.85)"
        strokeWidth="2"
      />
      <polygon
        points="60,280 110,260 160,270 210,220 260,235 310,200 360,215 410,170 460,185 510,150 530,160 530,300 60,300"
        fill="rgba(0,216,146,0.18)"
      />
      <rect
        x="560"
        y="170"
        width="200"
        height="140"
        rx="4"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.10)"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect
            x="576"
            y={186 + i * 22}
            width={120 - i * 8}
            height="8"
            rx="2"
            fill="rgba(255,255,255,0.3)"
          />
          <rect
            x="720"
            y={186 + i * 22}
            width="24"
            height="8"
            rx="2"
            fill={i === 0 ? 'rgba(0,216,146,0.85)' : 'rgba(255,255,255,0.18)'}
          />
        </g>
      ))}
    </svg>
  );
}

// ─── Work row ────────────────────────────────────────────────────────────────
function WorkRow({
  item,
  idx,
  onOpen,
  onHover,
  isHovered,
}: {
  item: WorkItem;
  idx: number;
  onOpen: (item: WorkItem) => void;
  onHover: (item: WorkItem | null, e?: React.MouseEvent) => void;
  isHovered: boolean;
}) {
  return (
    <div
      onMouseEnter={(e) => onHover(item, e)}
      onMouseLeave={() => onHover(null)}
      onMouseMove={(e) => onHover(item, e)}
      onClick={() => onOpen(item)}
      data-cursor="hover"
      style={{
        display: 'grid',
        gridTemplateColumns: '64px 200px 1fr 120px 100px 32px',
        gap: 24,
        alignItems: 'center',
        padding: `24px ${isHovered ? '16px' : '0'}`,
        borderBottom: '1px solid var(--border-subtle)',
        cursor: 'pointer',
        transition: 'background 200ms ease, padding 200ms ease',
        background: isHovered ? 'var(--bg-surface)' : 'transparent',
      }}
    >
      <span
        style={{ font: "500 14px/18px 'JetBrains Mono', monospace", color: 'var(--text-secondary)' }}
      >
        {String(idx + 1).padStart(2, '0')}
      </span>
      <span
        style={{
          font: "500 13px/18px 'JetBrains Mono', monospace",
          color: isHovered ? 'var(--text-accent)' : 'var(--text-secondary)',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          transition: 'color 200ms ease',
        }}
      >
        {item.tag}
      </span>
      <span
        style={{
          font: "500 32px/40px 'Inter Tight', sans-serif",
          letterSpacing: '-0.02em',
          color: 'var(--text-bright)',
        }}
      >
        {item.title}
      </span>
      <span
        style={{ font: "400 14px/20px 'Inter Tight', sans-serif", color: 'var(--text-primary)' }}
      >
        {item.role}
      </span>
      <span
        style={{ font: "500 14px/20px 'JetBrains Mono', monospace", color: 'var(--text-secondary)' }}
      >
        {item.year}
      </span>
      <i
        className="ph-bold ph-arrow-up-right"
        style={{
          fontSize: 18,
          color: isHovered ? 'var(--text-accent)' : 'var(--text-secondary)',
          transition: 'color 200ms ease, transform 200ms ease',
          transform: isHovered ? 'translate(2px, -2px)' : 'none',
        }}
      />
    </div>
  );
}

// ─── Work index section ───────────────────────────────────────────────────────
function WorkIndex({
  items,
  onOpen,
}: {
  items: WorkItem[];
  onOpen: (item: WorkItem) => void;
}) {
  const [hoverItem, setHoverItem] = useState<WorkItem | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  function handleHover(item: WorkItem | null, e?: React.MouseEvent) {
    if (item && e) setHoverPos({ x: e.clientX, y: e.clientY });
    setHoverItem(item);
  }

  return (
    <section id="work" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '96px 48px' }}>
        <div
          data-reveal
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 56,
            paddingBottom: 24,
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div>
            <div className="overline" style={{ marginBottom: 12 }}>
              01 · The work — {items.length} entries
            </div>
            <h2
              style={{
                font: "500 80px/0.92 'Inter Tight', sans-serif",
                letterSpacing: '-0.035em',
                color: 'var(--text-bright)',
                margin: 0,
              }}
            >
              Selected work, indexed.
            </h2>
          </div>
          <span
            style={{
              font: "500 13px/20px 'JetBrains Mono', monospace",
              color: 'var(--text-secondary)',
            }}
          >
            Hover · click to open
          </span>
        </div>

        {/* Table header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '64px 200px 1fr 120px 100px 32px',
            gap: 24,
            padding: '0 0 12px',
            borderBottom: '1px solid var(--border-subtle)',
            font: "500 11px/16px 'JetBrains Mono', monospace",
            color: 'var(--text-secondary)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <span>№</span>
          <span>Category</span>
          <span>Project</span>
          <span>Role</span>
          <span>Year</span>
          <span />
        </div>

        {items.map((w, i) => (
          <WorkRow
            key={w.id}
            item={w}
            idx={i}
            onOpen={onOpen}
            onHover={handleHover}
            isHovered={hoverItem?.id === w.id}
          />
        ))}
      </div>

      {/* Floating thumbnail */}
      {hoverItem && (
        <div
          style={{
            position: 'fixed',
            top: hoverPos.y - 140,
            left: hoverPos.x + 32,
            width: 320,
            height: 220,
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            background:
              hoverItem.accent === 'green'
                ? 'linear-gradient(135deg, #002923 0%, #005441 60%, color-mix(in srgb, var(--primary-500) 40%, #002923) 100%)'
                : 'linear-gradient(135deg, #0B0E12 0%, #1A1A1A 100%)',
            pointerEvents: 'none',
            zIndex: 100,
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          }}
        >
          <DashThumb accent={hoverItem.accent} />
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              padding: '4px 10px',
              background: 'rgba(11,14,18,0.7)',
              borderRadius: 'var(--radius-full)',
              font: "600 11px/14px 'Inter Tight', sans-serif",
              color: 'var(--text-bright)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {hoverItem.tag}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Featured section ─────────────────────────────────────────────────────────
function Featured({
  item,
  onOpen,
}: {
  item: WorkItem;
  onOpen: (item: WorkItem) => void;
}) {
  return (
    <section
      id="featured"
      style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '96px 48px' }}>
        <div
          data-reveal
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingBottom: 24,
            marginBottom: 56,
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div className="overline">02 · Featured deep dive</div>
          <span
            style={{
              font: "500 13px/20px 'JetBrains Mono', monospace",
              color: 'var(--text-secondary)',
            }}
          >
            {item.year} · {item.size}
          </span>
        </div>

        <div data-reveal style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
          <h2
            style={{
              font: "500 96px/0.92 'Inter Tight', sans-serif",
              letterSpacing: '-0.035em',
              color: 'var(--text-bright)',
              margin: '0 0 48px',
              maxWidth: 1100,
              textWrap: 'balance',
            }}
          >
            {item.summary}
          </h2>
        </div>

        <div data-reveal style={{ '--reveal-delay': '140ms' } as React.CSSProperties}>
          <div
            style={{
              aspectRatio: '21 / 9',
              background:
                'linear-gradient(135deg, #002923 0%, #005441 60%, color-mix(in srgb, var(--primary-500) 35%, #002923) 100%)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: 56,
            }}
          >
            <BigDashboard />
            <div
              style={{
                position: 'absolute',
                top: 24,
                left: 24,
                padding: '6px 12px',
                background: 'rgba(11,14,18,0.7)',
                borderRadius: 'var(--radius-full)',
                font: "600 12px/16px 'Inter Tight', sans-serif",
                color: 'var(--text-bright)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {item.tag} · {item.title}
            </div>
          </div>
        </div>

        <div data-reveal style={{ '--reveal-delay': '200ms' } as React.CSSProperties}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 48,
              paddingTop: 32,
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            {(
              [
                ['Problem', item.problem],
                ['Approach', item.approach],
                ['Outcome', item.outcome],
              ] as [string, string][]
            ).map(([h, body]) => (
              <div key={h}>
                <div className="overline" style={{ marginBottom: 12 }}>
                  {h}
                </div>
                <p
                  style={{
                    font: "400 17px/28px 'Inter Tight', sans-serif",
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal style={{ '--reveal-delay': '260ms' } as React.CSSProperties}>
          <div
            style={{
              marginTop: 48,
              display: 'grid',
              gridTemplateColumns: `repeat(${item.metrics.length}, 1fr) auto`,
              gap: 0,
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-page)',
            }}
          >
            {item.metrics.map(({ value, label }) => (
              <div
                key={label}
                style={{
                  padding: 24,
                  borderRight: '1px solid var(--border-subtle)',
                }}
              >
                <div className="overline" style={{ marginBottom: 8 }}>
                  {label}
                </div>
                <div
                  style={{
                    font: "500 48px/52px 'Inter Tight', sans-serif",
                    letterSpacing: '-0.025em',
                    color: 'var(--text-accent)',
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
            <button
              onClick={() => onOpen(item)}
              data-cursor="hover"
              style={{
                padding: '24px 32px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-bright)',
                font: "600 15px/20px 'Inter Tight', sans-serif",
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              Read full case
              <i className="ph-bold ph-arrow-right" style={{ fontSize: 16 }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Case study modal ─────────────────────────────────────────────────────────
function CaseModal({
  item,
  onClose,
}: {
  item: WorkItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '40px 24px',
        overflowY: 'auto',
        animation: 'modal-fade 200ms ease',
      }}
    >
      <style>{`
        @keyframes modal-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modal-slide { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: 1080,
          position: 'relative',
          animation: 'modal-slide 240ms cubic-bezier(.2,.7,.2,1)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'sticky',
            top: 16,
            marginLeft: 'auto',
            marginRight: 16,
            marginTop: 16,
            display: 'flex',
            float: 'right',
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-bright)',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i className="ph-bold ph-x" style={{ fontSize: 16 }} />
        </button>

        <div style={{ padding: '48px 64px 64px' }}>
          <div className="overline" style={{ marginBottom: 12 }}>
            {item.tag} · {item.year} · {item.size}
          </div>
          <h2
            style={{
              font: "500 72px/0.96 'Inter Tight', sans-serif",
              letterSpacing: '-0.03em',
              color: 'var(--text-bright)',
              margin: '0 0 16px',
              maxWidth: 800,
            }}
          >
            {item.title}
          </h2>
          <p
            style={{
              font: "400 22px/32px 'Inter Tight', sans-serif",
              color: 'var(--text-primary)',
              margin: '0 0 40px',
              maxWidth: 760,
            }}
          >
            {item.summary}
          </p>

          <div
            style={{
              aspectRatio: '21 / 9',
              background:
                'linear-gradient(135deg, #002923 0%, #005441 60%, color-mix(in srgb, var(--primary-500) 35%, #002923) 100%)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: 40,
            }}
          >
            <BigDashboard />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${item.metrics.length}, 1fr)`,
              gap: 0,
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: 40,
            }}
          >
            {item.metrics.map(({ value, label }, i) => (
              <div
                key={label}
                style={{
                  padding: 24,
                  borderRight:
                    i < item.metrics.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                <div className="overline" style={{ marginBottom: 8 }}>
                  {label}
                </div>
                <div
                  style={{
                    font: "500 36px/40px 'Inter Tight', sans-serif",
                    letterSpacing: '-0.02em',
                    color: 'var(--text-accent)',
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          {(
            [
              { h: 'Role', body: `${item.role} · ${item.size}` },
              { h: 'Problem', body: item.problem },
              { h: 'Approach', body: item.approach },
              { h: 'Outcome', body: item.outcome },
            ] as { h: string; body: string }[]
          ).map((s) => (
            <div
              key={s.h}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: 24,
                paddingBottom: 24,
                marginBottom: 24,
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <div className="overline">{s.h}</div>
              <p
                style={{
                  font: "400 18px/30px 'Inter Tight', sans-serif",
                  color: 'var(--text-primary)',
                  margin: 0,
                  maxWidth: 800,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function WorkPortfolio({
  workItemsJson,
  featuredId,
}: {
  workItemsJson: string;
  featuredId: string;
}) {
  const items: WorkItem[] = JSON.parse(workItemsJson);
  const featured = items.find((w) => w.id === featuredId) ?? items[0];
  const [openItem, setOpenItem] = useState<WorkItem | null>(null);

  return (
    <>
      <WorkIndex items={items} onOpen={setOpenItem} />
      <Featured item={featured} onOpen={setOpenItem} />
      <CaseModal item={openItem} onClose={() => setOpenItem(null)} />
    </>
  );
}
