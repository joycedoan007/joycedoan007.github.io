import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    setLight(saved === 'light');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark');
    localStorage.setItem('theme', light ? 'light' : 'dark');
  }, [light]);

  return (
    <button
      onClick={() => setLight((v) => !v)}
      aria-label="Toggle theme"
      style={{
        width: 32,
        height: 32,
        borderRadius: 'var(--radius-md)',
        background: 'transparent',
        border: '1px solid var(--border-subtle)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <i className={light ? 'ph ph-sun' : 'ph ph-moon'} style={{ fontSize: 14 }} />
    </button>
  );
}
