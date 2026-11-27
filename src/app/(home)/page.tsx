import HomeClient from '@/components/home-client';
import { noteCollections, notesSource, productCollections, productSources } from '@/lib/source';

export default function HomePage() {
  const productPages = Object.values(productSources).reduce(
    (sum, source) => sum + source.getPages().length,
    0,
  );
  const now = new Date();
  // 构建时间固定按 UTC+8 展示,不受构建机时区(如 Vercel 的 UTC)影响
  const cstFormat = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  const builtAt = cstFormat.format(now);
  const copyrightYear = cstFormat.formatToParts(now).find((part) => part.type === 'year')!.value;

  return (
    <HomeClient
      stats={{
        products: productCollections.length,
        collections: noteCollections.length,
        pages: productPages + notesSource.getPages().length,
      }}
      builtAt={builtAt}
      copyrightYear={copyrightYear}
    />
  );
}
