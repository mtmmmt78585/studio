import Link from "next/link";
import { Bell, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
      <Link href="/feed" aria-label="Home">
        <Logo className="text-2xl" />
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Link href="/dm">
          <Button variant="ghost" size="icon">
            <Send className="h-6 w-6" />
            <span className="sr-only">Messages</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
