import { llms, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { defineDocs } from 'fumadocs-mdx/macro';
import type { InferPageType } from 'fumadocs-core/source';

const notes = defineDocs({
  dir: 'content/notes',
  docs: {
    schema: pageSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

const moments = defineDocs({
  dir: 'content/docs/moments',
  docs: {
    schema: pageSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

const cupertino = defineDocs({
  dir: 'content/docs/cupertino',
  docs: {
    schema: pageSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

const bandmusic = defineDocs({
  dir: 'content/docs/bandmusic',
  docs: {
    schema: pageSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

export const notesSource = loader({
  baseUrl: '/notes',
  source: notes.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const momentsSource = loader({
  baseUrl: '/docs/moments',
  source: moments.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const cupertinoSource = loader({
  baseUrl: '/docs/cupertino',
  source: cupertino.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const bandmusicSource = loader({
  baseUrl: '/docs/bandmusic',
  source: bandmusic.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const productSources = {
  moments: momentsSource,
  cupertino: cupertinoSource,
  bandmusic: bandmusicSource,
};

export type ProductSlug = keyof typeof productSources;
export type NotesPage = InferPageType<typeof notesSource>;
export type ProductPage = InferPageType<(typeof productSources)[ProductSlug]>;

type MarkdownPage = {
  data: {
    getText: (type: 'processed') => Promise<string>;
  };
};

export const productCollections: {
  slug: ProductSlug;
  title: string;
  description: string;
  icon: 'Images' | 'PanelsTopLeft' | 'AudioLines';
}[] = [
  { slug: 'moments', title: 'Moments', description: 'Moments 产品使用说明与开发文档。', icon: 'Images' },
  { slug: 'cupertino', title: 'Astro Cupertino', description: 'Astro Cupertino 安装、配置与主题使用指南。', icon: 'PanelsTopLeft' },
  { slug: 'bandmusic', title: '震动音乐', description: '震动音乐产品使用说明与开发文档。', icon: 'AudioLines' },
];

export function isProductSlug(value: string): value is ProductSlug {
  return value in productSources;
}

function createLlms(source: typeof notesSource, title: string) {
  return llms(source, {
    renderName: (node) => String(node.name),
    renderDescription: (node) =>
      'description' in node && node.description
        ? String(node.description)
        : `${title}的独立文档索引。`,
    renderPage: async (page: NotesPage) => `# ${page.data.title} (${page.url})

${await (page as unknown as MarkdownPage).data.getText('processed')}`,
  });
}

export const notesLlms = createLlms(notesSource, '笔记');
export const productLlms = {
  moments: createLlms(momentsSource, 'Moments'),
  cupertino: createLlms(cupertinoSource, 'Astro Cupertino'),
  bandmusic: createLlms(bandmusicSource, '震动音乐'),
};
