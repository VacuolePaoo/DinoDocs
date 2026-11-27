import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { getOgImageOptions, OgImage } from '@/lib/og';
import { notesSource } from '@/lib/source';

export const revalidate = false;
export const dynamicParams = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/notes/[...slug]'>) {
  const { slug } = await params;
  const page = notesSource.getPage(slug.slice(0, -1));
  if (!page) notFound();
  const collection = notesSource.getPageTree().children.find(
    (node) => node.type === 'folder' && node.$ref?.folder === page.slugs[0],
  );
  const collectionName = collection?.type === 'folder' ? String(collection.name) : '知识库';

  return new ImageResponse(
    <OgImage title={page.data.title} subtitle={page.data.description ?? collectionName} />,
    await getOgImageOptions(),
  );
}

export function generateStaticParams() {
  return notesSource.getPages().map((page) => ({ slug: [...page.slugs, 'image.png'] }));
}
