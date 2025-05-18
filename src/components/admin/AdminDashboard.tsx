import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, CreditCard, BarChart3, ToggleLeft, Puzzle } from "lucide-react";

const AdminDashboard = () => {
  const adminModules = [
    {
      title: "User Management",
      description: "Manage users and super admin permissions",
      icon: <Users className="h-8 w-8" />,
      path: "/admin/users",
    },
    {
      title: "Subscription Plans",
      description: "Configure and manage subscription plans",
      icon: <CreditCard className="h-8 w-8" />,
      path: "/admin/subscriptions",
    },
    {
      title: "Platform Analytics",
      description: "View platform usage and growth metrics",
      icon: <BarChart3 className="h-8 w-8" />,
      path: "/admin/analytics",
    },
    {
      title: "Feature Flags",
      description: "Control platform-wide feature availability",
      icon: <ToggleLeft className="h-8 w-8" />,
      path: "/admin/features",
    },
    {
      title: "Future Plugins",
      description: "Manage and configure platform plugins",
      icon: <Puzzle className="h-8 w-8" />,
      path: "/admin/plugins",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your platform settings, users, and subscriptions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {adminModules.map((module) => (
          <Card key={module.path} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{module.title}</CardTitle>
                <div className="text-primary">{module.icon}</div>
              </div>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to={module.path}>Manage</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
