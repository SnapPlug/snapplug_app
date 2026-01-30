import { google } from 'googleapis';

export interface DiagnosisFormData {
  role: string;
  tasks: string[];
  hours: string;
  pattern: string;
  teamSize: string;
  company: string;
  name: string;
  email: string;
  phone?: string;
  recommendedAgents?: string[];
  estimatedSavings?: number;
  userAgent?: string;
  ipAddress?: string;
}

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function getAuthClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!email || !key) {
    throw new Error('Google Sheets credentials not configured');
  }

  return new google.auth.JWT({
    email,
    key,
    scopes: SCOPES,
  });
}

export async function appendDiagnosisData(data: DiagnosisFormData): Promise<boolean> {
  try {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error('Spreadsheet ID not configured');
    }

    const timestamp = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const row = [
      timestamp,
      data.role,
      data.tasks.join(', '),
      data.hours,
      data.pattern,
      data.teamSize,
      data.company,
      data.name,
      data.email,
      data.phone || '',
      data.recommendedAgents?.join(', ') || '',
      data.estimatedSavings || 0,
      data.userAgent || '',
      data.ipAddress || '',
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: '시트1!A:N',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return true;
  } catch (error) {
    console.error('Failed to append to Google Sheets:', error);
    return false;
  }
}
