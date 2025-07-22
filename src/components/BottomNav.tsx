
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusSquare, User, Bell, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/feed", icon: Home, label: "Home" },
  { href: "/explore", icon: Search, label: "Explore" },
  { href: "/upload", icon: PlusSquare, label: "Upload" },
  { href: "/dm", icon: MessageSquare, label: "Messages" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 z-20 w-full border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          if (item.href === "/upload") {
            return (
               <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 text-xs -mt-2">
                 <div className="bg-primary text-primary-foreground p-3 rounded-xl">
                    <item.icon className="h-6 w-6" strokeWidth={2.5}/>
                 </div>
              </Link>
            )
          }
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 text-xs">
              <item.icon className={cn("h-6 w-6 text-muted-foreground", isActive && "text-primary")} strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn("font-medium text-muted-foreground", isActive && "text-primary")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
