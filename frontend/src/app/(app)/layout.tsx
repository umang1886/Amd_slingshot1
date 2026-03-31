import { Navigation } from "@/components/Navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="flex-1 w-full pb-20 md:pb-0 overflow-x-hidden">
        <div className="container mx-auto p-4 md:p-8 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
