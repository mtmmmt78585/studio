
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notifications, users } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function NotificationsPage() {

    const getNotificationText = (notification: typeof notifications[0]) => {
        switch(notification.type) {
            case 'like':
                return <>liked your video.</>
            case 'comment':
                return <>commented: "This is awesome!"</>
            case 'follow':
                return <>started following you.</>
            case 'mention':
                return <>mentioned you in a comment.</>
            default:
                return null;
        }
    }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold font-headline">Notifications</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {notifications.map((notification) => (
          <div key={notification.id} className={cn("flex items-center gap-3 p-4 border-b", !notification.read && "bg-primary/5")}>
             <Link href={`/profile?id=${notification.user.id}`}>
                <Avatar className="h-10 w-10">
                    <AvatarImage src={notification.user.avatar} />
                    <AvatarFallback>{notification.user.username.slice(0, 2)}</AvatarFallback>
                </Avatar>
            </Link>
            <p className="flex-1 text-sm">
                <Link href={`/profile?id=${notification.user.id}`} className="font-bold">{notification.user.username}</Link>
                {' '}
                {getNotificationText(notification)}
                <span className="text-muted-foreground"> {notification.timestamp}</span>
            </p>
            {notification.postImageUrl && (
                <div className="relative h-12 w-12 rounded-md overflow-hidden">
                    <Image src={notification.postImageUrl} alt="Post image" fill className="object-cover" data-ai-hint="social media content" />
                </div>
            )}
            {notification.type === 'follow' && (
                 <button className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded-md">Follow</button>
            )}
          </div>
        ))}
        {notifications.length === 0 && <p className="text-center text-muted-foreground p-8">No notifications yet.</p>}
      </div>
    </div>
  );
}
