// src/app/(auth)/login/page.tsx
'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Logo} from '@/components/Logo';
import {Loader2} from 'lucide-react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate Firebase login
    setTimeout(() => {
      // In a real app, you would use Firebase Auth here
      // For example: signInWithEmailAndPassword(auth, email, password)
      console.log('Logging in with:', {phone, password});
      router.push('/feed');
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-8">
          <Logo text="YAPPZY" className="text-4xl justify-center" />
          <p className="text-muted-foreground mt-2">
            Welcome back to the future of content.
          </p>
        </div>

        <div className="bg-card p-8 rounded-2xl border border-border shadow-[0_0_15px_rgba(255,0,127,0.2)]">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="bg-background"
              />
            </div>
            <Button
              type="submit"
              className="w-full font-bold shadow-glow"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-center text-xs text-muted-foreground mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
