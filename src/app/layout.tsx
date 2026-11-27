import { SearchProvider } from '@/components/search-provider';
import './global.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'DinoDocs', template: '%s | DinoDocs' },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <SearchProvider>{children}</SearchProvider>
      </body>
    </html>
  );
}
