import type { APIRoute } from 'astro';
import { CLUB, JOIN_FORM_URL, SOCIAL_LINKS } from '../data/site';
import { languages, type Lang } from '../i18n/ui';
import { getHomeUrl } from '../i18n/utils';
import { getSiteContent } from '../utils/site-content';

const date = (d: Date) => d.toISOString().slice(0, 10);

// Summary of the site for AI agents (https://llmstxt.org). Full text lives in /llms-full.txt.
export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const { club, noticias, calendario, rutas, fichas } = await getSiteContent();
  const about = club[0];

  const text = `# ${CLUB.name}

> Club de running de ${CLUB.locality} (${CLUB.region}, España), fundado en ${CLUB.foundingDate}. ${about?.data.subtitle ?? ''} Colores del club: rojo, blanco y negro.

La web es una única página por idioma con estas secciones: club, colaboradores, entrenamiento (fichas de ejercicios y rutas), noticias y calendario de carreras.

- Contacto: ${CLUB.email}
- Hacerse socio: ${JOIN_FORM_URL}
${SOCIAL_LINKS.map(({ name, url }) => `- ${name}: ${url}`).join('\n')}

## Idiomas

${(Object.entries(languages) as [Lang, (typeof languages)[Lang]][]).map(([lang, { name }]) => `- [${name}](${abs(getHomeUrl(lang))})`).join('\n')}

## Contenido completo

- [Todo el contenido en texto plano](${abs('llms-full.txt')}): club, rutas, fichas de entrenamiento, noticias y carreras

## Club

${club.map((e) => `- [${e.data.title}](${abs('/#club')}): ${e.data.subtitle}`).join('\n')}

## Próximas carreras

${calendario.map((e) => `- [${e.data.title}](${abs('/#calendario')}): ${date(e.data.date)}, ${e.data.location}, ${e.data.distance}`).join('\n')}

## Noticias

${noticias.map((e) => `- [${e.data.title}](${abs('/#noticias')}) (${date(e.data.date)}): ${e.data.summary}`).join('\n')}

## Optional

${rutas.map((e) => `- [Ruta ${e.data.nombre}](${abs('/#entrenamiento')}): ${e.data.distancia}, ${e.data.tipo_ruta.toLowerCase()}, dificultad ${e.data.dificultad.toLowerCase()}, +${e.data.desnivel_positivo} m`).join('\n')}
${fichas.map((e) => `- [Ficha: ${e.data.nombre}](${abs('/#entrenamiento')})`).join('\n')}
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
