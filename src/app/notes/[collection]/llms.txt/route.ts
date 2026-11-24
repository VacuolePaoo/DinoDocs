import { notesLlms, notesSource } from '@/lib/source';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/notes/[collection]/llms.txt'>) {
  const { collection } = await params;
  const root = notesSource.getPageTree().children.find(
    (node) => node.type === 'folder' && node.$ref?.folder === collection,
  );
  if (!root) return new Response(null, { status: 404 });
  return new Response(notesLlms.indexNode(root), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
