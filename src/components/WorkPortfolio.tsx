import { useState, useEffect, useRef } from 'react';
import { useLang, useT } from '../i18n/react';


export interface WorkItem {
  id: string;
  slug?: string;
  tag: string;
  title: string;
  year: string;
  role: string;
  size: string;
  accent: 'green' | 'dark' | 'gray';
  titleVi?: string;
  tagVi?: string;
  summaryVi?: string;
  roleVi?: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: { value: string; label: string }[];
  featured?: boolean;
  ai?: boolean;
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
  onHover: (item: WorkItem | null) => void;
  isHovered: boolean;
}) {
  const isVi = useLang() === 'vi';
  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '64px 200px 1fr 120px 100px 32px',
    gap: 24,
    alignItems: 'center',
    padding: `24px ${isHovered ? '16px' : '0'}`,
    borderBottom: '1px solid var(--border-subtle)',
    cursor: 'pointer',
    transition: 'background 200ms ease, padding 200ms ease',
    background: isHovered ? 'var(--bg-surface)' : 'transparent',
    textDecoration: 'none',
    color: 'inherit',
  };

  const inner = (
    <>
      <span style={{ font: "500 14px/18px 'JetBrains Mono', monospace", color: 'var(--text-secondary)' }}>
        {String(idx + 1).padStart(2, '0')}
      </span>
      <span style={{
        font: "500 13px/18px 'JetBrains Mono', monospace",
        color: isHovered ? 'var(--text-accent)' : 'var(--text-secondary)',
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        transition: 'color 200ms ease',
      }}>
        {isVi ? item.tagVi ?? item.tag : item.tag}
      </span>
      <span style={{ font: "500 32px/40px 'Poppins', sans-serif", letterSpacing: '-0.02em', color: 'var(--text-bright)' }}>
        {isVi ? item.titleVi ?? item.title : item.title}
      </span>
      <span style={{ font: "400 14px/20px 'Poppins', sans-serif", color: 'var(--text-primary)' }}>
        {isVi ? item.roleVi ?? item.role : item.role}
      </span>
      <span style={{ font: "500 14px/20px 'JetBrains Mono', monospace", color: 'var(--text-secondary)' }}>
        {item.year}
      </span>
      <i className="ph-bold ph-arrow-up-right" style={{
        fontSize: 18,
        color: isHovered ? 'var(--text-accent)' : 'var(--text-secondary)',
        transition: 'color 200ms ease, transform 200ms ease',
        transform: isHovered ? 'translate(2px, -2px)' : 'none',
      }} />
    </>
  );

  if (item.slug) {
    return (
      <a
        className="work-row"
        href={`/work/${item.slug}`}
        onMouseEnter={() => onHover(item)}
        onMouseLeave={() => onHover(null)}
        data-cursor="hover"
        style={rowStyle}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      className="work-row"
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onOpen(item)}
      data-cursor="hover"
      style={rowStyle}
    >
      {inner}
    </div>
  );
}

// ─── AI mode: scramble-to-text reveal + sparkle burst ────────────────────────
const GLYPHS = '✦+*/<>#%&01';

function useScramble(target: string) {
  const [out, setOut] = useState(target);
  const first = useRef(true);
  useEffect(() => {
    if (first.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      first.current = false;
      setOut(target);
      return;
    }
    let frame = 0;
    const total = 26;
    const id = setInterval(() => {
      frame++;
      const done = Math.floor((frame / total) * target.length);
      setOut(
        target
          .split('')
          .map((c, i) => (i < done || c === ' ' ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('')
      );
      if (frame >= total) {
        clearInterval(id);
        setOut(target);
      }
    }, 28);
    return () => clearInterval(id);
  }, [target]);
  return out;
}

function Sparkles({ burst }: { burst: number }) {
  if (!burst) return null;
  return (
    <span className="ai-sparkles" key={burst} aria-hidden="true">
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const d = 34 + (i % 3) * 14;
        return (
          <i
            key={i}
            style={
              {
                '--dx': `${Math.cos(a) * d}px`,
                '--dy': `${Math.sin(a) * d}px`,
                '--delay': `${(i % 4) * 40}ms`,
              } as React.CSSProperties
            }
          >
            ✦
          </i>
        );
      })}
    </span>
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
  const [aiMode, setAiMode] = useState(false);
  const [burst, setBurst] = useState(0);
  const t = useT();
  const shown = items.filter((w) => !!w.ai === aiMode);
  const title = useScramble(aiMode ? t('Selected work, designed with AI.') : t('Selected work, designed by hand.'));

  function toggleAi() {
    setAiMode((v) => !v);
    setBurst((b) => b + 1);
  }

  function handleHover(item: WorkItem | null) {
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
              {t('The work')}
            </div>
            <h2
              className={aiMode ? 'ai-title is-ai' : 'ai-title'}
              style={{
                font: "500 clamp(30px, 3.4vw, 44px)/1.1 'Poppins', sans-serif",
                letterSpacing: '-0.035em',
                color: 'var(--text-bright)',
                margin: 0,
              }}
            >
              {title}
            </h2>
          </div>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              type="button"
              role="switch"
              aria-checked={aiMode}
              onClick={toggleAi}
              data-cursor="hover"
              className={aiMode ? 'ai-switch is-on' : 'ai-switch'}
            >
              <span>{t('AI mode')}</span>
              <span className="ai-switch__track">
                <span className="ai-switch__thumb" />
              </span>
            </button>
            <Sparkles burst={aiMode ? burst : 0} />
          </div>
        </div>

        {/* Table header */}
        <div
          className="work-head"
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
          <span>{t('Category')}</span>
          <span>{t('Project')}</span>
          <span>{t('Role')}</span>
          <span>{t('Year')}</span>
          <span />
        </div>

        {/* Keyed by mode so the rows replay their entrance whenever AI mode flips */}
        <div key={aiMode ? 'ai' : 'hand'} className={aiMode ? 'ai-rows is-ai' : 'ai-rows'}>
          {shown.map((w, i) => (
            <div className="ai-row" style={{ '--i': i } as React.CSSProperties} key={w.id}>
              <WorkRow
                item={w}
                idx={i}
                onOpen={onOpen}
                onHover={handleHover}
                isHovered={hoverItem?.id === w.id}
              />
            </div>
          ))}
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
  const isVi = useLang() === 'vi';
  const t = useT();
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
  const pick = (en: string, v?: string) => (isVi ? v ?? en : en);

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
          borderRadius: 'var(--radius-card)',
          width: '100%',
          maxWidth: 1080,
          position: 'relative',
          animation: 'modal-slide 240ms cubic-bezier(.2,.7,.2,1)',
        }}
      >
        <button
          onClick={onClose}
          aria-label={t('Close')}
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
            borderRadius: 'var(--radius-btn)',
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
            {pick(item.tag, item.tagVi)} · {item.year} · {item.size}
          </div>
          <h2
            style={{
              font: "500 clamp(28px, 3vw, 40px)/1.1 'Poppins', sans-serif",
              letterSpacing: '-0.03em',
              color: 'var(--text-bright)',
              margin: '0 0 16px',
              maxWidth: 800,
            }}
          >
            {pick(item.title, item.titleVi)}
          </h2>
          <p
            style={{
              font: "400 18px/28px 'Poppins', sans-serif",
              color: 'var(--text-primary)',
              margin: '0 0 40px',
              maxWidth: 760,
            }}
          >
            {pick(item.summary, item.summaryVi)}
          </p>

          <div
            style={{
              aspectRatio: '21 / 9',
              background:
                'linear-gradient(135deg, #002923 0%, #005441 60%, color-mix(in srgb, var(--primary-500) 35%, #002923) 100%)',
              borderRadius: 'var(--radius-card)',
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
              borderRadius: 'var(--radius-card)',
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
                    font: "500 36px/40px 'Poppins', sans-serif",
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
              { h: t('Role'), body: `${pick(item.role, item.roleVi)} · ${item.size}` },
              { h: t('Problem'), body: item.problem },
              { h: t('Approach'), body: item.approach },
              { h: t('Outcome'), body: item.outcome },
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
                  font: "400 14px/22px 'Poppins', sans-serif",
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
}: {
  workItemsJson: string;
}) {
  const items: WorkItem[] = JSON.parse(workItemsJson);
  const [openItem, setOpenItem] = useState<WorkItem | null>(null);

  return (
    <>
      <WorkIndex items={items} onOpen={setOpenItem} />
      <CaseModal item={openItem} onClose={() => setOpenItem(null)} />
    </>
  );
}
