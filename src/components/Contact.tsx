import { useState } from 'react';
import { useT } from '../i18n/react';

interface Social {
  label: string;
  icon: string;
  href: string;
}

interface Props {
  email: string;
  socials: Social[];
}

export default function Contact({ email, socials }: Props) {
  const [copied, setCopied] = useState(false);
  const t = useT();

  function handleCopy() {
    try {
      navigator.clipboard?.writeText(email);
    } catch (_) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section
      id="contact"
      style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '120px 48px' }}>
        <div className="overline" style={{ marginBottom: 32 }}>
          {t('Get in touch')}
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-end' }}
        >
          <div data-reveal>
            <h2
              style={{
                font: "500 clamp(30px, 3.4vw, 44px)/1.1 'Poppins', sans-serif",
                letterSpacing: '-0.04em',
                color: 'var(--text-bright)',
                margin: 0,
                textWrap: 'balance',
              }}
            >
              {t("Looking for a designer to join your team? Let's talk.")}
            </h2>
          </div>
          <div data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
            <p
              style={{
                font: "400 16px/26px 'Poppins', sans-serif",
                color: 'var(--text-primary)',
                margin: '0 0 32px',
              }}
            >
              {t(
                "I'm looking for a UI/UX role on a team building complex, data-heavy products. Send me a few lines about your team and the role."
              )}
            </p>

            {/* Copy email */}
            <button
              onClick={handleCopy}
              data-cursor="hover"
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'var(--bg-page)',
                border: '1px solid var(--border-subtle)',
                padding: '20px 24px',
                borderRadius: 'var(--radius-card)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'inherit',
                marginBottom: 24,
              }}
            >
              <div>
                <div className="overline" style={{ marginBottom: 4 }}>
                  {t('Email · click to copy')}
                </div>
                <div
                  style={{
                    font: "500 18px/24px 'Poppins', sans-serif",
                    color: 'var(--text-bright)',
                  }}
                >
                  {email}
                </div>
              </div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  color: copied ? 'var(--text-accent)' : 'var(--text-primary)',
                  font: "600 14px/20px 'Poppins', sans-serif",
                  transition: 'color 200ms ease',
                }}
              >
                <i
                  className={copied ? 'ph-bold ph-check' : 'ph ph-copy'}
                  style={{ fontSize: 16 }}
                />
                {copied ? t('Copied') : t('Copy')}
              </span>
            </button>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  data-cursor="hover"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    font: "500 14px/20px 'Poppins', sans-serif",
                    background: 'var(--bg-page)',
                  }}
                >
                  <i className={`ph ph-${s.icon}`} style={{ fontSize: 16 }} />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
