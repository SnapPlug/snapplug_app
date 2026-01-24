import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default async function AppleIcon() {
  // Load the Pirulen font
  const fontPath = join(process.cwd(), 'public/fonts/pirulen.regular.otf');
  const fontData = await readFile(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 110,
          background: '#171717',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 34,
          color: 'white',
          fontFamily: 'Pirulen',
          fontWeight: 400,
        }}
      >
        S
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
