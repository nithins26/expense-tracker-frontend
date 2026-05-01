import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, PlusCircle, BarChart3, Users, LogOut, Wallet, Moon, Sun } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { authService, useAuth, useTheme } from "@/services/authService";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Add Expense", url: "/expenses", icon: PlusCircle },
  { title: "Monthly Report", url: "/report", icon: BarChart3 },
  { title: "Borrow / Lending", url: "/lending", icon: Users },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggle } = useTheme();

  const handleLogout = () => {
    authService.logout();
    navigate({ to: "/login" });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg text-primary-foreground shadow-md"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Wallet className="h-5 w-5" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">Expense Tracker</span>
            <span className="text-xs text-muted-foreground">@{user?.username}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex flex-col gap-1 p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggle}
            className="justify-start gap-2"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="group-data-[collapsible=icon]:hidden">
              {theme === "light" ? "Dark mode" : "Light mode"}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="justify-start gap-2 text-destructive hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
