# Web C.C. Tospelat — Guía de contenido

Esta guía explica cómo está organizada la web y cómo añadir o editar contenido sin necesidad de conocimientos técnicos.

---

## Cómo está organizada la web

La web tiene **7 secciones** que aparecen en este orden en la página:

| # | Sección | Qué muestra |
|---|---|---|
| 1 | **Club** | Presentación del club, compromiso y equipaciones |
| 2 | **Colaboradores** | Logos y texto de agradecimiento a los patrocinadores |
| 3 | **Entrenamiento** | Horarios e información de entrenamientos |
| 4 | **Rutas** | Fichas de rutas de entrenamiento |
| 5 | **Noticias** | Últimas noticias del club |
| 6 | **Eventos** | Próximas carreras y eventos |
| 7 | **Contacto** | Datos de contacto y formulario |

La web está disponible en **4 idiomas**: español (`es`), valenciano (`ca`), inglés (`en`) y francés (`fr`).

---

## Dónde está el contenido

Todo el contenido editable se encuentra en la carpeta `src/content/`, organizada primero por idioma y después por sección:

```
src/content/
  es/                        ← Contenido en español (idioma de referencia)
    1_club/                  ← Textos de presentación del club
      sobre-nosotros.md
      compromiso.md
      colores.md
    2_colaboradores/         ← Lista de sponsors y texto de agradecimiento
      index.md
    3_entrenamientos/        ← Texto de la sección entrenamiento
      index.md
    4_rutas/                 ← Fichas de rutas de entrenamiento
      9K_1.md
      9K_2.md
      ...
    5_noticias/              ← Artículos de noticias
      post-1.md
      post-2.md
      ...
    6_eventos/               ← Eventos y carreras
      race-1.md
      ...
    7_contacto/              ← Datos de contacto
      index.md
  ca/                        ← Mismo contenido en valenciano
  en/                        ← Mismo contenido en inglés
  fr/                        ← Mismo contenido en francés
```

> **Regla importante:** cuando añadas o edites contenido, hazlo en los 4 idiomas para que la web sea consistente. El español es el idioma de referencia.

---

## Dónde poner las imágenes

Las imágenes se colocan dentro de `public/fotos/content/`, en la subcarpeta de su sección:

```
public/fotos/content/
  1_club/          ← Fotos del club y equipaciones
  2_colaboradores/
    sponsors/      ← Logos SVG de los patrocinadores
  3_entrenamientos/
  4_rutas/         ← Mapas e imágenes de las rutas
  5_noticias/      ← Fotos de las noticias
  6_eventos/
  7_contacto/
```

En el fichero `.md`, la ruta siempre empieza por `/website/fotos/content/`. Por ejemplo, una imagen guardada en `public/fotos/content/5_noticias/foto.jpg` se referencia como:

```
image: "/website/fotos/content/5_noticias/foto.jpg"
```

---

## Cómo añadir una noticia

1. Crea un fichero `.md` en `src/content/es/5_noticias/` (y en los otros 3 idiomas).
2. Usa este formato:

```markdown
---
title: "Título de la noticia"
date: 2026-06-01
summary: "Resumen breve que aparece en la tarjeta de noticias."
image: "/website/fotos/content/5_noticias/nombre-imagen.jpg"
---

Aquí el texto completo de la noticia, en formato libre.
```

- `title` — Título que se muestra en la tarjeta.
- `date` — Fecha en formato `AAAA-MM-DD`.
- `summary` — Frase corta que aparece bajo el título en la lista de noticias.
- `image` — Ruta a una imagen (opcional). Las imágenes van en `public/fotos/content/5_noticias/`.

---

## Cómo añadir un evento al calendario

1. Crea un fichero `.md` en `src/content/es/6_eventos/` (y en los otros 3 idiomas).
2. Usa este formato:

```markdown
---
title: "Nombre de la carrera"
date: 2026-09-20T10:00:00.000Z
location: "Lugar de celebración"
distance: "10km"
url: "https://enlace-inscripcion.com"
---
```

- `title` — Nombre del evento.
- `date` — Fecha y hora (formato ISO: `AAAA-MM-DDTHH:MM:00.000Z`).
- `location` — Municipio o instalación.
- `distance` — Distancia de la prueba.
- `url` — Enlace a la inscripción (opcional).

---

## Cómo añadir una ruta de entrenamiento

1. Crea un fichero `.md` en `src/content/es/4_rutas/` (y en los otros 3 idiomas).
2. Usa este formato:

```markdown
---
nombre: "Nombre de la ruta"
distancia: "12.5 km"
dificultad: "Media"
desnivel_positivo: 340
desnivel_negativo: 340
altitud_maxima: 412
altitud_minima: 68
trailrank: 76
tipo_ruta: "Circular"
puntos_interes:
  - "Punto de interés 1"
  - "Punto de interés 2"
imagen: "/website/fotos/content/4_rutas/nombre-imagen.jpg"
wikiloc_url: "https://es.wikiloc.com/rutas-running/..."
---

Descripción opcional de la ruta.
```

- `dificultad` — Usa: `Baja`, `Media`, `Alta` o `Muy alta`.
- `desnivel_positivo` / `desnivel_negativo` — Metros (solo el número, sin "m").
- `altitud_maxima` / `altitud_minima` — Metros sobre el nivel del mar.
- `trailrank` — Puntuación de Wikiloc entre 0 y 100 (opcional).
- `imagen` — Imagen del mapa o la ruta (opcional). Las imágenes van en `public/fotos/content/4_rutas/`.
- `wikiloc_url` — Enlace a la ruta en Wikiloc (opcional).

---

## Cómo editar los textos fijos del club

Los textos de la sección **Club** se encuentran en:

```
src/content/es/1_club/sobre-nosotros.md
src/content/es/1_club/compromiso.md
src/content/es/1_club/colores.md
```

Son ficheros de texto libre en formato Markdown. Puedes editar el contenido debajo de las líneas `---`.

---

## Cómo editar los colaboradores

La lista de sponsors y el texto de agradecimiento están en:

```
src/content/es/2_colaboradores/index.md
```

El frontmatter contiene la lista `sponsors` (nombre y ruta al logo SVG). Los logos van en `public/fotos/content/2_colaboradores/sponsors/`. El cuerpo del fichero es el texto de agradecimiento en formato Markdown.

---

## Resumen rápido

| Quiero... | Fichero a crear/editar |
|---|---|
| Añadir una noticia | `src/content/es/5_noticias/nombre.md` |
| Añadir una carrera | `src/content/es/6_eventos/nombre.md` |
| Añadir una ruta | `src/content/es/4_rutas/nombre.md` |
| Editar "Sobre Nosotros" | `src/content/es/1_club/sobre-nosotros.md` |
| Editar el entrenamiento | `src/content/es/3_entrenamientos/index.md` |
| Editar colaboradores | `src/content/es/2_colaboradores/index.md` |
| Editar contacto | `src/content/es/7_contacto/index.md` |

Recuerda repetir el mismo fichero en `ca/`, `en/` y `fr/` para que todos los idiomas estén actualizados.
