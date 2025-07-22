// src/app/(aux)/terms/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-semibold">Terms & Privacy</h1>
                <div className="w-10"></div>
            </header>
            
            <main className="flex-1">
                <ScrollArea className="h-[calc(100vh-65px)]">
                    <div className="prose prose-sm dark:prose-invert p-6 max-w-none">
                        <div className="flex items-center gap-2 text-primary mb-4">
                            <FileText className="h-6 w-6" />
                            <h2 className="text-2xl font-bold font-headline m-0">Terms of Service</h2>
                        </div>
                        <p className="text-muted-foreground">Last updated: July 26, 2024</p>
                        
                        <h3>1. Introduction</h3>
                        <p>Welcome to Yappzy! These Terms of Service ("Terms") govern your use of the Yappzy mobile application and services ("Service"), provided by Yappzy India Pvt. Ltd. By using our Service, you agree to be bound by these Terms.</p>

                        <h3>2. User Accounts</h3>
                        <p>You must be at least 13 years old to create an account. You are responsible for safeguarding your account and for all activities that occur under it. You agree to provide accurate and complete information when creating your account.</p>

                        <h3>3. Content</h3>
                        <p>You retain ownership of the content you post, but you grant Yappzy a worldwide, royalty-free license to use, reproduce, modify, and display it in connection with the Service. You are responsible for the content you post and must ensure it does not violate our Community Guidelines or any applicable laws, including the IT Act, 2000 and the Digital Personal Data Protection Act, 2023.</p>
                        
                        <h3>4. Community Guidelines</h3>
                        <p>We prohibit content that is illegal, hateful, harassing, sexually explicit, or promotes violence or self-harm. We reserve the right to remove any content and terminate accounts that violate these guidelines.</p>

                        <div className="flex items-center gap-2 text-primary my-6">
                            <FileText className="h-6 w-6" />
                            <h2 className="text-2xl font-bold font-headline m-0">Privacy Policy</h2>
                        </div>
                        
                        <h3>1. Information We Collect</h3>
                        <p>We collect information you provide to us, such as your phone number and profile information. We also collect data about your use of the Service, including content you watch, like, and comment on, and device information.</p>
                        
                        <h3>2. How We Use Your Information</h3>
                        <p>We use your information to provide and improve the Service, personalize your experience, communicate with you, and for security and safety purposes. Our data handling practices are in compliance with Indian law, including the Digital Personal Data Protection Act, 2023.</p>

                        <h3>3. Data Sharing</h3>
                        <p>We do not sell your personal data. We may share your data with third-party service providers who assist us in operating the Service, or if required by law.</p>

                        <h3>4. Contact Us</h3>
                        <p>If you have any questions about these Terms or our Privacy Policy, please contact us at <a href="mailto:legal@yappzy.com" className="text-accent">legal@yappzy.com</a>.</p>
                    </div>
                </ScrollArea>
            </main>
        </div>
    );
}

    