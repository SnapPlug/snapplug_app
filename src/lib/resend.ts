import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface DiagnosisNotificationData {
  company: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  tasks: string[];
  hours: string;
  pattern: string;
  teamSize: string;
  recommendedAgents: string[];
  estimatedSavings: number;
}

const agentNames: Record<string, string> = {
  sera: 'Sera (AI 고객응대)',
  rio: 'Rio (AI 영업)',
  luna: 'Luna (AI 마케팅)',
  alex: 'Alex (AI 정보관리)',
  ara: 'Ara (AI 수석보좌관)',
};

export async function sendDiagnosisNotification(data: DiagnosisNotificationData): Promise<boolean> {
  if (!resend) {
    console.warn('RESEND_API_KEY not set, skipping email notification');
    return false;
  }

  try {
    const agentList = data.recommendedAgents
      .map((a) => agentNames[a] || a)
      .join(', ');

    const savingsFormatted = `${(data.estimatedSavings / 10000).toLocaleString()}만원`;

    await resend.emails.send({
      from: 'SnapPlug <noreply@snapplug.app>',
      to: 'hello@snapplug.app',
      subject: `[AI 진단] ${data.company} - ${data.name}님 신규 진단 완료`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #E86835; margin-bottom: 24px;">새로운 AI 진단 신청</h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr style="border-bottom: 1px solid #E8E8E8;">
              <td style="padding: 12px 0; color: #6B6B6B; width: 120px;">회사명</td>
              <td style="padding: 12px 0; font-weight: 600;">${data.company}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E8E8E8;">
              <td style="padding: 12px 0; color: #6B6B6B;">이름</td>
              <td style="padding: 12px 0; font-weight: 600;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E8E8E8;">
              <td style="padding: 12px 0; color: #6B6B6B;">이메일</td>
              <td style="padding: 12px 0;"><a href="mailto:${data.email}" style="color: #E86835;">${data.email}</a></td>
            </tr>
            ${data.phone ? `
            <tr style="border-bottom: 1px solid #E8E8E8;">
              <td style="padding: 12px 0; color: #6B6B6B;">전화번호</td>
              <td style="padding: 12px 0;"><a href="tel:${data.phone}" style="color: #E86835;">${data.phone}</a></td>
            </tr>
            ` : ''}
            <tr style="border-bottom: 1px solid #E8E8E8;">
              <td style="padding: 12px 0; color: #6B6B6B;">팀 규모</td>
              <td style="padding: 12px 0;">${data.teamSize}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E8E8E8;">
              <td style="padding: 12px 0; color: #6B6B6B;">주당 반복업무</td>
              <td style="padding: 12px 0;">${data.hours}</td>
            </tr>
          </table>

          <div style="background: #FDF8F3; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <h3 style="margin: 0 0 12px 0; color: #2D2D2D;">진단 결과</h3>
            <p style="margin: 0 0 8px 0;"><strong>추천 AI 팀원:</strong> ${agentList}</p>
            <p style="margin: 0; color: #E86835; font-size: 18px; font-weight: 700;">예상 연간 절감: ${savingsFormatted}</p>
          </div>

          <p style="color: #6B6B6B; font-size: 13px;">
            이 알림은 snapplug.app AI 진단 폼에서 자동 발송되었습니다.
          </p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error('Resend email failed:', error);
    return false;
  }
}
