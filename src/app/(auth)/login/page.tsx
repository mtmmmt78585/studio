// src/app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Loader2, X, KeyRound, Smartphone, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Simple Weibo icon as SVG component
const WeiboIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 18.1a6.4 6.4 0 0 0 6.4-6.4c0-3-2.3-5.4-5.2-5.4h-2.4a5.2 5.2 0 0 0-5.2 5.2c0 2.2 1.3 4 3.2 4.8.6.2 1.1.3 1.7.3a4 4 0 0 0 4-4c0-1.8-1.3-3.2-3-3.2a3 3 0 0 0-3 3"/>
        <path d="M22 6c-2 0-3.3 1.8-3.3 4s1.3 4 3.3 4"/>
    </svg>
);


export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
        alert("Please agree to the policies to continue.");
        return;
    }
    setIsLoading(true);
    // Simulate API login
    setTimeout(() => {
      console.log('Logging in with:', { phone });
      router.push('/feed');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <X className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">Log in</h1>
        <Button variant="link" className="text-foreground">Help</Button>
      </header>

      <main className="flex-1 flex flex-col p-8">
        <div className="flex items-center border-b border-muted pb-2">
            <div className="flex items-center gap-2 pr-4">
                <span className="font-semibold">+91</span>
            </div>
            <Separator orientation="vertical" className="h-6 bg-primary" />
            <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className="border-0 text-lg flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
        </div>

        <div className="flex items-start space-x-3 mt-6 text-xs text-muted-foreground">
            <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} className="mt-0.5" />
            <label htmlFor="terms">
                I proudly accept all terms of Yappzy — a Made in India app, committed to user safety, child protection, and data privacy under Indian laws including the IT Act 2000 & Digital Personal Data Protection Act 2023. Jai Hind!
            </label>
        </div>

        <Button
            onClick={handleLogin}
            className="w-full mt-8 rounded-full h-12 text-base font-semibold"
            disabled={isLoading || !agreed || !phone}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Authentication and login
        </Button>

        <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">Other login methods</p>
            <div className="flex justify-center items-center gap-6 mt-4">
                 <Button variant="outline" className="rounded-full h-11 w-auto px-6">
                    <KeyRound className="mr-2 h-4 w-4" /> Password
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-11 w-11">
                    <Smartphone className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-11 w-11">
                    <WeiboIcon className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-11 w-11">
                    <Mail className="h-5 w-5" />
                </Button>
            </div>
        </div>
      </main>

      <footer className="p-8 text-center">
          <Button variant="link" className="text-muted-foreground">
              Retrieve Account
          </Button>
      </footer>
    </div>
  );
}
