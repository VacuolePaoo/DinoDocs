import Link from 'next/link';
import { House } from 'lucide-react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { DocCard } from '@/components/doc-card';
import { homeOptions } from '@/lib/layout.shared';
import { noteCollections, productCollections } from '@/lib/source';

const docSections = [
  {
    heading: '产品文档',
    icon: 'file',
    items: productCollections.map(({ slug, title }) => ({ slug, href: `/docs/${slug}`, title })),
  },
  {
    heading: '笔记',
    icon: 'notebook',
    items: noteCollections.map(({ slug, title }) => ({ slug, href: `/notes/${slug}`, title })),
  },
] as const;

export default function DocsIndexPage() {
  return (
    <HomeLayout {...homeOptions()}>
      <main className="flex flex-1 justify-center px-6 py-16 md:py-24">
        <div className="w-full max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">选择要进入的文档集</h1>
            <Link
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-xl border bg-fd-secondary/50 px-4 text-sm font-medium text-fd-secondary-foreground transition-colors hover:border-fd-primary/50 hover:bg-fd-primary/10 hover:text-fd-primary"
            >
              <House className="size-4 shrink-0" />
              返回首页
            </Link>
          </div>

          {docSections.map(section => (
            <section key={section.heading} className="mt-12">
              <h2 className="text-lg font-semibold">{section.heading}</h2>
              <div
                className={
                  section.items.length > 2 ? 'grid gap-5 mt-5 md:grid-cols-3' : 'grid gap-5 mt-5 md:grid-cols-2'
                }
              >
                {section.items.map(({ href, title, slug }) => (
                  <DocCard key={href} href={href} title={title} icon={section.icon} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </HomeLayout>
  );
}
