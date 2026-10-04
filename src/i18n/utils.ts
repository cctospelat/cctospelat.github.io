import { ui, defaultLang, languages, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  return lang in ui ? (lang as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/** Root URL of the home page for a language (`/` for the default one). */
export function getHomeUrl(lang: Lang) {
  return lang === defaultLang ? '/' : `/${lang}/`;
}

/** Content entry ids look like `<lang>/<section>/<slug>`. */
export function isLang(lang: Lang) {
  return ({ id }: { id: string }) => id.startsWith(`${lang}/`);
}

export function formatDate(lang: Lang, date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(languages[lang].locale, options).format(date);
}
