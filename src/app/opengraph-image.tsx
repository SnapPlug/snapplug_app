import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
export const alt = 'SnapPlug - 당신의 첫 번째 AI 팀원';

export default async function OGImage() {
  // Load the Pirulen font
  const fontPath = join(process.cwd(), 'public/fonts/pirulen.regular.otf');
  const fontData = await readFile(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FF7F50 0%, #FF9966 50%, #FFB088 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: '#171717',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 48,
              fontFamily: 'Pirulen',
              marginRight: 20,
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: 56,
              fontFamily: 'Pirulen',
              color: '#171717',
            }}
          >
            SnapPlug
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          당신의 첫 번째 AI 팀원
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
          }}
        >
          AI 자동화로 반복 업무에서 해방되세요
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: 60,
            marginTop: 50,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.2)',
              padding: '20px 40px',
              borderRadius: 16,
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: 'white' }}>월 54시간</span>
            <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.8)' }}>업무 시간 절감</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.2)',
              padding: '20px 40px',
              borderRadius: 16,
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: 'white' }}>매출 2배</span>
            <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.8)' }}>실제 고객 사례</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Pirulen',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
