import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const club = defineCollection({
  loader: glob({ pattern: "**/1_club/*.md", base: "src/content" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    image: z.string().optional(),
  }),
});

const entrenamiento = defineCollection({
  loader: glob({ pattern: "**/3_entrenamientos/*.md", base: "src/content" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const noticias = defineCollection({
  loader: glob({ pattern: "**/5_noticias/*.md", base: "src/content" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string(),
    image: z.string().optional(),
  }),
});

const calendario = defineCollection({
  loader: glob({ pattern: "**/6_eventos/*.md", base: "src/content" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    location: z.string(),
    distance: z.string(),
    url: z.string().url().optional(),
  }),
});

const contacto = defineCollection({
  loader: glob({ pattern: "**/7_contacto/*.md", base: "src/content" }),
  schema: z.object({
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    instagram: z.string().url().optional(),
    facebook: z.string().url().optional(),
  }),
});

const colaboradores = defineCollection({
  loader: glob({ pattern: "**/2_colaboradores/*.md", base: "src/content" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    sponsors: z.array(z.object({ name: z.string(), logo: z.string() })),
  }),
});

const rutas = defineCollection({
  loader: glob({ pattern: "**/4_rutas/*.md", base: "src/content" }),
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
    imagen: z.string().optional(),
    wikiloc_url: z.string().url().optional(),
  }),
});

const fichas = defineCollection({
  loader: glob({ pattern: "**/3_entrenamientos/fichas/*.md", base: "src/content" }),
  schema: z.object({
    nombre: z.string(),
    ejecucion: z.array(z.string()),
    evitar: z.array(z.string()),
    consejos: z.array(z.string()),
    imagen: z.string().optional(),
  }),
});

export const collections = { club, entrenamiento, noticias, calendario, contacto, colaboradores, rutas, fichas };
