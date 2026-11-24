'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { RootProvider } from 'fumadocs-ui/provider/next';
import DefaultSearchDialog from 'fumadocs-ui/components/dialog/search-default';

const translations = {
  'Search(search trigger)': '搜索',
  'Search(search dialog)': '搜索文档',
  'Open Search(search trigger)(aria-label)': '打开搜索',
  'Close Search(search dialog)(aria-label)': '关闭搜索',
  'No results found(search dialog)': '未找到结果',
  'Copy Markdown(page actions)': '复制 Markdown',
  'Copied Markdown(page actions)': '已复制 Markdown',
  'On this page(table of contents)': '本页目录',
  'Previous Page(pagination)': '上一页',
  'Next Page(pagination)': '下一页',
  'Toggle Theme(theme switcher)(aria-label)': '切换主题',
  'Collapse Sidebar(sidebar)(aria-label)': '折叠侧栏',
  'Open Sidebar(sidebar)(aria-label)': '打开侧栏',
  'Close Sidebar(sidebar)(aria-label)': '关闭侧栏',
  'Skip to Content(skip link)': '跳转到正文',
  'Options(aria-label)': '选项',
  'Theme(site menu)': '主题',
  'Copy Anchor Link(heading anchor)(aria-label)': '复制标题链接',
  'Copied Anchor Link(heading anchor)(aria-label)': '已复制标题链接',
};

export function SearchProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const collection = segments[0] === 'notes' ? 'notes' : segments[0] === 'docs' ? segments[1] : '';
  const api = collection ? `/api/search?collection=${collection}` : '/api/search';

  return (
    <RootProvider
      i18n={{ locale: 'zh-CN', translations }}
      search={{ SearchDialog: DefaultSearchDialog, options: { api } }}
    >
      {children}
    </RootProvider>
  );
}
