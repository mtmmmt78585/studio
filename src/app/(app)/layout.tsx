import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh flex flex-col">
      <AppHeader />
      <main className="flex-1 overflow-y-auto pb-16">{children}</main>
      <BottomNav />
    </div>
  );
}
