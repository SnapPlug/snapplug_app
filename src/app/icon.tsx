import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default async function Icon() {
  // Load the Pirulen font
  const fontPath = join(process.cwd(), 'public/fonts/pirulen.regular.otf');
  const fontData = await readFile(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#171717',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
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
