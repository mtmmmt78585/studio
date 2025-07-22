
'use client';

import { chats, mainUser } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical, Video, Phone, Smile, Paperclip, Mic, CheckCheck, Camera, IndianRupee, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";

const VoiceMessagePlayer = ({ message }: { message: any }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const waveform = Array.from({ length: 30 }).map(() => Math.random() * 0.8 + 0.2);

    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src={message.sender === 'me' ? mainUser.avatar : chats.find(c => c.messages.some(m => m.id === message.id))?.user.avatar} />
                <AvatarFallback>{message.sender.slice(0,2)}</AvatarFallback>
            </Avatar>
            <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="h-6 w-6 text-white bg-blue-500 rounded-full p-1" /> : <Play className="h-6 w-6 text-blue-500" />}
            </button>
            <div className="flex items-center gap-0.5 h-6">
                 {waveform.map((h, i) => (
                    <div key={i} className="w-0.5 bg-muted-foreground/50 rounded-full" style={{ height: `${h * 100}%` }}/>
                 ))}
                 <div className="w-2 h-2 rounded-full bg-blue-500 ml-1" />
            </div>
             <p className="text-xs text-muted-foreground ml-2">{message.audio.duration}</p>
        </div>
    )
}

export default function ChatDetailPage() {
    const router = useRouter();
    const params = useParams();
    const chatId = params.chatId as string;
    const selectedChat = chats.find(c => c.id === chatId);

    if (!selectedChat) {
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <p>Chat not found.</p>
                <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
            </div>
        )
    }

    return (
        <div className="h-dvh flex flex-col bg-card">
            <div className="relative h-full w-full">
                <Image 
                    src="https://placehold.co/800x1200.png"
                    alt="Chat background"
                    fill
                    className="object-cover opacity-10 dark:opacity-[0.07]"
                    data-ai-hint="chat background pattern"
                />
            </div>
            <div className="absolute inset-0 flex flex-col">
                <header className="p-3 border-b flex items-center justify-between bg-background/80 backdrop-blur-sm">
                   <div className="flex items-center gap-3">
                     <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}><ArrowLeft className="h-6 w-6"/></Button>
                     <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedChat.user.avatar} />
                        <AvatarFallback>{selectedChat.user.username.slice(0,2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">{selectedChat.user.username}</p>
                        <p className="text-xs text-muted-foreground">last seen today at 7:16 pm</p>
                    </div>
                   </div>
                   <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full"><Video className="h-5 w-5"/></Button>
                        <Button variant="ghost" size="icon" className="rounded-full"><Phone className="h-5 w-5"/></Button>
                        <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5"/></Button>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="relative text-center my-4">
                        <Separator className="bg-muted-foreground/20" />
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-muted px-2 text-xs text-muted-foreground rounded-md shadow-sm">TODAY</span>
                    </div>
                    {selectedChat.messages.map(message => (
                        <div key={message.id} className={cn("flex items-end gap-2 w-full", message.sender === 'me' ? 'justify-end' : 'justify-start')}>
                            <div className={cn("max-w-[70%] p-2 px-3 rounded-xl text-sm shadow-md", 
                                message.sender === 'me' ? 'bg-[#dcf8c6] dark:bg-[#075e54] text-foreground rounded-br-none' : 'bg-background text-foreground rounded-bl-none'
                            )}>
                                {message.type === 'text' ? (
                                    <p className="leading-snug">{message.text}</p>
                                ) : (
                                    <VoiceMessagePlayer message={message} />
                                )}
                                <div className="flex items-center justify-end gap-1 mt-1">
                                    <p className={cn("text-xs",  message.sender === 'me' ? 'text-muted-foreground/80' : 'text-muted-foreground' )}>{message.timestamp}</p>
                                    {message.sender === 'me' && <CheckCheck className="h-4 w-4 text-blue-500" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <footer className="p-2 flex items-center gap-2">
                    <div className="flex-1 flex items-center bg-background rounded-full p-1 shadow-md">
                        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                            <Smile />
                        </Button>
                        <Input placeholder="Message" className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                            <Paperclip />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                            <IndianRupee />
                        </Button>
                         <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                            <Camera />
                        </Button>
                    </div>
                    <Button size="icon" className="rounded-full h-12 w-12 bg-green-600 hover:bg-green-700">
                        <Mic className="h-6 w-6"/>
                    </Button>
                </footer>
            </div>
        </div>
      );
}
