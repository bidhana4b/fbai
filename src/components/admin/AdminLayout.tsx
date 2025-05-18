import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Users,
  CreditCard,
  BarChart3,
  Settings,
  ToggleLeft,
  Home,
  Puzzle,
} from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <Home className="h-5 w-5" /> },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Subscriptions",
      path: "/admin/subscriptions",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Feature Flags",
      path: "/admin/features",
      icon: <ToggleLeft className="h-5 w-5" />,
    },
    {
      name: "Future Plugins",
      path: "/admin/plugins",
      icon: <Puzzle className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="px-4 pb-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
