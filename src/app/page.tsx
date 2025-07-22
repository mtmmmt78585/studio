"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Logo } from "@/components/Logo";

export default function SplashPage() {
  const [isFading, setIsFading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
    }, 2000); // Splash screen visible for 2 seconds

    const redirectTimer = setTimeout(() => {
        router.push('/login');
    }, 3000); // Start fade out and redirect

    return () => {
        clearTimeout(timer);
        clearTimeout(redirectTimer);
    }
  }, [router]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-background text-white transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center justify-center animate-pulse">
        <Logo className="text-6xl drop-shadow-[0_0_15px_rgba(255,0,127,0.7)]" />
        <p className="text-sm text-secondary mt-4 tracking-widest">Made in India 🇮🇳</p>
      </div>
    </div>
  );
}
