import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
} from '@/layouts/spacious/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/components/mdx';
import { isProductSlug, productSources } from '@/lib/source';
import { getPageImageUrl } from '@/lib/shared';

export default async function Page(props: PageProps<'/docs/[product]/[[...slug]]'>) {
  const { product, slug } = await props.params;
  if (!isProductSlug(product)) notFound();
  const source = productSources[product];
  const page = source.getPage(slug);
  if (!page) notFound();
  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: 'block' }}
      tableOfContentPopover={{ style: 'block' }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={`${page.url}.md`} />
      </div>
      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return Object.entries(productSources).flatMap(([product, source]) =>
    source.generateParams().map(({ slug }) => ({ product, slug })),
  );
}

export async function generateMetadata(
  props: PageProps<'/docs/[product]/[[...slug]]'>,
): Promise<Metadata> {
  const { product, slug } = await props.params;
  if (!isProductSlug(product)) notFound();
  const page = productSources[product].getPage(slug);
  if (!page) notFound();
  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: { images: getPageImageUrl(page) },
  };
}
