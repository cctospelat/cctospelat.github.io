import type { APIRoute } from 'astro';
import { CLUB, JOIN_FORM_URL, SOCIAL_LINKS } from '../data/site';
import { getSiteContent } from '../utils/site-content';

const date = (d: Date) => d.toISOString().slice(0, 10);
const list = (items: readonly string[]) => items.map((i) => `- ${i}`).join('\n');

// Every piece of content on the (Spanish) home page as Markdown, for AI agents.
export const GET: APIRoute = async () => {
  const { club, colaboradores, fichas, rutas, noticias, calendario } = await getSiteContent();

  const sections = [
    `# ${CLUB.name}\n\nClub de running de ${CLUB.locality} (${CLUB.region}, España), fundado en ${CLUB.foundingDate}.\n\n- Contacto: ${CLUB.email}\n- Hacerse socio: ${JOIN_FORM_URL}\n${list(SOCIAL_LINKS.map(({ name, url }) => `${name}: ${url}`))}`,

    `## Club\n\n${club.map((e) => `### ${e.data.title}\n\n${e.body?.trim()}`).join('\n\n')}`,

    colaboradores && `## ${colaboradores.data.title}\n\n${colaboradores.body?.trim()}`,

    `## Fichas de entrenamiento\n\n${fichas
      .map((e) => `### ${e.data.nombre}\n\nEjecución:\n${list(e.data.ejecucion)}\n\nA evitar:\n${list(e.data.evitar)}\n\nConsejos:\n${list(e.data.consejos)}`)
      .join('\n\n')}`,

    `## Rutas\n\n${rutas
      .map((e) => {
        const r = e.data;
        const facts = [
          `Distancia: ${r.distancia}`,
          `Tipo: ${r.tipo_ruta}`,
          `Dificultad: ${r.dificultad}`,
          `Desnivel: +${r.desnivel_positivo} m / -${r.desnivel_negativo} m`,
          `Altitud: ${r.altitud_minima}–${r.altitud_maxima} m`,
          ...(r.puntos_interes?.length ? [`Puntos de interés: ${r.puntos_interes.join('; ')}`] : []),
          ...(r.wikiloc_url ? [`Wikiloc: ${r.wikiloc_url}`] : []),
        ];
        return `### ${r.nombre}\n\n${list(facts)}\n\n${e.body?.trim() ?? ''}`.trim();
      })
      .join('\n\n')}`,

    `## Noticias\n\n${noticias.map((e) => `### ${e.data.title} (${date(e.data.date)})\n\n${e.data.summary}\n\n${e.body?.trim() ?? ''}`.trim()).join('\n\n')}`,

    `## Próximas carreras\n\n${calendario
      .map((e) => `### ${e.data.title}\n\n${list([`Fecha: ${date(e.data.date)}`, `Lugar: ${e.data.location}`, `Distancia: ${e.data.distance}`, ...(e.data.url ? [`Más información: ${e.data.url}`] : [])])}\n\n${e.body?.trim() ?? ''}`.trim())
      .join('\n\n')}`,
  ];

  return new Response(sections.filter(Boolean).join('\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
