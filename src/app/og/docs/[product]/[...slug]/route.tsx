import { notFound } from 'next/navigation';
import { ImageResponse } from 'takumi-js/response';
import { getOgImageOptions, ProductOgImage } from '@/lib/og';
import { isProductSlug, productSources } from '@/lib/source';

export const revalidate = false;

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
    <ProductOgImage
      title={page.data.title}
      description={page.data.description}
      collection={String(source.getPageTree().name)}
    />,
    await getOgImageOptions(),
  );
}

export function generateStaticParams() {
  return Object.entries(productSources).flatMap(([product, source]) =>
    source.getPages().map((page) => ({ product, slug: [...page.slugs, 'image.webp'] })),
  );
}
