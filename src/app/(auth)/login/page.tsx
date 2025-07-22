"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from '@/components/Logo';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate verifying OTP
    setTimeout(() => {
        router.push('/');
    }, 1500);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-8">
            <Logo className="text-4xl justify-center" />
            <p className="text-muted-foreground mt-2">Welcome to the future of content.</p>
        </div>

        <div className="bg-card p-8 rounded-2xl border border-border shadow-[0_0_15px_rgba(255,0,127,0.2)]">
            {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                            id="phone" 
                            type="tel" 
                            placeholder="+91 98765 43210" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="bg-background"
                        />
                    </div>
                    <Button type="submit" className="w-full font-bold shadow-glow" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send OTP
                    </Button>
                </form>
            ) : (
                 <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input 
                            id="otp" 
                            type="text" 
                            placeholder="123456" 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="bg-background text-center tracking-[0.5em]"
                        />
                    </div>
                    <Button type="submit" className="w-full font-bold shadow-glow" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Verify & Login
                    </Button>
                </form>
            )}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-8">
            By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
