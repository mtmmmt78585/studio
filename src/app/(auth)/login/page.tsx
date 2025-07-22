
// src/app/(auth)/login/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, X, KeyRound, Smartphone, Mail, HelpCircle, FileText, Shield, Award, IndianRupee, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Logo } from '@/components/Logo';

// Simple SVG icons as components
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.658-3.317-11.297-7.92l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.902,35.696,44,30.368,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2" {...props}>
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z" />
    </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
        <defs>
            <radialGradient id="ig-grad" cx="0.3" cy="1.2" r="1.2">
                <stop offset="0" stopColor="#F58529" />
                <stop offset="0.4" stopColor="#DD2A7B" />
                <stop offset="0.9" stopColor="#8134AF" />
            </radialGradient>
        </defs>
        <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.44c-3.116 0-3.473.012-4.69.068-2.61.119-3.833 1.32-3.952 3.952-.056 1.217-.067 1.574-.067 4.69s.011 3.473.067 4.69c.119 2.633 1.343 3.833 3.952 3.952 1.217.056 1.574.067 4.69.067s3.473-.011 4.69-.067c2.61-.119 3.833-1.319 3.952-3.952.056-1.217.067-1.574.067-4.69s-.011-3.473-.067-4.69c-.119-2.633-1.343-3.833-3.952-3.952C15.473 3.614 15.116 3.603 12 3.603zm0 2.452c-3.34 0-6.052 2.713-6.052 6.052s2.713 6.052 6.052 6.052 6.052-2.713 6.052-6.052-2.713-6.052-6.052-6.052zm0 9.658c-1.99 0-3.606-1.615-3.606-3.606s1.616-3.606 3.606-3.606 3.606 1.615 3.606 3.606-1.616 3.606-3.606 3.606zm4.616-9.352c-.786 0-1.424-.638-1.424-1.424s.638-1.424 1.424-1.424 1.424.638 1.424 1.424-.638 1.424-1.424 1.424z" />
    </svg>
);

const HelpInfoItem = ({ icon, title, children, iconClassName }: { icon: React.ElementType, title: string, children: React.ReactNode, iconClassName?: string }) => (
    <div className="flex items-start gap-4">
        {React.createElement(icon, { className: `h-6 w-6 text-primary flex-shrink-0 mt-1 ${iconClassName}` })}
        <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <div className="text-muted-foreground text-sm space-y-2">{children}</div>
        </div>
    </div>
);


export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
        toast({ variant: 'destructive', title: "Agreement Required", description: "Please agree to the policies to continue."});
        return;
    }
    setIsLoading(true);
    // Simulate API login
    setTimeout(() => {
      console.log('Logging in with:', { phone, password });
      router.push('/feed');
    }, 1500);
  };
  
  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'instagram') => {
    setIsLoading(true);
    let authProvider;

    if (provider === 'google') {
        authProvider = new GoogleAuthProvider();
    } else if (provider === 'facebook') {
        authProvider = new FacebookAuthProvider();
    } else { // Instagram uses OAuth provided by Facebook
        authProvider = new OAuthProvider('oidc.apple.com'); // Placeholder, Instagram is complex
         toast({
            variant: 'destructive',
            title: "Coming Soon!",
            description: "Instagram login is not yet available. Please use Google or Facebook.",
        });
        setIsLoading(false);
        return;
    }

    try {
        const result = await signInWithPopup(auth, authProvider);
        const user = result.user;
        toast({
            title: 'Login Successful!',
            description: `Welcome, ${user.displayName}!`,
        });
        router.push('/feed');
    } catch (error) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'Login Failed',
            description: "Could not log in with the selected provider. Please try again.",
        });
    } finally {
        setIsLoading(false);
    }
  }


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <X className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">Log in</h1>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link" className="text-foreground">Help</Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                 <SheetHeader>
                    <SheetTitle className="font-headline text-2xl flex items-center gap-2">
                        <HelpCircle className="h-6 w-6 text-primary"/>
                        Help & About
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex-1 -mx-6 px-6 text-sm">
                    <div className="space-y-6 pb-8">
                         <div className="text-center bg-card p-4 rounded-lg">
                            <p className="text-muted-foreground">For any assistance, contact our Support Team:</p>
                            <a href="mailto:support@yappzy.com" className="font-semibold text-accent hover:underline">
                                support@yappzy.com
                            </a>
                        </div>
                        
                        <div className="prose prose-sm dark:prose-invert text-muted-foreground">
                            <p className="font-semibold text-foreground">Welcome to Yappzy!</p>
                            <p>Yappzy is a proudly Made-in-India short and long video platform, designed for creators and users who want more than just likes — they want to grow, earn, and make an impact.</p>
                            <p>Whether you're a creator, viewer, or just exploring, Yappzy is built to deliver a seamless, secure, and exciting video experience.</p>
                        </div>

                        <div className="space-y-4">
                            <HelpInfoItem icon={Rocket} title="What You Can Do on Yappzy">
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Upload short or long videos — both are supported!</li>
                                    <li>Discover content through a smart, mood-based feed powered by AI.</li>
                                    <li>Like, comment, share, and follow your favorite creators.</li>
                                    <li>Use advanced filters and effects to make your content stand out.</li>
                                    <li>Let Yappzy’s intelligent system match your mood with viral videos.</li>
                                </ul>
                            </HelpInfoItem>

                            <HelpInfoItem icon={IndianRupee} title="Monetization Criteria">
                                <p>Yappzy supports and pays real creators. Here's how to qualify:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>10,000 followers</li>
                                    <li>5 million total valid views (from Shorts or Long videos)</li>
                                </ul>
                                <p>Once qualified:</p>
                                 <ul className="list-disc list-inside space-y-1">
                                    <li>You’ll become a <span className="text-accent">Monetized Creator</span>.</li>
                                    <li>You’ll receive monthly payouts (by the 7th or 8th) directly to your <span className="text-accent">wallet</span>.</li>
                                    <li>You’ll unlock exclusive tools, analytics, and a <span className="text-accent">verified badge</span>.</li>
                                 </ul>
                            </HelpInfoItem>

                            <HelpInfoItem icon={Shield} title="Security & Admin Controls" iconClassName="text-green-500">
                                 <ul className="list-disc list-inside space-y-1">
                                    <li>Protected by Indian laws (<span className="text-accent">IT Act 2000</span> & <span className="text-accent">Digital Data Protection Act 2023</span>)</li>
                                    <li>Real-time monitoring by AI agents and admin control panel</li>
                                    <li>Fake views, bots, or fraudulent activity are strictly blocked</li>
                                    <li>Live bug tracking and automatic system fixes</li>
                                 </ul>
                            </HelpInfoItem>
                             <HelpInfoItem icon={Award} title="Built for Bharat" iconClassName="text-yellow-400">
                                 <p>Yappzy is more than an app — it’s part of the Digital India mission. We believe in empowering local talent, building India-first technology, and giving every voice a stage.</p>
                            </HelpInfoItem>
                            
                             <HelpInfoItem icon={HelpCircle} title="Need Help?">
                                <p>If you face any issue:</p>
                                 <ul className="list-disc list-inside space-y-1">
                                    <li>Visit <span className="text-accent">Settings > Help</span></li>
                                    <li>Contact our <span className="text-accent">Support Team</span></li>
                                    <li>Browse the <span className="text-accent">in-app FAQs</span> for quick answers</li>
                                 </ul>
                            </HelpInfoItem>
                        </div>
                        
                         <div className="text-center font-bold text-lg text-destructive">
                            <p>Create. Share. Earn. Repeat.</p>
                        </div>

                        <div className="text-center text-muted-foreground text-xs">
                             <p className="text-accent">Let’s build the future of Indian entertainment, together. Jai Hind 🇮🇳</p>
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
      </header>

      <main className="flex-1 flex flex-col p-8">
        <div className="flex items-center border-b border-muted pb-2">
            <div className="flex items-center gap-2 pr-2">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className="border-0 text-lg flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 pl-2"
            />
        </div>
        <div className="flex items-center border-b border-muted pb-2 mt-4">
            <div className="flex items-center gap-2 pr-2">
                <KeyRound className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
                id="password"
                type="password"
                placeholder="Hashed Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="border-0 text-lg flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 pl-2"
            />
        </div>

        <div className="flex items-start space-x-3 mt-6 text-xs text-muted-foreground">
            <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} className="mt-0.5" />
            <label htmlFor="terms">
                I proudly accept all <span className="text-accent">terms of Yappzy</span> — a Made in India app, committed to user safety, child protection, and data privacy under Indian laws including the <span className="text-accent">IT Act 2000</span> & <span className="text-accent">Digital Personal Data Protection Act 2023</span>. Jai Hind!
            </label>
        </div>

        <Button
            onClick={handleLogin}
            className="w-full mt-8 rounded-full h-12 text-base font-semibold"
            disabled={isLoading || !agreed || !phone || !password}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Authentication and login
        </Button>

        <div className="text-center mt-4">
          <Link href="/forgot-password" className="text-sm text-destructive hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">Other login methods</p>
            <div className="flex justify-center items-center gap-6 mt-4">
                 <Button variant="outline" size="icon" className="rounded-full h-11 w-11" onClick={() => handleSocialLogin('google')}>
                    <GoogleIcon className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-11 w-11" onClick={() => handleSocialLogin('facebook')}>
                    <FacebookIcon className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-11 w-11" onClick={() => handleSocialLogin('instagram')}>
                    <InstagramIcon className="h-5 w-5" />
                </Button>
            </div>
        </div>
      </main>

      <footer className="p-8 text-center text-sm text-muted-foreground">
        <p>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
      </footer>
    </div>
  );
}
