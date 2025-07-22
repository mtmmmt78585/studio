// src/app/(auth)/signup/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match.',
      });
      return;
    }
    setIsLoading(true);
    // Simulate API signup
    setTimeout(() => {
      console.log('Creating account with:', { username, phone, password });
      toast({
        title: 'Account Created!',
        description: `Welcome to Yappzy, ${username}!`,
      });
      router.push('/feed');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-4">
        <header className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <X className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-semibold">Sign up</h1>
            <div className="w-10"></div>
        </header>

      <main className="flex-1 flex flex-col justify-center px-4">
          <h2 className="text-2xl font-bold mb-8">Create your account</h2>
        
          <form onSubmit={handleSignup} className="space-y-6">
             <Input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="h-12 text-base"
              />
              <Input
                id="phone"
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className="h-12 text-base"
              />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="h-12 text-base"
              />
               <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="h-12 text-base"
              />
            <Button
              type="submit"
              className="w-full font-semibold h-12 rounded-full text-base"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign up
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
      </main>

      <footer className="text-center text-xs text-muted-foreground p-4">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </footer>
    </div>
  );
}
