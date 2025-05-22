import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Страница не найдена</p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}

export const metadata = {
  title: "404 - Страница не найдена",
};
