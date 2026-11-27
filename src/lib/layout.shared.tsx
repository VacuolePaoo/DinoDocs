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
  };
}
