// src/app/(auth)/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, X, KeyRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'OTP Sent!',
        description: `An OTP has been sent to ${phone}.`,
      });
      setStep(2);
    }, 1500);
  };
  
  const handleResetPassword = (e: React.FormEvent) => {
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
    // Simulate API password reset
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Password Reset Successful',
        description: 'You can now log in with your new password.',
      });
      router.push('/login');
    }, 1500);
  };


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-4">
        <header className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <X className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-semibold">Forgot Password</h1>
            <div className="w-10"></div>
        </header>

      <main className="flex-1 flex flex-col justify-center px-4">
          <KeyRound className="h-12 w-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-center">Reset Your Password</h2>
          <p className="text-muted-foreground text-center mb-8">
            {step === 1 ? "Enter your phone number to receive a verification code." : "Enter the OTP and set your new password."}
          </p>
        
          {step === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-6">
                 <Input
                    id="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    className="h-12 text-base"
                  />
                <Button
                  type="submit"
                  className="w-full font-semibold h-12 rounded-full text-base"
                  disabled={isLoading || !phone}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send OTP
                </Button>
              </form>
          )}

          {step === 2 && (
             <form onSubmit={handleResetPassword} className="space-y-6">
                 <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    required
                    className="h-12 text-base"
                  />
                 <Input
                    id="password"
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="h-12 text-base"
                  />
                   <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm New Password"
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
                  Reset Password
                </Button>
              </form>
          )}
          
      </main>

       <footer className="text-center text-xs text-muted-foreground p-4">
        Remember your password?{' '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
            Log in here.
        </Link>
      </footer>
    </div>
  );
}
