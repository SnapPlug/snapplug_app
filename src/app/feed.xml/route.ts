const SITE_URL = 'https://snapplug.app';

const pages = [
  {
    title: '스냅플러그(SnapPlug) - 당신의 첫 번째 AI 팀원',
    link: SITE_URL,
    description:
      '스냅플러그 - AI 자동화로 반복 업무에서 해방되세요. 5명의 AI 팀원이 마케팅, 영업, 고객응대, 업무자동화를 대신합니다.',
  },
  {
    title: 'AI 자동화 ROI 진단 - 30초 만에 확인하세요',
    link: `${SITE_URL}/ai-diagnosis`,
    description:
      '반복 업무에 매달 얼마를 쓰고 계신가요? 30초 진단으로 AI 팀원 도입 시 절감 시간과 비용을 바로 확인하세요.',
  },
  {
    title: '상담 예약 - 60분 무료 진단 컨설팅',
    link: `${SITE_URL}/contacts`,
    description:
      'AI 팀원 도입 무료 상담을 예약하세요. 60분 맞춤 진단으로 업무 자동화 포인트를 찾아드립니다.',
  },
];

function buildRss(): string {
  const now = new Date().toUTCString();

  const items = pages
    .map(
      (page) => `<item>
<title><![CDATA[${page.title}]]></title>
<link>${page.link}</link>
<description><![CDATA[${page.description}]]></description>
<guid isPermaLink="true">${page.link}</guid>
<pubDate>${now}</pubDate>
</item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title><![CDATA[스냅플러그(SnapPlug) - 당신의 첫 번째 AI 팀원]]></title>
<link>${SITE_URL}</link>
<description><![CDATA[스냅플러그 - AI 자동화로 반복 업무에서 해방되세요. 스몰비즈니스와 1인 기업을 위한 AI 팀원 채용 서비스.]]></description>
<language>ko</language>
<lastBuildDate>${now}</lastBuildDate>
${items}
</channel>
</rss>`;
}

export function GET() {
  return new Response(buildRss(), {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
