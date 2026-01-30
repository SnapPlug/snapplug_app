import { NextRequest, NextResponse } from 'next/server';
import { appendDiagnosisData, DiagnosisFormData } from '@/lib/google-sheets';

// Role to Agent mapping
const roleToAgent: Record<string, string> = {
  cs_담당자: 'sera',
  영업_담당자: 'rio',
  마케터: 'luna',
  데이터_담당: 'alex',
  비서: 'ara',
  자동화_전문가: 'ara',
};

const taskToAgent: Record<string, string> = {
  고객_문의_응대: 'sera',
  영업_리드_관리: 'rio',
  콘텐츠_마케팅: 'luna',
  데이터_입력_정리: 'alex',
  문서_증빙_처리: 'alex',
  일정_조율_미팅: 'ara',
  업무_프로세스_자동화: 'ara',
};

const hoursMap: Record<string, number> = {
  '5시간_미만': 16,
  '5-10시간': 30,
  '10-20시간': 60,
  '20시간_이상': 100,
};

const automationRateMap: Record<string, number> = {
  대부분반복: 0.7,
  절반패턴화: 0.5,
  케이스마다다름: 0.3,
};

function calculateRecommendations(role: string, tasks: string[]): string[] {
  const agents = new Set<string>();

  if (role && roleToAgent[role]) {
    agents.add(roleToAgent[role]);
  }

  tasks.forEach((task) => {
    if (taskToAgent[task]) {
      agents.add(taskToAgent[task]);
    }
  });

  return Array.from(agents);
}

function calculateAnnualSavings(hours: string, pattern: string): number {
  const monthlyHours = hoursMap[hours] || 30;
  const automationRate = automationRateMap[pattern] || 0.5;
  const monthlySavedHours = monthlyHours * automationRate;
  return Math.round(monthlySavedHours * 12 * 50000);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'role',
      'tasks',
      'hours',
      'pattern',
      'teamSize',
      'company',
      'name',
      'email',
    ];
    for (const field of requiredFields) {
      if (!body[field] || (Array.isArray(body[field]) && body[field].length === 0)) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Calculate derived values
    const recommendedAgents = calculateRecommendations(body.role, body.tasks);
    const estimatedSavings = calculateAnnualSavings(body.hours, body.pattern);

    // Get metadata
    const userAgent = request.headers.get('user-agent') || '';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor?.split(',')[0]?.trim() || 'unknown';

    const formData: DiagnosisFormData = {
      role: body.role,
      tasks: body.tasks,
      hours: body.hours,
      pattern: body.pattern,
      teamSize: body.teamSize,
      company: body.company,
      name: body.name,
      email: body.email,
      phone: body.phone,
      recommendedAgents,
      estimatedSavings,
      userAgent,
      ipAddress,
    };

    // Append to Google Sheets
    const success = await appendDiagnosisData(formData);

    if (!success) {
      // Log error but don't fail the request
      console.error('Failed to save to Google Sheets, but continuing...');
    }

    return NextResponse.json({
      success: true,
      message: 'Diagnosis data saved successfully',
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
