import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  PenTool,
  Calendar,
  MessageSquare,
  BarChart3,
  Link2,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ collapsed = false, onToggle = () => {} }: SidebarProps) => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: PenTool, label: "Content Hub", path: "/content-hub" },
    { icon: Calendar, label: "Scheduling", path: "/scheduling" },
    { icon: MessageSquare, label: "Engagement", path: "/engagement" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Link2, label: "Integrations", path: "/integrations" },
  ];

  const bottomNavItems = [
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background border-r border-border transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[280px]",
      )}
    >
      {/* Logo and collapse button */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">FB</span>
            </div>
            <span className="font-semibold">FB Page Assistant</span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold">FB</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={collapsed ? "mx-auto" : ""}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <TooltipProvider
                delayDuration={0}
                disableHoverableContent={!collapsed}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                        "group w-full",
                      )}
                    >
                      <item.icon size={20} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom navigation */}
      <div className="mt-auto border-t border-border py-4">
        <ul className="space-y-1 px-2">
          {bottomNavItems.map((item, index) => (
            <li key={index}>
              <TooltipProvider
                delayDuration={0}
                disableHoverableContent={!collapsed}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                        "group w-full",
                      )}
                    >
                      <item.icon size={20} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>

        {/* User profile */}
        <div className="px-3 mt-4">
          <TooltipProvider
            delayDuration={0}
            disableHoverableContent={!collapsed}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors cursor-pointer",
                    collapsed ? "justify-center" : "justify-between",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Jane Doe</span>
                        <span className="text-xs text-muted-foreground">
                          Admin
                        </span>
                      </div>
                    )}
                  </div>
                  {!collapsed && (
                    <Button variant="ghost" size="icon">
                      <LogOut size={18} />
                    </Button>
                  )}
                </div>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  <div>
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-xs text-muted-foreground">Admin</p>
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
