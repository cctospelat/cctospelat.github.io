import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/fotos/**/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
});

/**
 * Resolves a content image path (e.g. `/fotos/content/1_club/grupo2.webp`, as written
 * in Markdown frontmatter) to the optimizable asset in `src/assets/fotos/`.
 */
export function resolveImage(path: string): ImageMetadata {
  const image = images[`/src/assets${path}`];
  if (!image) {
    throw new Error(`Image not found: "${path}". Expected it at src/assets${path}`);
  }
  return image.default;
}
