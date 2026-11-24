export const appName = 'DinoDocs';
export const docsRoute = '/docs';
export const notesRoute = '/notes';

export function getPageImageUrl(page: { url: string }) {
  return `/og${page.url}/image.webp`;
}
