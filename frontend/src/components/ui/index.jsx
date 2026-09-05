import React from "react";
import { cn } from "@/lib/utils";

export { cn };

export {
  Button,
  buttonVariants,
} from "./button";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card";
export { Progress } from "./progress";
export { Badge, badgeVariants } from "./badge";
export { Input } from "./input";
export { Label } from "./label";
export { Separator } from "./separator";
export { Skeleton } from "./skeleton";
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./sheet";
export { Avatar, AvatarImage, AvatarFallback } from "./avatar";
export { Checkbox } from "./checkbox";
export { Alert, AlertTitle, AlertDescription } from "./alert";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./sidebar";

function cx(...inputs) {
  return cn(...inputs);
}

export function Header({ title, sub, action }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        <p className="mt-1 text-muted-foreground">{sub}</p>
      </div>
      {action}
    </div>
  );
}

export function Pill({ children, active, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex size-auto h-9 shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}