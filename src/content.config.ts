import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Entries live in `src/content/<lang>/<folder>/<slug>.md`; ids keep the `<lang>/` prefix. */
const loadFrom = (folder: string) => glob({ pattern: `*/${folder}/*.md`, base: 'src/content' });

/** Path of an image under `src/assets`, e.g. `/fotos/content/1_club/grupo2.webp`. */
const imagePath = z.string().startsWith('/fotos/');

const club = defineCollection({
  loader: loadFrom('1_club'),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    image: imagePath.optional(),
  }),
});

const colaboradores = defineCollection({
  loader: loadFrom('2_colaboradores'),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    sponsors: z.array(z.object({ name: z.string(), logo: imagePath })),
  }),
});

// Not rendered yet: the section only shows `fichas` and `rutas`.
const entrenamiento = defineCollection({
  loader: loadFrom('3_entrenamientos'),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const fichas = defineCollection({
  loader: loadFrom('3_entrenamientos/fichas'),
  schema: z.object({
    nombre: z.string(),
    ejecucion: z.array(z.string()),
    evitar: z.array(z.string()),
    consejos: z.array(z.string()),
    imagen: imagePath.optional(),
  }),
});

const rutas = defineCollection({
  loader: loadFrom('4_rutas'),
  schema: z.object({
    nombre: z.string(),
    distancia: z.string(),
    dificultad: z.string(),
    desnivel_positivo: z.number(),
    desnivel_negativo: z.number(),
    altitud_maxima: z.number(),
    altitud_minima: z.number(),
    trailrank: z.number().optional(),
    tipo_ruta: z.string(),
    puntos_interes: z.array(z.string()).optional(),
    imagen: imagePath.optional(),
    wikiloc_url: z.url().optional(),
  }),
});

const noticias = defineCollection({
  loader: loadFrom('5_noticias'),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string(),
    image: imagePath.optional(),
  }),
});

const calendario = defineCollection({
  loader: loadFrom('6_eventos'),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    location: z.string(),
    distance: z.string(),
    url: z.url().optional(),
  }),
});

export const collections = { club, colaboradores, entrenamiento, fichas, rutas, noticias, calendario };
