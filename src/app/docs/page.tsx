import Link from 'next/link';
import { AudioLines, ArrowUpRight, Images, PanelsTopLeft } from 'lucide-react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { homeOptions } from '@/lib/layout.shared';
import { productCollections } from '@/lib/source';

const icons = { Images, PanelsTopLeft, AudioLines };

export default function DocsIndexPage() {
  return (
    <HomeLayout {...homeOptions()}>
      <main className="flex flex-1 justify-center px-6 py-16 md:py-24">
        <div className="w-full max-w-5xl">
          <p className="text-sm font-medium text-fd-primary mb-3">产品文档</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">选择你要查看的文档</h1>
          <p className="text-fd-muted-foreground mt-4">每套产品文档拥有独立的目录、搜索和 LLMS 内容。</p>
          <div className="grid gap-5 mt-10 md:grid-cols-3">
            {productCollections.map(({ slug, title, description, icon }) => {
              const Icon = icons[icon];
              return (
                <Link
                  key={slug}
                  href={`/docs/${slug}`}
                  className="group rounded-2xl border bg-fd-card p-6 transition-colors hover:border-fd-primary/50 hover:bg-fd-accent/40"
                >
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-fd-primary/10 p-3 text-fd-primary"><Icon className="size-6" /></div>
                    <ArrowUpRight className="size-5 text-fd-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <h2 className="text-xl font-semibold mt-8">{title}</h2>
                  <p className="text-sm text-fd-muted-foreground mt-2 leading-6">{description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </HomeLayout>
  );
}
