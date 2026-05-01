// Pathless layout for authenticated app routes — applies sidebar + auth guard.
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { authService } from "@/services/authService";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (!authService.getSession()) {
      throw redirect({ to: "/login" });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b border-border bg-background/80 px-4 backdrop-blur">
            <SidebarTrigger />
            <div className="ml-auto text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
        <Toaster richColors position="top-right" />
      </div>
    </SidebarProvider>
  );
}
