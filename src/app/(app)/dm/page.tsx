
import { chats } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Camera, MoreVertical, Check, Mic, Video, MessageSquarePlus, CheckCheck, Verified } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const getLastMessageIcon = (lastMessage: string, isRead: boolean) => {
    if (lastMessage.startsWith("Video")) return <Video className="h-4 w-4 mr-1 inline-block" />;
    if (lastMessage.startsWith("Voice message")) return <Mic className="h-4 w-4 mr-1 inline-block" />;
    if (lastMessage.startsWith("You:") || lastMessage.startsWith("Them:")) {
        return isRead ? <CheckCheck className="h-4 w-4 mr-1 inline-block text-blue-500" /> : <Check className="h-4 w-4 mr-1 inline-block" />
    }
    return null;
}

const getLastMessageText = (lastMessage: string) => {
    if (lastMessage.startsWith("Video")) return "Video";
    if (lastMessage.startsWith("Voice message")) return "Voice message";
    return lastMessage.split(": ")[1] || lastMessage;
}

export default function DMPage() {
    const unreadChats = chats.filter(c => c.unreadCount > 0);
    const readChats = chats.filter(c => c.unreadCount === 0);

  return (
    <div className="h-full flex flex-col relative">
        <header className="p-4 border-b flex items-center justify-between">
            <h1 className="font-bold text-2xl font-headline text-primary">Messages</h1>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon"><Camera className="h-5 w-5"/></Button>
                <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5"/></Button>
            </div>
        </header>
         <div className="p-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search or start new chat..." className="pl-10 h-12 rounded-full bg-card" />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto">
            {unreadChats.length > 0 && (
                 <div className="px-4 py-1">
                    <p className="text-sm font-semibold text-green-500">UNREAD</p>
                </div>
            )}
            {unreadChats.map(chat => (
                <Link href={`/dm/${chat.id}`} key={chat.id} className="block">
                    <div className={cn("flex items-center gap-4 p-3 cursor-pointer hover:bg-card/50")}>
                        <Avatar className="h-14 w-14">
                            <AvatarImage src={chat.user.avatar} />
                            <AvatarFallback>{chat.user.username.slice(0,2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-1">
                                <p className="font-semibold">{chat.user.username}</p>
                                {chat.user.isVerified && <Verified className="h-4 w-4 text-primary fill-current" />}
                            </div>
                            <p className="text-sm text-muted-foreground truncate flex items-center">
                                {getLastMessageIcon(chat.lastMessage, false)}
                                {getLastMessageText(chat.lastMessage)}
                            </p>
                        </div>
                        <div className="text-right space-y-1">
                             <p className={cn("text-xs font-semibold", chat.unreadCount > 0 ? 'text-green-500' : 'text-muted-foreground' )}>{chat.lastMessageTime}</p>
                             {chat.unreadCount > 0 && <Badge className="bg-green-500 hover:bg-green-600 text-white rounded-full h-6 w-6 flex items-center justify-center">{chat.unreadCount}</Badge>}
                        </div>
                    </div>
                </Link>
            ))}
            
             {readChats.length > 0 && (
                 <div className="px-4 py-1 mt-2">
                    <p className="text-sm font-semibold text-muted-foreground">CHATS</p>
                </div>
            )}
            {readChats.map(chat => (
                <Link href={`/dm/${chat.id}`} key={chat.id} className="block">
                     <div  className={cn("flex items-center gap-4 p-3 cursor-pointer hover:bg-card/50")}>
                        <Avatar className="h-14 w-14">
                            <AvatarImage src={chat.user.avatar} />
                            <AvatarFallback>{chat.user.username.slice(0,2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-1">
                                <p className="font-semibold">{chat.user.username}</p>
                                 {chat.user.isVerified && <Verified className="h-4 w-4 text-primary fill-current" />}
                            </div>
                            <p className="text-sm text-muted-foreground truncate flex items-center">
                                {getLastMessageIcon(chat.lastMessage, true)}
                                {getLastMessageText(chat.lastMessage)}
                            </p>
                        </div>
                         <p className="text-xs text-muted-foreground">{chat.lastMessageTime}</p>
                    </div>
                </Link>
            ))}
        </div>
         <Button className="absolute bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-green-500 hover:bg-green-600">
            <MessageSquarePlus className="h-7 w-7"/>
         </Button>
    </div>
  );
}
