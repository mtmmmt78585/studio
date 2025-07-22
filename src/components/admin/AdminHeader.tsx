import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export function AdminHeader() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 z-50">
      <Logo />
      <h1 className="flex-1 text-xl font-semibold font-headline tracking-wider text-center">Admin Control</h1>
      <Button variant="outline" size="icon" asChild>
        <Link href="/">
          <Home className="h-4 w-4" />
          <span className="sr-only">Back to App</span>
        </Link>
      </Button>
    </header>
  );
}
