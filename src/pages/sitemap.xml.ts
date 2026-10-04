import type { APIRoute } from 'astro';
import { languages, type Lang } from '../i18n/ui';
import { getHomeUrl } from '../i18n/utils';

export const GET: APIRoute = ({ site }) => {
  const langs = Object.keys(languages) as Lang[];
  const url = (lang: Lang) => new URL(getHomeUrl(lang), site).href;
  const alternates = langs
    .map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url(lang)}"/>`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${url('es')}"/>`)
    .join('\n');
  const lastmod = new Date().toISOString().slice(0, 10);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${langs.map((lang) => `  <url>\n    <loc>${url(lang)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
