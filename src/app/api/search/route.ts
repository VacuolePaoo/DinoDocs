import { createFromSource } from 'fumadocs-core/search/server';
import { isProductSlug, notesSource, productSources } from '@/lib/source';

const notesSearch = createFromSource(notesSource);
const productSearch = Object.fromEntries(
  Object.entries(productSources).map(([slug, source]) => [slug, createFromSource(source)]),
) as Record<keyof typeof productSources, ReturnType<typeof createFromSource>>;

export async function GET(request: Request) {
  const collection = new URL(request.url).searchParams.get('collection');
  if (collection === 'notes') return notesSearch.GET(request);
  if (collection && isProductSlug(collection)) return productSearch[collection].GET(request);
  return Response.json({ error: '请指定有效的文档集。' }, { status: 400 });
}
