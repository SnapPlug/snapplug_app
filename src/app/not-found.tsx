import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#FDF8F3" }}
    >
      <div className="text-center px-6">
        <p
          className="text-6xl font-bold mb-4"
          style={{ color: "#FF7F50" }}
        >
          404
        </p>
        <h1
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ color: "#2D2D2D" }}
        >
          페이지를 찾을 수 없습니다
        </h1>
        <p
          className="mb-8"
          style={{ color: "#6B6B6B" }}
        >
          요청하신 페이지가 존재하지 않거나 이동되었어요.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 text-white font-semibold rounded-xl transition-colors"
          style={{ backgroundColor: "#FF7F50" }}
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
