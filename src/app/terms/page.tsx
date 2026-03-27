import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { SITE_CONFIG } from '@/constants/navigation';

export const metadata: Metadata = {
  title: '서비스 이용약관',
  description: '스냅플러그(SnapPlug) 서비스 이용약관. 회사와 이용자의 권리, 의무 및 책임사항을 규정합니다.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms`,
  },
  robots: { index: true, follow: false },
};

export default function TermsPage() {
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
            current="이용약관"
          />
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">서비스 이용약관</h1>
          <p className="text-sm text-[var(--text-sub)] mb-10">시행일: 2025년 3월 13일</p>

          <div className="prose prose-sm max-w-none text-[var(--foreground)] space-y-8">

            <section>
              <h2 className="text-lg font-bold mb-3">제1조 (목적)</h2>
              <p>
                본 약관은 (주) 스냅플러그 (SnapPlug) (이하 "회사")가 운영하는 스냅플러그 서비스(이하 "서비스") 이용과 관련하여
                회사와 이용자의 권리와 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">제2조 (용어의 정의)</h2>
              <ul className="space-y-2 text-sm">
                <li><strong>"서비스"</strong>: 단말기(PC, TV, 휴대폰 등)와 상관없이 회사가 이용자에게 제공하는 제반 서비스 모두</li>
                <li><strong>"서비스회원"</strong>: 약관에 정해진 가입 절차에 따라 가입하여 서비스를 이용할 수 있는 권한을 부여받은 일반인</li>
                <li><strong>"시설회원"</strong>: 약관에 정해진 가입 절차에 따라 가입하여 서비스를 이용할 수 있는 권한을 부여받은 시설</li>
                <li><strong>"강사회원"</strong>: 회사의 서비스를 이용하는 시설회원에서 일하고 있는 강사, 코치 등</li>
                <li><strong>"수강권"</strong>: 시설회원이 서비스회원에게 서비스를 정상적으로 이용하기 위해 제공하는 모든 수업 이용권</li>
                <li><strong>"서비스 이용권"</strong>: 회사의 서비스를 이용하기 위하여 시설회원이 구매하는 모든 이용권</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">제3조 (약관의 효력 및 변경)</h2>
              <p className="mb-2">
                본 약관은 서비스를 이용하고자 하는 모든 시설회원에 대하여 효력이 발생합니다.
              </p>
              <p className="mb-2">
                회사는 관련 법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
                약관 개정 시 적용일자 7일 이전부터 공지하며, 이용자에게 불리한 변경은 30일 이상 사전 유예기간을 둡니다.
              </p>
              <p className="text-sm text-[var(--text-sub)]">
                공지 방법: 이메일 통보 / 홈페이지({SITE_CONFIG.url}) 내 고지 / 기타 연락처를 이용한 안내
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">제4조 (회원가입)</h2>
              <p className="mb-2">
                서비스회원은 홈페이지를 통해 가입 양식에 따라 회원정보를 기입한 후 본 약관과 개인정보처리방침에
                동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
              </p>
              <p>
                서비스회원 및 시설회원은 회사로부터 부여된 자격을 타인에게 양도하거나 대여 또는 담보 등
                어떠한 목적으로도 이용하게 할 수 없습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">제5조 (회원 자격 제한)</h2>
              <p className="mb-2">다음에 해당하는 경우 회원 자격이 제한될 수 있습니다.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>가입 신청 시 허위 내용을 등록하거나 타인의 명의를 도용한 경우</li>
                <li>부정구매, 부정 사용 등 서비스를 부정한 방법 또는 목적으로 이용한 경우</li>
                <li>수강권 등의 대금을 기일에 지급하지 않는 경우</li>
                <li>다른 사람의 서비스 이용을 방해하거나 정보를 도용하는 경우</li>
                <li>회사와 유사 서비스를 운영하거나 운영 예정인 경우</li>
                <li>서비스를 이용하여 법령 또는 공서양속에 반하는 행위를 하는 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">제6조 (환불 정책)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-3 py-2 text-left">구분</th>
                      <th className="border border-gray-200 px-3 py-2 text-left">내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-medium whitespace-nowrap">이용시작 전</td>
                      <td className="border border-gray-200 px-3 py-2">
                        결제일로부터 7일 이내 결제 취소 요청 시 전액 환불.<br />
                        7일 경과 시 위약금(결제상품의 10%) 공제 후 환불.<br />
                        이용기간이 만료된 상품 환불 불가.<br />
                        할인특가상품은 정상가격 기준으로 공제 후 환불.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 font-medium whitespace-nowrap">이용시작 후</td>
                      <td className="border border-gray-200 px-3 py-2">
                        유료 서비스 공급일 이후 7일 이내 결제 취소 가능.<br />
                        정기결제 해지 시 남은 계약 기간 동안 유료서비스 이용 가능.<br />
                        일시불 결제 시설이 7일 경과 후 결제 취소 시 위약금(10%)과 할인분을 적용하지 않고
                        월 정기결제 기준의 가격으로 월할 및 일할 계산하여 정산 후 환불.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">제7조 (포인트)</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>포인트는 신용카드와 체크카드를 통해 충전 가능하며, 포인트와 카드결제금액의 교환 비율은 1:1입니다.</li>
                <li>서비스 이용 중단 등으로 환불 요청 시 잔여 포인트를 카드결제 취소 또는 현금으로 환불합니다. 단, 무상으로 지급한 포인트는 차감 후 환불합니다.</li>
                <li>포인트는 마지막 충전 또는 이용일로부터 5년 경과 시 상사소멸시효에 의해 소멸될 수 있습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">제8조 (개인정보 수집)</h2>
              <p className="mb-2 text-sm">
                <strong>수집 항목:</strong> 이름, 연락처, 주소, 이메일주소, 성별, 생년월일, 결제정보
              </p>
              <p className="text-sm">
                <strong>보유 기간:</strong> 계약 또는 청약철회 등에 관한 기록 5년 / 대금결제 및 재화 공급에 관한 기록 5년 /
                소비자의 불만 또는 분쟁처리에 관한 기록 3년
              </p>
              <p className="mt-2 text-sm">
                자세한 사항은{' '}
                <Link href="/privacy" className="text-[var(--primary)] hover:underline">
                  개인정보처리방침
                </Link>
                을 확인하세요.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">제9조 (저작권)</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</li>
                <li>
                  시설회원은 스냅플러그 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이
                  복제, 송신, 출판, 배포, 방송 등의 방법으로 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">제10조 (회사의 의무)</h2>
              <p>
                회사는 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며,
                본 약관이 정하는 바에 따라 지속적이고 안정적으로 서비스를 제공하는데 최선을 다합니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">문의</h2>
              <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-1">
                <div className="flex gap-4"><span className="font-medium w-20">상호명</span><span>SNAPPLUG (스냅플러그)</span></div>
                <div className="flex gap-4"><span className="font-medium w-20">대표</span><span>정해성</span></div>
                <div className="flex gap-4"><span className="font-medium w-20">사업자등록번호</span><span>551-10-02859</span></div>
                <div className="flex gap-4">
                  <span className="font-medium w-20">이메일</span>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-[var(--primary)] hover:underline">
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
