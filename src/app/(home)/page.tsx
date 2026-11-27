import HomeClient from '@/components/home-client';
import { noteCollections, notesSource, productCollections, productSources } from '@/lib/source';

export default function HomePage() {
  const productPages = Object.values(productSources).reduce(
    (sum, source) => sum + source.getPages().length,
    0,
  );
  const now = new Date();
  const builtAt = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${String(
    now.getHours(),
  ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return (
    <HomeClient
      stats={{
        products: productCollections.length,
        collections: noteCollections.length,
        pages: productPages + notesSource.getPages().length,
      }}
      builtAt={builtAt}
      copyrightYear={String(now.getFullYear())}
    />
  );
}
