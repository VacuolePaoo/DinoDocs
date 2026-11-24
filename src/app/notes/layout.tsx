import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { getLayoutTabs } from 'fumadocs-ui/layouts/shared';
import { notesSource } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { appName } from '@/lib/shared';
import { Brand } from '@/components/brand';
import { HomeButton } from '@/components/home-button';

export default function Layout({ children }: LayoutProps<'/notes'>) {
  const { nav, ...options } = baseOptions();
  const tree = notesSource.getPageTree();

  return (
    <DocsLayout
      {...options}
      nav={{ ...nav, title: <Brand title={`${appName} · 笔记`} />, url: '/notes' }}
      tree={tree}
      tabs={getLayoutTabs(tree)}
      tabMode="navbar"
      sidebar={{ banner: <HomeButton /> }}
    >
      {children}
    </DocsLayout>
  );
}
