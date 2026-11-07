import { useEffect, useState } from 'react';
import { vi } from './vi';

/** Current site language ('en' | 'vi'). Starts as 'en' so SSR and hydration match. */
export function useLang(): string {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    setLang(localStorage.getItem('lang') || 'en');
    const onChange = (e: Event) => setLang((e as CustomEvent<string>).detail);
    window.addEventListener('langchange', onChange);
    return () => window.removeEventListener('langchange', onChange);
  }, []);
  return lang;
}

/** `const t = useT(); t('English text')` returns the Vietnamese text when the language is vi. */
export function useT(): (en: string) => string {
  const lang = useLang();
  return (en) => (lang === 'vi' ? vi[en.replace(/\s+/g, ' ').trim()] ?? en : en);
}
