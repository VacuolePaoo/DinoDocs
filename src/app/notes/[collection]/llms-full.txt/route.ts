import { llms } from 'fumadocs-core/source';
import { notesLlms, notesSource } from '@/lib/source';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/notes/[collection]/llms-full.txt'>,
) {
  const { collection } = await params;
  if (!notesSource.getPages().some((page) => page.slugs[0] === collection)) {
    return new Response(null, { status: 404 });
  }
  const scoped = llms(notesSource, {
    filter: (page) => page.slugs[0] === collection,
    renderPage: (page) => notesLlms.page(page),
  });
  return new Response(await scoped.full(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
