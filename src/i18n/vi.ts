// English -> Vietnamese. Keys are the exact English text of any element marked
// with `data-i18n` (whitespace collapsed). English is read from the DOM itself.
import { home } from './vi/home';
import { about } from './vi/about';
import { ventures } from './vi/ventures';
import { work } from './vi/work';
import { writing } from './vi/writing';
import { contact } from './vi/contact';

export const vi: Record<string, string> = { ...home, ...about, ...ventures, ...work, ...writing, ...contact };
