"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 p-10 bg-white text-black">
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={200}
        height={48}
        className="dark:invert"
      />
      <h1 className="text-3xl font-bold">Welcome to Image-Template-Filler</h1>
      <Link
        href="/upload"
        className="bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-6 rounded-md"
      >
        Go to Upload Page
      </Link>
    </div>
  );
}

