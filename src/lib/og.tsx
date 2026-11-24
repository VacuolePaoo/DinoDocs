import { readFile } from 'node:fs/promises';
import type { ImageResponseOptions } from 'takumi-js/response';

export interface OgImageProps {
  title: string;
  description?: string;
  collection: string;
}

const regularFont = readFile(
  /* turbopackIgnore: true */
  process.env.OG_FONT_PATH ?? `${process.env.WINDIR ?? 'C:/Windows'}/Fonts/msyh.ttc`,
).then((data) => ({
  name: 'Noto Sans SC',
  data,
  weight: 400,
}));
const boldFont = readFile(
  /* turbopackIgnore: true */
  process.env.OG_FONT_BOLD_PATH ?? process.env.OG_FONT_PATH ?? `${process.env.WINDIR ?? 'C:/Windows'}/Fonts/msyhbd.ttc`,
).then((data) => ({
  name: 'Noto Sans SC',
  data,
  weight: 700,
}));

export async function getOgImageOptions(): Promise<ImageResponseOptions> {
  return {
    width: 1200,
    height: 630,
    format: 'webp',
    fonts: await Promise.all([regularFont, boldFont]),
  };
}

export function NotesOgImage({ title, description, collection }: OgImageProps) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#f3f0e8', color: '#292827', fontFamily: 'Noto Sans SC', padding: 40 }}>
      <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#fffefa', border: '1px solid #ded9cb', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: 18, backgroundColor: '#c87548' }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '48px 64px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 25, fontWeight: 700 }}>
              <div style={{ display: 'flex', width: 36, height: 36, backgroundColor: '#c87548', borderRadius: 8, color: '#fffefa', alignItems: 'center', justifyContent: 'center', fontSize: 23 }}>D</div>
              DinoDocs 笔记
            </div>
            <div style={{ display: 'flex', fontSize: 19, color: '#7c766b' }}>NOTES / {collection}</div>
          </div>
          <div style={{ display: 'flex', width: 90, height: 3, backgroundColor: '#c87548', marginTop: 72 }} />
          <div style={{ display: 'flex', marginTop: 30, fontSize: title.length > 18 ? 58 : 72, lineHeight: 1.25, fontWeight: 700, maxWidth: 850 }}>{title}</div>
          <div style={{ display: 'flex', fontSize: 28, color: '#7c766b', lineHeight: 1.6, marginTop: 22, maxWidth: 800 }}>{description}</div>
          <div style={{ display: 'flex', marginTop: 'auto', alignItems: 'center', gap: 12, fontSize: 21, color: '#7c766b' }}>
            <div style={{ display: 'flex', width: 8, height: 8, backgroundColor: '#c87548', borderRadius: 4 }} />
            记录、整理与持续生长
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: 170, borderLeft: '1px solid #ded9cb', paddingTop: 72, gap: 26 }}>
          {[0, 1, 2, 3, 4, 5].map((line) => <div key={line} style={{ display: 'flex', height: 1, backgroundColor: '#ded9cb', marginLeft: 26 }} />)}
        </div>
      </div>
    </div>
  );
}

export function ProductOgImage({ title, description, collection }: OgImageProps) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#101417', color: '#f2f5f4', fontFamily: 'Noto Sans SC', padding: 48 }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', border: '1px solid #3c4a4b', borderRadius: 20, padding: '42px 54px', backgroundColor: '#172023' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, fontWeight: 700 }}>
            <div style={{ display: 'flex', width: 36, height: 36, borderRadius: 10, backgroundColor: '#9ed6bd', color: '#172023', alignItems: 'center', justifyContent: 'center', fontSize: 23 }}>D</div>
            DinoDocs
          </div>
          <div style={{ display: 'flex', fontSize: 17, color: '#9ed6bd', border: '1px solid #466758', borderRadius: 6, padding: '8px 14px' }}>PRODUCT DOCUMENTATION</div>
        </div>
        <div style={{ display: 'flex', marginTop: 68, fontSize: 24, color: '#9ed6bd' }}>{collection}</div>
        <div style={{ display: 'flex', marginTop: 18, fontSize: title.length > 18 ? 58 : 72, fontWeight: 700, lineHeight: 1.25, maxWidth: 920 }}>{title}</div>
        <div style={{ display: 'flex', marginTop: 20, fontSize: 27, lineHeight: 1.55, color: '#a4b4b4', maxWidth: 800 }}>{description}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 24, borderTop: '1px solid #3c4a4b', color: '#a4b4b4', fontSize: 20 }}>
          <div style={{ display: 'flex' }}>清晰、可靠的产品使用指南</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ display: 'flex', width: 9, height: 9, borderRadius: 5, backgroundColor: '#9ed6bd' }} />
            DOCUMENTATION
          </div>
        </div>
      </div>
    </div>
  );
}
