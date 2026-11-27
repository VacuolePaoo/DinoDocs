import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { getOgImageOptions, OgImage } from '@/lib/og';
import { isProductSlug, productSources } from '@/lib/source';

export const revalidate = false;
export const dynamicParams = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/docs/[product]/[...slug]'>,
) {
  const { product, slug } = await params;
  if (!isProductSlug(product)) notFound();
  const source = productSources[product];
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    <OgImage
      title={page.data.title}
      subtitle={page.data.description ?? String(source.getPageTree().name)}
    />,
    await getOgImageOptions(),
  );
}

export function generateStaticParams() {
  return Object.entries(productSources).flatMap(([product, source]) =>
    source.getPages().map((page) => ({ product, slug: [...page.slugs, 'image.png'] })),
  );
}
