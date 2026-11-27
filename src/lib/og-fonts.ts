import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
}

// 缓存目录位于版本控制之外;全新环境(如 Vercel)构建时重新从 Google Fonts 下载。
const CACHE_DIR = path.join(process.cwd(), 'node_modules', '.cache', 'og-fonts');
const CSS_URL = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap';

const FONT_ENTRIES = [
  { weight: 400, file: 'NotoSansSC-Regular.ttf' },
  { weight: 700, file: 'NotoSansSC-Bold.ttf' },
] as const;

// Google 对现代浏览器返回按 unicode-range 切片的 woff2;不带 UA 的请求才返回完整字符集 TTF。
function parseTtfUrls(css: string): Map<number, string> {
  const urls = new Map<number, string>();
  for (const block of css.split('@font-face').slice(1)) {
    const weight = Number(/font-weight:\s*(\d+)/.exec(block)?.[1]);
    const url = /url\((https:[^)]+?\.ttf)\)/.exec(block)?.[1];
    if (weight && url && !urls.has(weight)) urls.set(weight, url);
  }
  return urls;
}

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

async function downloadOgFonts(): Promise<OgFont[]> {
  try {
    const css = await (await fetch(CSS_URL)).text();
    const urls = parseTtfUrls(css);
    return await Promise.all(
      FONT_ENTRIES.map(async (entry) => {
        const url = urls.get(entry.weight);
        if (!url) {
          throw new Error(`Google Fonts CSS 未返回 weight ${entry.weight} 的 TTF 地址`);
        }
        const data = await (await fetch(url)).arrayBuffer();
        await mkdir(CACHE_DIR, { recursive: true });
        await writeFile(path.join(CACHE_DIR, entry.file), new Uint8Array(data));
        return { name: 'Noto Sans SC', data, weight: entry.weight };
      }),
    );
  } catch (error) {
    throw new Error('OG 字体下载失败:构建环境需要能访问 fonts.googleapis.com 与 fonts.gstatic.com', { cause: error });
  }
}

async function loadOgFontsUncached(): Promise<OgFont[]> {
  try {
    return await Promise.all(
      FONT_ENTRIES.map(async (entry) => ({
        name: 'Noto Sans SC',
        data: toArrayBuffer(await readFile(path.join(CACHE_DIR, entry.file))),
        weight: entry.weight,
      })),
    );
  } catch {
    return downloadOgFonts();
  }
}

let fontsPromise: Promise<OgFont[]> | undefined;

/** 返回常规/粗体两档 Noto Sans SC(satori 仅支持 ttf/otf/woff);缓存命中时不再发起网络请求。 */
export function loadOgFonts(): Promise<OgFont[]> {
  fontsPromise ??= loadOgFontsUncached();
  return fontsPromise;
}
