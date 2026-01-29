'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import localFont from 'next/font/local';
import Footer from '@/components/Footer';

const pirulen = localFont({
  src: '../../../public/fonts/pirulen.regular.otf',
  display: 'swap',
});

// 질문 옵션 데이터
const roleOptions = [
  { value: 'cs_담당자', label: 'CS 담당자 / 고객 응대 직원', desc: '고객 문의 응대, 채팅 상담' },
  { value: '영업_담당자', label: '영업 담당자 / SDR', desc: '리드 관리, 영업 팔로업' },
  { value: '마케터', label: '마케터 / 콘텐츠 담당자', desc: '콘텐츠 제작, SNS 관리' },
  { value: '데이터_담당', label: '데이터 입력 담당 / 사무 보조', desc: '데이터 정리, 문서 처리' },
  { value: '비서', label: '비서 / 일정 관리자', desc: '일정 조율, 미팅 관리' },
  { value: '자동화_전문가', label: '자동화 전문가', desc: '업무 프로세스 자동화' },
];

const taskOptions = [
  { value: '고객_문의_응대', label: '고객 문의 응대', desc: '전화, 채팅, 이메일 문의 처리' },
  { value: '영업_리드_관리', label: '영업/리드 관리', desc: '문의 분류, 팔로업, 견적 처리' },
  { value: '콘텐츠_마케팅', label: '콘텐츠/마케팅', desc: 'SNS 발행, 블로그 작성, 광고 관리' },
  { value: '데이터_입력_정리', label: '데이터 입력/정리', desc: '엑셀 정리, ERP 입력, DB 관리' },
  { value: '문서_증빙_처리', label: '문서/증빙 처리', desc: '보고서 작성, 영수증 처리, 번역' },
  { value: '일정_조율_미팅', label: '일정 조율/미팅', desc: '미팅 스케줄링, 캘린더 관리' },
  { value: '업무_프로세스_자동화', label: '업무 프로세스 자동화', desc: '반복 워크플로우, 시스템 연동' },
];

const hoursOptions = [
  { value: '5시간_미만', label: '5시간 미만' },
  { value: '5-10시간', label: '5-10시간' },
  { value: '10-20시간', label: '10-20시간' },
  { value: '20시간_이상', label: '20시간 이상' },
];

const patternOptions = [
  { value: '대부분반복', label: '대부분 비슷한 패턴', desc: '80% 이상 반복' },
  { value: '절반패턴화', label: '절반 정도는 패턴화 가능', desc: '50% 정도 반복' },
  { value: '케이스마다다름', label: '케이스마다 다름', desc: '상황에 따라 다름' },
];

const teamSizeOptions = [
  { value: '1-5명', label: '1-5명' },
  { value: '6-20명', label: '6-20명' },
  { value: '21-50명', label: '21-50명' },
  { value: '50명_이상', label: '50명 이상' },
];

export default function AIDiagnosisPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    tasks: [] as string[],
    hours: '',
    pattern: '',
    teamSize: '',
    company: '',
    name: '',
    email: '',
    phone: '',
  });

  const totalSteps = 6;

  const handleRoleSelect = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleTaskToggle = (value: string) => {
    const tasks = formData.tasks.includes(value)
      ? formData.tasks.filter((t) => t !== value)
      : [...formData.tasks, value];
    setFormData({ ...formData, tasks });
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const params = new URLSearchParams({
      role: formData.role,
      tasks: formData.tasks.join(','),
      hours: formData.hours,
      pattern: formData.pattern,
      team_size: formData.teamSize,
      name: formData.name,
      company: formData.company,
    });
    router.push(`/ai-diagnosis/result?${params.toString()}`);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.role !== '';
      case 2:
        return formData.tasks.length > 0;
      case 3:
        return formData.hours !== '';
      case 4:
        return formData.pattern !== '';
      case 5:
        return formData.teamSize !== '';
      case 6:
        return formData.company !== '' && formData.name !== '' && formData.email !== '';
      default:
        return false;
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Navbar */}
      <nav className="navbar pt-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className={`${pirulen.className} text-lg sm:text-xl md:text-2xl tracking-wide`}
          >
            SnapPlug
          </Link>
          <Link
            href="/"
            className="text-[var(--text-sub)] hover:text-[var(--foreground)] transition-colors"
          >
            ← 홈으로
          </Link>
        </div>
      </nav>

      {/* Form Section */}
      <section className="flex-1 py-12 md:py-20">
        <div className="container max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-[var(--primary)] font-semibold mb-2">AI 자동화 ROI 진단</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
              30초 만에 확인하세요
            </h1>
            <p className="text-[var(--text-sub)]">
              귀사에 맞는 AI 팀원과 예상 ROI를 알려드릴게요
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-[var(--text-sub)] mb-2">
              <span>Step {step} / {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--primary)] transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[var(--border)]">
            {/* Step 1: Role Selection */}
            {step === 1 && (
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[var(--foreground)] mb-2">
                  어떤 역할의 직원이 필요하신가요?
                </h2>
                <p className="text-[var(--text-sub)] text-sm mb-6">
                  채용하고 싶었던 직원 역할을 선택해주세요
                </p>
                <div className="space-y-3">
                  {roleOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleRoleSelect(option.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        formData.role === option.value
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                          : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      <div className="font-medium text-[var(--foreground)]">{option.label}</div>
                      <div className="text-sm text-[var(--text-sub)]">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Task Selection */}
            {step === 2 && (
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[var(--foreground)] mb-2">
                  가장 시간을 많이 쓰는 반복 업무는?
                </h2>
                <p className="text-[var(--text-sub)] text-sm mb-6">
                  자동화하고 싶은 업무를 모두 선택해주세요 (복수 선택)
                </p>
                <div className="space-y-3">
                  {taskOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleTaskToggle(option.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        formData.tasks.includes(option.value)
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                          : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            formData.tasks.includes(option.value)
                              ? 'border-[var(--primary)] bg-[var(--primary)]'
                              : 'border-gray-300'
                          }`}
                        >
                          {formData.tasks.includes(option.value) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-[var(--foreground)]">{option.label}</div>
                          <div className="text-sm text-[var(--text-sub)]">{option.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Hours */}
            {step === 3 && (
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[var(--foreground)] mb-2">
                  위 업무에 주당 몇 시간을 쓰시나요?
                </h2>
                <p className="text-[var(--text-sub)] text-sm mb-6">
                  대략적인 시간을 선택해주세요
                </p>
                <div className="space-y-3">
                  {hoursOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormData({ ...formData, hours: option.value })}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        formData.hours === option.value
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                          : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      <div className="font-medium text-[var(--foreground)]">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Pattern */}
            {step === 4 && (
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[var(--foreground)] mb-2">
                  이 업무들이 반복되는 패턴이 있나요?
                </h2>
                <p className="text-[var(--text-sub)] text-sm mb-6">
                  자동화 가능성을 판단하는 데 도움이 됩니다
                </p>
                <div className="space-y-3">
                  {patternOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormData({ ...formData, pattern: option.value })}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        formData.pattern === option.value
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                          : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      <div className="font-medium text-[var(--foreground)]">{option.label}</div>
                      <div className="text-sm text-[var(--text-sub)]">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Team Size */}
            {step === 5 && (
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[var(--foreground)] mb-2">
                  현재 팀 규모는?
                </h2>
                <p className="text-[var(--text-sub)] text-sm mb-6">
                  회사 전체 또는 해당 부서 인원을 선택해주세요
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {teamSizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormData({ ...formData, teamSize: option.value })}
                      className={`text-center p-4 rounded-xl border-2 transition-all ${
                        formData.teamSize === option.value
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                          : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      <div className="font-medium text-[var(--foreground)]">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Contact Info */}
            {step === 6 && (
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[var(--foreground)] mb-2">
                  마지막으로, 연락처를 알려주세요
                </h2>
                <p className="text-[var(--text-sub)] text-sm mb-6">
                  맞춤 진단 결과를 보내드릴게요
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      회사명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="스냅플러그"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      성함 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="홍길동"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="hello@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      전화번호 <span className="text-[var(--text-sub)]">(선택)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010-1234-5678"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                  step === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-[var(--text-sub)] hover:text-[var(--foreground)]'
                }`}
              >
                ← 이전
              </button>
              {step < totalSteps ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                    isStepValid()
                      ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  다음 →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                    isStepValid()
                      ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  결과 확인하기
                </button>
              )}
            </div>
          </div>

          {/* Trust Badge */}
          <p className="text-center text-sm text-[var(--text-sub)] mt-6">
            🔒 입력하신 정보는 진단 목적으로만 사용됩니다
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
