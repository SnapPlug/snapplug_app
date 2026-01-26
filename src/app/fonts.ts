import localFont from 'next/font/local';

// Pirulen font for logo/brand elements
export const pirulen = localFont({
  src: '../../public/fonts/pirulen.regular.otf',
  display: 'swap',
  variable: '--font-pirulen',
  weight: '400',
});

// Note: Pretendard Variable is loaded via CDN for better caching
// The font is preloaded in layout.tsx head section
