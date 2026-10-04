import { getCollection, getEntry } from 'astro:content';
import { defaultLang, type Lang } from '../i18n/ui';
import { isLang } from '../i18n/utils';

/** Content of the home page for one language, sorted as it is displayed. */
export async function getSiteContent(lang: Lang = defaultLang) {
  const [club, colaboradores, fichas, rutas, noticias, calendario] = await Promise.all([
    getCollection('club', isLang(lang)),
    getEntry('colaboradores', `${lang}/2_colaboradores`),
    getCollection('fichas', isLang(lang)),
    getCollection('rutas', isLang(lang)),
    getCollection('noticias', isLang(lang)),
    getCollection('calendario', isLang(lang)),
  ]);

  const clubOrder = ['sobre-nosotros', 'compromiso', 'nuestra-piel'];
  return {
    club: club.sort((a, b) => clubOrder.indexOf(a.id.split('/').pop()!) - clubOrder.indexOf(b.id.split('/').pop()!)),
    colaboradores,
    fichas,
    rutas,
    noticias: noticias.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()),
    calendario: calendario.sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf()),
  };
}
