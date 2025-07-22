
import { chats, mainUser } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CornerDownLeft, Search, Camera, MoreVertical, Check, Mic, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";


const getLastMessageIcon = (lastMessage: string) => {
    if (lastMessage.startsWith("Video")) return <Video className="h-4 w-4 mr-1 inline-block" />;
    if (lastMessage.startsWith("Voice message")) return <Mic className="h-4 w-4 mr-1 inline-block" />;
    if (lastMessage.startsWith("You:") || lastMessage.startsWith("Them:")) return <Check className="h-4 w-4 mr-1 inline-block text-blue-500" />;
    return null;
}
const getLastMessageText = (lastMessage: string) => {
    if (lastMessage.startsWith("Video")) return "Video";
    if (lastMessage.startsWith("Voice message")) return "Voice message";
    return lastMessage.split(": ")[1] || lastMessage;
}


export default function DMPage() {
    const selectedChat = chats[0];
  return (
    <div className="h-full flex flex-col md:flex-row">
        {/* Chat List */}
        <div className="md:w-1/3 border-r flex flex-col">
            <header className="p-4 border-b flex items-center justify-between">
                <h1 className="font-bold text-2xl font-headline text-primary">Messages</h1>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Camera className="h-5 w-5"/></Button>
                    <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5"/></Button>
                </div>
            </header>
             <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search" className="pl-8 rounded-full bg-card" />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {chats.map(chat => (
                    <Link href="#" key={chat.id}>
                        <div  className={cn("flex items-center gap-3 p-3 cursor-pointer hover:bg-card/50", chat.id === selectedChat.id ? 'bg-card' : '')}>
                            <Avatar className="h-14 w-14">
                                <AvatarImage src={chat.user.avatar} />
                                <AvatarFallback>{chat.user.username.slice(0,2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{chat.user.username}</p>
                                <p className="text-sm text-muted-foreground truncate flex items-center">
                                    {getLastMessageIcon(chat.lastMessage)}
                                    {getLastMessageText(chat.lastMessage)}
                                </p>
                            </div>
                            <div className="text-right space-y-1">
                                 <p className={cn("text-xs", chat.unreadCount > 0 ? 'text-green-500 font-semibold' : 'text-muted-foreground' )}>{chat.lastMessageTime}</p>
                                 {chat.unreadCount > 0 && <Badge className="bg-green-500 hover:bg-green-600 text-white rounded-full h-6 w-6 flex items-center justify-center">{chat.unreadCount}</Badge>}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-card">
            <div className="p-4 border-b flex items-center gap-3">
                 <Avatar>
                    <AvatarImage src={selectedChat.user.avatar} />
                    <AvatarFallback>{selectedChat.user.username.slice(0,2)}</AvatarFallback>
                </Avatar>
                <h2 className="font-semibold">{selectedChat.user.username}</h2>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-background/50">
                {selectedChat.messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.sender === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'}`}>
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t">
                 <div className="relative">
                    <Input placeholder={`Message ${selectedChat.user.username}...`} className="pr-12" />
                    <Button size="icon" variant="ghost" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8">
                        <CornerDownLeft className="h-5 w-5"/>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
}
