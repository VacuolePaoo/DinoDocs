import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName } from './shared';
import { Brand } from '@/components/brand';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: <Brand title={appName} /> },
  };
}

export function homeOptions(): BaseLayoutProps {
  return {
    ...baseOptions(),
    links: [
      { text: '笔记', url: '/notes', active: 'nested-url' },
      { text: '产品文档', url: '/docs', active: 'nested-url' },
    ],
  };
}
