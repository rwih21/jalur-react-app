import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Sparkles,
  Compass,
  Target,
  Briefcase,
  Users,
  Send,
  Video,
  CircleUser,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo/jalur-logo-dark.png";
import {
  Avatar,
  AvatarFallback,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "../ui";

const nav = [
  { id: "", label: "Home", path: "/app", icon: Home },
  {
    id: "dna",
    label: "Career DNA",
    path: "/app/dna",
    icon: Sparkles,
    end: true,
  },
  {
    id: "careers",
    label: "Find Your Jalur",
    path: "/app/careers",
    icon: Compass,
  },
  { id: "roadmap", label: "Roadmap", path: "/app/roadmap", icon: Target },
  { id: "jobs", label: "Opportunities", path: "/app/jobs", icon: Briefcase },
  { id: "network", label: "JALUR Network", path: "/app/network", icon: Users },
  { id: "copilot", label: "Career Copilot", path: "/app/copilot", icon: Send },
  {
    id: "interview",
    label: "AI Video Interview",
    path: "/app/interview",
    icon: Video,
  },
  { id: "profile", label: "Profile", path: "/app/profile", icon: CircleUser },
];

export default function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (item) =>
    item.path === "/app" ? pathname === "/app" : pathname.startsWith(item.path);

  const current = nav.find((x) => isActive(x));

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            onClick={() => navigate("/app")}
          >
            <div className="flex aspect-square size-10 items-center justify-center overflow-hidden rounded-lg bg-primary/10 transition-[width,height] duration-200 ease-linear group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:rounded-md">
              <img
                src={logo}
                alt="Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="font-bold tracking-tight">JALUR</span>
              <span className="text-sidebar-foreground/60 truncate text-xs">
                Career Platform
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive(item)}
                      tooltip={item.label}
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                onClick={() => navigate("/app/profile")}
                tooltip={user?.name}
              >
                <Avatar className="size-6 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary-dark">
                    {user?.name
                      ?.split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user?.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Log out" onClick={handleLogout}>
                <LogOut />
                <span>Log out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <nav className="text-sm font-medium">
            <span className="text-muted-foreground">JALUR</span>
            <span className="text-muted-foreground"> / </span>
            <span>{current?.label || "Home"}</span>
          </nav>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
