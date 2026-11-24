import { notFound } from 'next/navigation';
import { DocsLayout } from '@/layouts/spacious';
import { isProductSlug, productSources } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { Brand } from '@/components/brand';

export default async function Layout(props: LayoutProps<'/docs/[product]'>) {
  const { product } = await props.params;
  if (!isProductSlug(product)) notFound();
  const title = productSources[product].getPageTree().name;

  return (
    <DocsLayout
      {...baseOptions()}
      nav={{ title: <Brand title={String(title)} />, url: `/docs/${product}` }}
      tree={productSources[product].getPageTree()}
      tabs={false}
    >
      {props.children}
    </DocsLayout>
  );
}

export function generateStaticParams() {
  return Object.keys(productSources).map((product) => ({ product }));
}
