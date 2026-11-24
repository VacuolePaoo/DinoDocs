import { isProductSlug, notesLlms, notesSource, productLlms, productSources } from '@/lib/source';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/llms.mdx/[...path]'>) {
  const { path } = await params;
  const [system, collection, ...slug] = path.map((segment) => decodeURIComponent(segment));

  if (system === 'notes') {
    const page = notesSource.getPage(slug);
    if (!page) return new Response(null, { status: 404 });
    return new Response(await notesLlms.page(page), {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  if (system === 'docs' && collection && isProductSlug(collection)) {
    const page = productSources[collection].getPage(slug.length > 0 ? slug : undefined);
    if (!page) return new Response(null, { status: 404 });
    return new Response(await productLlms[collection].page(page), {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return new Response(null, { status: 404 });
}

export async function generateStaticParams() {
  const params = notesSource.getPages().map((page) => ({
    path: ['notes', ...page.slugs],
  }));
  for (const [product, source] of Object.entries(productSources)) {
    params.push(
      ...source.getPages().map((page) => ({ path: ['docs', product, ...page.slugs] })),
    );
  }
  return params;
}
