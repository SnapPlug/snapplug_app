import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { SITE_CONFIG } from '@/constants/navigation';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '스냅플러그(SnapPlug) 개인정보처리방침. 개인정보의 수집·이용·보관·파기 등에 관한 사항을 안내합니다.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy`,
  },
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[var(--background)]">
      <nav className="navbar pt-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg sm:text-xl md:text-2xl tracking-wide font-bold">
            SnapPlug
          </Link>
          <Link href="/" className="text-[var(--text-sub)] hover:text-[var(--foreground)] transition-colors">
            ← 홈으로
          </Link>
        </div>
      </nav>

      <section className="flex-1 py-16 md:py-24">
        <div className="container max-w-3xl">
          <Breadcrumb
            items={[{ label: '홈', href: '/' }]}
            current="개인정보처리방침"
          />
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">개인정보처리방침</h1>
          <p className="text-sm text-[var(--text-sub)] mb-10">시행일: 2025년 3월 13일</p>

          <div className="prose prose-sm max-w-none text-[var(--foreground)] space-y-8">

            <p>
              (주) 스냅플러그 (SnapPlug) (이하 "회사")은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고
              이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.
              스냅플러그(SnapPlug)는 이용자를 위하여 반드시 필요한 최소한의 정보만을 수집하여 필요한 기간까지 안전하게 보호하고
              이후 안전하게 파기하는 것을 개인정보취급방침의 핵심으로 두고 있습니다.
            </p>

            <section>
              <h2 className="text-lg font-bold mb-3">1. 개인정보의 수집 및 이용</h2>
              <p className="mb-4">회사는 원활한 서비스 제공을 위해 다음과 같은 이용자의 개인정보를 처리하고 있습니다.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-3 py-2 text-left">서비스</th>
                      <th className="border border-gray-200 px-3 py-2 text-left">수집 및 이용목적</th>
                      <th className="border border-gray-200 px-3 py-2 text-left">수집 항목</th>
                      <th className="border border-gray-200 px-3 py-2 text-left">보유기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2">회원가입</td>
                      <td className="border border-gray-200 px-3 py-2">서비스 이용을 위한 이용자 식별 / 개별 통지</td>
                      <td className="border border-gray-200 px-3 py-2">필수: 휴대폰 번호, 이름, 이메일, 비밀번호<br />선택: 성별, 생년월일</td>
                      <td className="border border-gray-200 px-3 py-2">회원탈퇴시까지 (관계 법령에 따라 일정 기간 보관)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2">서비스 이용 시 생성 정보</td>
                      <td className="border border-gray-200 px-3 py-2">부정이용 방지 및 서비스 개선</td>
                      <td className="border border-gray-200 px-3 py-2">IP주소, 단말기 정보(OS, 기기식별값), 서비스 이용 기록</td>
                      <td className="border border-gray-200 px-3 py-2">회원탈퇴시까지</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-[var(--text-sub)]">
                개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의 거부 시 회원가입이 제한됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">2. 만 14세 미만 아동의 개인정보</h2>
              <p>회사는 법정대리인의 동의가 필요한 만 14세 미만 아동에 대한 정보를 수집 및 이용하지 않습니다.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">3. 개인정보의 제3자 제공</h2>
              <p>회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우는 예외입니다.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>이용자들이 사전에 공개에 동의한 경우</li>
                <li>전기통신기본법, 전기통신사업법 등 관계 법령에 따라 수사기관의 요구가 있는 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">4. 개인정보처리의 위탁</h2>
              <p>
                회사는 위탁계약 체결 시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외 개인정보 처리금지,
                기술적/관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리/감독, 손해배상 등 책임에 관한 사항을
                계약서 등 문서에 명시하고 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">5. 개인정보의 보유 및 이용기간</h2>
              <p className="mb-3">회사는 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기함을 원칙으로 합니다. 다만, 다음은 예외입니다.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>계약 또는 청약철회 등에 관한 기록: <strong>5년</strong></li>
                <li>대금결제 및 재화 등의 공급에 관한 기록: <strong>5년</strong></li>
                <li>소비자의 불만 또는 분쟁처리에 관한 기록: <strong>1년</strong></li>
                <li>게시판 이용자의 본인확인에 관한 기록: <strong>6개월</strong></li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">6. 개인정보 파기절차 및 방법</h2>
              <p className="mb-2">
                <strong>파기절차:</strong> 이용자가 회원탈퇴를 신청하는 경우, 소비자의 불만 및 분쟁해결 목적으로
                30일간 개인정보를 보관한 후 재생이 불가능한 방법으로 파기합니다.
              </p>
              <p>
                <strong>파기방법:</strong> 전자적 파일 형태로 기록/저장된 개인정보는 Low Level Format 등의 방법으로 파기하며,
                종이 문서에 기록/저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">7. 이용자의 권리와 행사방법</h2>
              <p className="mb-2">이용자는 회사에 대해 언제든지 다음 권리를 행사할 수 있습니다.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>개인정보 열람요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제요구</li>
                <li>처리정지 요구</li>
              </ul>
              <p className="mt-2 text-sm text-[var(--text-sub)]">
                권리 행사는 서면, 전화, 전자우편 등을 통하여 할 수 있으며 회사는 지체 없이 조치하겠습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">8. 쿠키(Cookie) 운영</h2>
              <p className="mb-2">
                회사는 이용자에게 맞춤서비스를 제공하기 위해 쿠키를 사용합니다. 쿠키는 웹사이트 서버가
                이용자의 컴퓨터 브라우저에 보내는 소량의 정보입니다.
              </p>
              <p>
                <strong>쿠키 거부 방법:</strong> 웹브라우저 상단의 도구 &gt; 인터넷옵션 &gt; 보안 &gt; 사용자정의수준에서
                쿠키 허용/거부를 선택할 수 있습니다. 단, 쿠키 거부 시 일부 서비스 이용이 제한될 수 있습니다.
              </p>
              <p className="mt-2 text-sm text-[var(--text-sub)]">
                Google Analytics를 활용하여 익명의 사용자 정보를 기반으로 사이트 이용 통계를 분석합니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">9. 개인정보의 기술적/관리적 보호대책</h2>
              <p>
                회사는 이용자들의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록
                보호하고 있으며, 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">10. 개인정보 보호책임자</h2>
              <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-1">
                <div className="flex gap-4"><span className="font-medium w-20">성명</span><span>정해성</span></div>
                <div className="flex gap-4"><span className="font-medium w-20">직책</span><span>대표</span></div>
                <div className="flex gap-4">
                  <span className="font-medium w-20">이메일</span>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-[var(--primary)] hover:underline">
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">11. 권익 침해 구제 방법</h2>
              <p className="mb-2">이용자는 아래 기관에 개인정보 침해에 대한 피해구제, 상담을 문의할 수 있습니다.</p>
              <ul className="text-sm space-y-1">
                <li>개인정보 침해신고센터 (한국인터넷진흥원) — www.118.or.kr / ☎ 118</li>
                <li>개인정보 분쟁조정위원회 — www.kopico.go.kr / ☎ 1833-6972</li>
                <li>대검찰청 사이버범죄수사단 — www.spo.go.kr / ☎ 1301</li>
                <li>경찰청 사이버안전국 — cyberbureau.police.go.kr / ☎ 182</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">12. 고지의 의무</h2>
              <p>
                본 개인정보 처리방침은 2025년 3월 13일에 제정되었으며, 법령/정책 또는 보안기술의 변경에 따라
                내용의 추가, 삭제 및 수정이 있을 시에는 시행 최소 7일 전에 홈페이지를 통해 공지하겠습니다.
              </p>
            </section>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
