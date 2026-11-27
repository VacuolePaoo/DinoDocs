import { loadOgFonts } from '@/lib/og-fonts';

export interface OgImageProps {
  title: string;
  subtitle: string;
}

/** next/og 官方 Route Handler 示例样式。 */
export function OgImage({ title, subtitle }: OgImageProps) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '40px',
      }}
    >
      <div style={{ fontSize: 60, fontWeight: 'bold', color: 'black', textAlign: 'center', fontFamily: 'Noto Sans SC' }}>{title}</div>
      <div style={{ fontSize: 30, color: '#666', marginTop: '20px', fontFamily: 'Noto Sans SC' }}>{subtitle}</div>
    </div>
  );
}

export async function getOgImageOptions() {
  return {
    width: 1200,
    height: 630,
    fonts: await loadOgFonts(),
  };
}
