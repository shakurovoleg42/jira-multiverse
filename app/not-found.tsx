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

// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function NotFound() {
//   const [phase, setPhase] = useState<"fly" | "explode" | "fade" | "content">(
//     "fly"
//   );
//   const [grenadePosition, setGrenadePosition] = useState(0);

//   useEffect(() => {
//     // Анимация полета гранаты (2 секунды)
//     const flyAnimation = setInterval(() => {
//       setGrenadePosition((prev) => {
//         if (prev >= 100) {
//           clearInterval(flyAnimation);
//           setPhase("explode");
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 20);

//     return () => clearInterval(flyAnimation);
//   }, []);

//   useEffect(() => {
//     if (phase === "explode") {
//       // Взрыв и белый экран (200ms)
//       const explodeTimer = setTimeout(() => {
//         setPhase("fade");

//         // Медленное затухание (3 секунды)
//         const fadeTimer = setTimeout(() => {
//           setPhase("content");
//         }, 900);

//         return () => clearTimeout(fadeTimer);
//       }, 200);

//       return () => clearTimeout(explodeTimer);
//     }
//   }, [phase]);

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-black">
//       {/* Анимация летящей гранаты */}
//       {phase === "fly" && (
//         <div className="absolute inset-0 flex items-center justify-center z-50">
//           <div
//             className="relative transition-all duration-2000"
//             style={{
//               transform: `translateY(${grenadePosition}px) scale(${
//                 1 + grenadePosition / 50
//               })`,
//               opacity: `${1 - grenadePosition / 200}`,
//             }}
//           >
//             <Image
//               src="/cs2flash.webp"
//               alt="Flash grenade"
//               width={50 + grenadePosition}
//               height={50 + grenadePosition}
//               className="drop-shadow-grenade"
//             />
//           </div>
//         </div>
//       )}

//       {/* Взрыв (белый экран) */}
//       {phase === "explode" && (
//         <div className="absolute inset-0 bg-white z-50"></div>
//       )}

//       {/* Медленное затухание */}
//       {phase === "fade" && (
//         <div className="absolute inset-0 bg-white z-50 animate-fade-to-black"></div>
//       )}

//       {/* Финальный контент */}
//       {phase === "content" && (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
//           <h1 className="text-9xl font-bold text-gray-100">404</h1>
//           <p className="mt-4 text-xl text-gray-300">Страница не найдена</p>
//           <Link
//             href="/"
//             className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Вернуться на главную
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }
