import React from "react";
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
  { id: "home", label: "Home", icon: Home },
  { id: "dna", label: "Career DNA", icon: Sparkles },
  { id: "careers", label: "Find Your Jalur", icon: Compass },
  { id: "roadmap", label: "Roadmap", icon: Target },
  { id: "jobs", label: "Opportunities", icon: Briefcase },
  { id: "network", label: "JALUR Network", icon: Users },
  { id: "copilot", label: "Career Copilot", icon: Send },
  { id: "interview", label: "AI Video Interview", icon: Video },
  { id: "profile", label: "Profile", icon: CircleUser },
];

export default function AppShell({ page, setPage, children }) {
  const { user, logout } = useAuth();
  const current = nav.find((x) => x.id === page);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Compass className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
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
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={page === item.id}
                      tooltip={item.label}
                      onClick={() => setPage(item.id)}
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
                onClick={() => setPage("profile")}
                tooltip={user?.name}
              >
                <Avatar className="size-6 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
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
              <SidebarMenuButton tooltip="Log out" onClick={logout}>
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
            {current && <span className="text-muted-foreground">JALUR</span>}
            <span className="text-muted-foreground"> / </span>
            <span>{current?.label || "Home"}</span>
          </nav>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}