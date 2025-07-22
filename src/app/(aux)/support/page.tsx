// src/app/(aux)/support/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, LifeBuoy, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SupportPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject || !message) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out both subject and message.',
            });
            return;
        }
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            toast({
                title: 'Message Sent!',
                description: 'Our support team will get back to you shortly.',
            });
            setSubject("");
            setMessage("");
        }, 1500);
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-semibold">Support</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md text-center">
                    <LifeBuoy className="h-16 w-16 mx-auto text-primary mb-4" />
                    <h2 className="text-2xl font-bold mb-2">How can we help?</h2>
                    <p className="text-muted-foreground mb-8">
                        Contact our support team for any issues or questions. We're here to help!
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                        <Input 
                            placeholder="Subject" 
                            value={subject} 
                            onChange={(e) => setSubject(e.target.value)}
                            disabled={isSubmitting}
                        />
                        <Textarea 
                            placeholder="Describe your issue..." 
                            rows={6}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={isSubmitting}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            <Send className="mr-2 h-4 w-4" />
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                    </form>

                    <div className="mt-8 text-sm text-muted-foreground">
                        <p>You can also email us directly at <a href="mailto:support@yappzy.com" className="text-accent underline">support@yappzy.com</a></p>
                    </div>
                </div>
            </main>
        </div>
    );
}

    