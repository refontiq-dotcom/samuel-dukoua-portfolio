import { ImageResponse } from 'next/og';

export const alt = 'Dukoua Nguessan Samuel Junior — Full-Stack Developer, SaaS Builder';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '66px 76px',
          background: '#f8f9fb',
          color: '#17191f',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 25, fontWeight: 700 }}>
          <span style={{ color: '#e52336', fontSize: 46 }}>S.</span>
          <span>REFONTIQ · PRODUCT ENGINEERING</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 17 }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 66, lineHeight: 1.06, fontWeight: 700, letterSpacing: -2 }}>
            <span>Dukoua Nguessan</span>
            <span>Samuel Junior</span>
          </div>
          <div style={{ color: '#c9192b', fontSize: 31, fontWeight: 600 }}>
            Full-Stack Developer · SaaS Builder
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#646b76', fontSize: 23 }}>
          <span>From business needs to digital products</span>
          <span>Côte d’Ivoire · International</span>
        </div>
        <div style={{ position: 'absolute', right: -75, top: 105, width: 285, height: 285, borderRadius: 180, background: '#e52336', opacity: 0.08 }} />
      </div>
    ),
    { ...size },
  );
}
