import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  UserPlus,
  Shield,
  Settings,
  Key,
  Lock,
  Building,
  CreditCard,
  Layers,
  UserCog,
  CheckCircle2,
  AlertCircle,
  Clock,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Save,
  Mail,
  RefreshCw,
  ArrowUpRight,
  Database,
  ServerCog,
  Globe,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "page_user" | "editor" | "analyst" | "support";
  status: "active" | "pending" | "suspended";
  avatar?: string;
  workspaces?: number;
  lastActive?: string;
}

interface Workspace {
  id: string;
  name: string;
  owner: string;
  pages: number;
  members: number;
  plan: "free" | "basic" | "pro" | "business";
  status: "active" | "trial" | "expired";
  createdAt: string;
}

interface Feature {
  id: string;
  name: string;
  description: string;
  basicPlan: boolean;
  proPlan: boolean;
  businessPlan: boolean;
  status: "active" | "beta" | "coming_soon";
}

const SaasTransformation = () => {
  const [activeTab, setActiveTab] = useState("user-management");

  // Mock data for users
  const users: User[] = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "super_admin",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      workspaces: 0,
      lastActive: "Today at 10:30 AM",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@company.com",
      role: "page_user",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      workspaces: 2,
      lastActive: "Yesterday at 3:45 PM",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@agency.com",
      role: "page_user",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
      workspaces: 1,
      lastActive: "May 15, 2023 at 9:20 AM",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah@design.co",
      role: "editor",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      workspaces: 1,
      lastActive: "May 14, 2023 at 2:10 PM",
    },
    {
      id: "5",
      name: "Mike Davis",
      email: "mike@marketing.io",
      role: "analyst",
      status: "pending",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      workspaces: 1,
      lastActive: "Never",
    },
    {
      id: "6",
      name: "Lisa Brown",
      email: "lisa@social.net",
      role: "support",
      status: "suspended",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      workspaces: 1,
      lastActive: "April 30, 2023 at 11:45 AM",
    },
  ];

  // Mock data for workspaces
  const workspaces: Workspace[] = [
    {
      id: "1",
      name: "Marketing Agency HQ",
      owner: "Jane Smith",
      pages: 5,
      members: 8,
      plan: "business",
      status: "active",
      createdAt: "Jan 15, 2023",
    },
    {
      id: "2",
      name: "Eco Products Store",
      owner: "Jane Smith",
      pages: 2,
      members: 3,
      plan: "pro",
      status: "active",
      createdAt: "Mar 22, 2023",
    },
    {
      id: "3",
      name: "Bob's Consulting",
      owner: "Bob Johnson",
      pages: 1,
      members: 4,
      plan: "basic",
      status: "trial",
      createdAt: "May 10, 2023",
    },
    {
      id: "4",
      name: "Local Coffee Shop",
      owner: "Sarah Williams",
      pages: 1,
      members: 2,
      plan: "free",
      status: "expired",
      createdAt: "Feb 5, 2023",
    },
  ];

  // Mock data for features
  const features: Feature[] = [
    {
      id: "1",
      name: "Content Creation Hub",
      description: "AI-powered caption generator and image creator",
      basicPlan: true,
      proPlan: true,
      businessPlan: true,
      status: "active",
    },
    {
      id: "2",
      name: "Scheduling Calendar",
      description: "Visual drag-and-drop interface for planning posts",
      basicPlan: true,
      proPlan: true,
      businessPlan: true,
      status: "active",
    },
    {
      id: "3",
      name: "Basic Analytics",
      description: "Simple performance metrics and reports",
      basicPlan: true,
      proPlan: true,
      businessPlan: true,
      status: "active",
    },
    {
      id: "4",
      name: "Advanced Analytics",
      description: "Detailed metrics with AI-generated suggestions",
      basicPlan: false,
      proPlan: true,
      businessPlan: true,
      status: "active",
    },
    {
      id: "5",
      name: "Engagement Dashboard",
      description: "Chatbot builder with response templates",
      basicPlan: false,
      proPlan: true,
      businessPlan: true,
      status: "active",
    },
    {
      id: "6",
      name: "Dynamic Enhancements",
      description: "Trend suggestions and competitor analysis",
      basicPlan: false,
      proPlan: false,
      businessPlan: true,
      status: "active",
    },
    {
      id: "7",
      name: "Team Collaboration",
      description: "Multiple team members with role-based access",
      basicPlan: false,
      proPlan: true,
      businessPlan: true,
      status: "active",
    },
    {
      id: "8",
      name: "White Labeling",
      description: "Custom branding for client-facing dashboards",
      basicPlan: false,
      proPlan: false,
      businessPlan: true,
      status: "beta",
    },
    {
      id: "9",
      name: "API Access",
      description: "Programmatic access to platform features",
      basicPlan: false,
      proPlan: false,
      businessPlan: true,
      status: "coming_soon",
    },
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return (
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
            <Shield className="h-3 w-3 mr-1" /> Super Admin
          </Badge>
        );
      case "page_user":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            <Building className="h-3 w-3 mr-1" /> Page User
          </Badge>
        );
      case "editor":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <Edit className="h-3 w-3 mr-1" /> Editor
          </Badge>
        );
      case "analyst":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
            <BarChart2 className="h-3 w-3 mr-1" /> Analyst
          </Badge>
        );
      case "support":
        return (
          <Badge className="bg-sky-100 text-sky-700 border-sky-200">
            <MessageSquare className="h-3 w-3 mr-1" /> Support
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (
    status:
      | "active"
      | "pending"
      | "suspended"
      | "trial"
      | "expired"
      | "beta"
      | "coming_soon",
  ) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" /> Active
          </Badge>
        );
      case "pending":
      case "trial":
      case "beta":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            <Clock className="h-3 w-3 mr-1" />{" "}
            {status === "pending"
              ? "Pending"
              : status === "trial"
                ? "Trial"
                : "Beta"}
          </Badge>
        );
      case "suspended":
      case "expired":
      case "coming_soon":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            <AlertCircle className="h-3 w-3 mr-1" />{" "}
            {status === "suspended"
              ? "Suspended"
              : status === "expired"
                ? "Expired"
                : "Coming Soon"}
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPlanBadge = (plan: "free" | "basic" | "pro" | "business") => {
    switch (plan) {
      case "free":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200"
          >
            Free
          </Badge>
        );
      case "basic":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Basic
          </Badge>
        );
      case "pro":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            Professional
          </Badge>
        );
      case "business":
        return (
          <Badge
            variant="outline"
            className="bg-indigo-50 text-indigo-700 border-indigo-200"
          >
            Business
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">SaaS System Transformation</h1>
          <p className="text-muted-foreground">
            Manage users, workspaces, and platform features for multi-tenant
            SaaS
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="user-management"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="user-management" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger
            value="workspace-management"
            className="flex items-center"
          >
            <Building className="h-4 w-4 mr-2" />
            Workspace Management
          </TabsTrigger>
          <TabsTrigger value="feature-management" className="flex items-center">
            <Layers className="h-4 w-4 mr-2" />
            Feature Management
          </TabsTrigger>
          <TabsTrigger value="system-settings" className="flex items-center">
            <ServerCog className="h-4 w-4 mr-2" />
            System Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user-management" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage users and their roles across the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Search users..."
                          className="max-w-sm"
                        />
                        <Button variant="outline">
                          <Filter className="h-4 w-4 mr-2" /> Filter
                        </Button>
                      </div>
                      <Button>
                        <UserPlus className="h-4 w-4 mr-2" /> Add User
                      </Button>
                    </div>

                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="p-3 text-left">User</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Workspaces</th>
                            <th className="p-3 text-left">Last Active</th>
                            <th className="p-3 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id} className="border-t">
                              <td className="p-3">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>
                                      {user.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {user.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">{getRoleBadge(user.role)}</td>
                              <td className="p-3">
                                {getStatusBadge(user.status)}
                              </td>
                              <td className="p-3">{user.workspaces}</td>
                              <td className="p-3">{user.lastActive}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Key className="h-4 w-4" />
                                  </Button>
                                  {user.status !== "suspended" ? (
                                    <Button variant="ghost" size="sm">
                                      <Lock className="h-4 w-4" />
                                    </Button>
                                  ) : (
                                    <Button variant="ghost" size="sm">
                                      <RefreshCw className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {users.length} of {users.length} users
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Role Management</CardTitle>
                  <CardDescription>
                    Configure permissions for each role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Super Admin</h3>
                          <Shield className="h-5 w-5 text-purple-600" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Platform owners with full system access
                        </p>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Manage All Users</Label>
                            <Switch checked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">
                              Manage Subscriptions
                            </Label>
                            <Switch checked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">
                              Platform-wide Analytics
                            </Label>
                            <Switch checked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">
                              Enable/Disable Features
                            </Label>
                            <Switch checked disabled />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Page User (Client)</h3>
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Users who manage their own Facebook pages
                        </p>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">
                              Connect Facebook Pages
                            </Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">
                              Use Content Creation Hub
                            </Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">
                              Invite Team Members
                            </Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">
                              Access Billing & Plans
                            </Label>
                            <Switch checked />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Editor</h3>
                          <Edit className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Team members who can create and publish content
                        </p>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">
                              Create & Edit Content
                            </Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Schedule Posts</Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">View Analytics</Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">
                              Manage Team Members
                            </Label>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Analyst</h3>
                          <BarChart2 className="h-5 w-5 text-amber-600" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Team members focused on analytics and reporting
                        </p>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">
                              View & Export Analytics
                            </Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Generate Reports</Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">
                              View Content & Calendar
                            </Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Edit Content</Label>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Support</h3>
                          <MessageSquare className="h-5 w-5 text-sky-600" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Team members handling engagement and messages
                        </p>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Reply to Comments</Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">
                              Handle Inbox Messages
                            </Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">
                              View Content & Calendar
                            </Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Edit Content</Label>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Save className="h-4 w-4 mr-2" /> Save Role Configuration
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Onboarding Flow</CardTitle>
              <CardDescription>
                Configure the user registration and onboarding process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Step 1: Registration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Email Verification</Label>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Social Login</Label>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Google SSO</Label>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Facebook SSO</Label>
                          <Switch checked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Step 2: Profile Setup
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Required Fields</Label>
                          <select className="text-xs p-1 border rounded">
                            <option>Name, Email</option>
                            <option>Name, Email, Company</option>
                            <option>Name, Email, Company, Role</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Profile Picture</Label>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Company Details</Label>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Industry Selection</Label>
                          <Switch checked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Step 3: Facebook Connection
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">FB Login Required</Label>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Page Selection</Label>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Skip Option</Label>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Permission Scope</Label>
                          <select className="text-xs p-1 border rounded">
                            <option>Standard</option>
                            <option>Extended</option>
                            <option>Full Access</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md bg-muted/20">
                  <div>
                    <h3 className="font-medium">Welcome Email Template</h3>
                    <p className="text-sm text-muted-foreground">
                      Customize the email sent to new users after registration
                    </p>
                  </div>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" /> Edit Template
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md bg-muted/20">
                  <div>
                    <h3 className="font-medium">Product Tour</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure the interactive product tour for new users
                    </p>
                  </div>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" /> Configure Tour
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" /> Save Onboarding Configuration
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="workspace-management" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Workspace Management</CardTitle>
                  <CardDescription>
                    Manage client workspaces and their settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Search workspaces..."
                          className="max-w-sm"
                        />
                        <Button variant="outline">
                          <Filter className="h-4 w-4 mr-2" /> Filter
                        </Button>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" /> Create Workspace
                      </Button>
                    </div>

                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="p-3 text-left">Workspace</th>
                            <th className="p-3 text-left">Owner</th>
                            <th className="p-3 text-left">Pages</th>
                            <th className="p-3 text-left">Members</th>
                            <th className="p-3 text-left">Plan</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {workspaces.map((workspace) => (
                            <tr key={workspace.id} className="border-t">
                              <td className="p-3">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-primary/10 rounded-md">
                                    <Building className="h-4 w-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {workspace.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      Created {workspace.createdAt}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">{workspace.owner}</td>
                              <td className="p-3">{workspace.pages}</td>
                              <td className="p-3">{workspace.members}</td>
                              <td className="p-3">
                                {getPlanBadge(workspace.plan)}
                              </td>
                              <td className="p-3">
                                {getStatusBadge(workspace.status)}
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <UserCog className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <ArrowUpRight className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {workspaces.length} of {workspaces.length}{" "}
                    workspaces
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Workspace Templates</CardTitle>
                  <CardDescription>
                    Pre-configured workspace setups for different industries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Marketing Agency</h3>
                          <Badge>Popular</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Optimized for agencies managing multiple client pages
                        </p>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          <Button size="sm">Use Template</Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-md cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">E-commerce Store</h3>
                          <Badge>Popular</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Focused on product showcasing and sales conversion
                        </p>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          <Button size="sm">Use Template</Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-md cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Local Business</h3>
                          <Badge>New</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Designed for local businesses with physical locations
                        </p>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          <Button size="sm">Use Template</Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-md cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Content Creator</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Perfect for influencers and personal brands
                        </p>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          <Button size="sm">Use Template</Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-md cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">
                            Non-Profit Organization
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Tailored for cause awareness and donor engagement
                        </p>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          <Button size="sm">Use Template</Button>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" /> Create Custom Template
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Workspace Configuration</CardTitle>
              <CardDescription>
                Default settings for new workspaces
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">General Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Default Storage Limit</Label>
                        <select className="text-xs p-1 border rounded">
                          <option>1 GB</option>
                          <option>5 GB</option>
                          <option>10 GB</option>
                          <option>Unlimited</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Max Team Members</Label>
                        <select className="text-xs p-1 border rounded">
                          <option>3</option>
                          <option>5</option>
                          <option>10</option>
                          <option>Unlimited</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Max Facebook Pages</Label>
                        <select className="text-xs p-1 border rounded">
                          <option>1</option>
                          <option>3</option>
                          <option>5</option>
                          <option>10</option>
                          <option>Unlimited</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Trial Period (Days)</Label>
                        <Input
                          type="number"
                          defaultValue="14"
                          className="w-20 h-7 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Security Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">2FA Requirement</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Session Timeout (min)</Label>
                        <Input
                          type="number"
                          defaultValue="60"
                          className="w-20 h-7 text-xs"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Password Complexity</Label>
                        <select className="text-xs p-1 border rounded">
                          <option>Basic</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">IP Restrictions</Label>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">
                    Data Isolation Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Database Isolation</Label>
                        <select className="text-xs p-1 border rounded">
                          <option>Shared Schema</option>
                          <option>Schema Per Tenant</option>
                          <option>Database Per Tenant</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Storage Isolation</Label>
                        <select className="text-xs p-1 border rounded">
                          <option>Shared Bucket</option>
                          <option>Folder Per Tenant</option>
                          <option>Bucket Per Tenant</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Cache Isolation</Label>
                        <select className="text-xs p-1 border rounded">
                          <option>Shared Cache</option>
                          <option>Namespace Per Tenant</option>
                          <option>Instance Per Tenant</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">API Rate Limiting</Label>
                        <select className="text-xs p-1 border rounded">
                          <option>Global</option>
                          <option>Per Tenant</option>
                          <option>Per User</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" /> Save Configuration
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="feature-management" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Management</CardTitle>
                  <CardDescription>
                    Control platform features and their availability by plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Search features..."
                          className="max-w-sm"
                        />
                        <Button variant="outline">
                          <Filter className="h-4 w-4 mr-2" /> Filter
                        </Button>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" /> Add Feature
                      </Button>
                    </div>

                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="p-3 text-left">Feature</th>
                            <th className="p-3 text-center">Basic Plan</th>
                            <th className="p-3 text-center">Pro Plan</th>
                            <th className="p-3 text-center">Business Plan</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {features.map((feature) => (
                            <tr key={feature.id} className="border-t">
                              <td className="p-3">
                                <div>
                                  <p className="font-medium">{feature.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {feature.description}
                                  </p>
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                {feature.basicPlan ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                                ) : (
                                  <AlertCircle className="h-5 w-5 text-red-600 mx-auto" />
                                )}
                              </td>
                              <td className="p-3 text-center">
                                {feature.proPlan ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                                ) : (
                                  <AlertCircle className="h-5 w-5 text-red-600 mx-auto" />
                                )}
                              </td>
                              <td className="p-3 text-center">
                                {feature.businessPlan ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                                ) : (
                                  <AlertCircle className="h-5 w-5 text-red-600 mx-auto" />
                                )}
                              </td>
                              <td className="p-3">
                                {getStatusBadge(feature.status)}
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plans</CardTitle>
                  <CardDescription>
                    Configure pricing and features for each plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-6">
                      <div className="p-4 border rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Free Plan</h3>
                          <Badge variant="outline">Limited</Badge>
                        </div>
                        <div className="mb-2">
                          <span className="text-2xl font-bold">$0</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Active</Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Trial Period</Label>
                            <Input
                              type="number"
                              defaultValue="0"
                              className="w-16 h-7 text-xs"
                            />
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Edit Plan
                        </Button>
                      </div>

                      <div className="p-4 border rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Basic Plan</h3>
                          <Badge variant="outline">Popular</Badge>
                        </div>
                        <div className="mb-2">
                          <span className="text-2xl font-bold">$29</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Active</Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Trial Period</Label>
                            <Input
                              type="number"
                              defaultValue="14"
                              className="w-16 h-7 text-xs"
                            />
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Edit Plan
                        </Button>
                      </div>

                      <div className="p-4 border rounded-md border-primary">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Professional Plan</h3>
                          <Badge>Recommended</Badge>
                        </div>
                        <div className="mb-2">
                          <span className="text-2xl font-bold">$79</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Active</Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Trial Period</Label>
                            <Input
                              type="number"
                              defaultValue="14"
                              className="w-16 h-7 text-xs"
                            />
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          Edit Plan
                        </Button>
                      </div>

                      <div className="p-4 border rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Business Plan</h3>
                          <Badge variant="outline">Enterprise</Badge>
                        </div>
                        <div className="mb-2">
                          <span className="text-2xl font-bold">$199</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Active</Label>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Trial Period</Label>
                            <Input
                              type="number"
                              defaultValue="7"
                              className="w-16 h-7 text-xs"
                            />
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Edit Plan
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" /> Add Custom Plan
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
              <CardDescription>
                Control feature rollout with feature flags
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Search feature flags..."
                      className="max-w-sm"
                    />
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Create Flag
                  </Button>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="p-3 text-left">Flag Name</th>
                        <th className="p-3 text-left">Description</th>
                        <th className="p-3 text-left">Environment</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Rollout %</th>
                        <th className="p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3">
                          <p className="font-medium">new-analytics-dashboard</p>
                        </td>
                        <td className="p-3">
                          <p className="text-sm">
                            New analytics UI with charts
                          </p>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">Production</Badge>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Enabled
                          </Badge>
                        </td>
                        <td className="p-3">25%</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">
                          <p className="font-medium">ai-content-suggestions</p>
                        </td>
                        <td className="p-3">
                          <p className="text-sm">
                            AI-powered content recommendations
                          </p>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">Production</Badge>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Enabled
                          </Badge>
                        </td>
                        <td className="p-3">50%</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">
                          <p className="font-medium">team-collaboration</p>
                        </td>
                        <td className="p-3">
                          <p className="text-sm">
                            Enhanced team collaboration features
                          </p>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">Staging</Badge>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-700 border-amber-200"
                          >
                            <Clock className="h-3 w-3 mr-1" /> Beta
                          </Badge>
                        </td>
                        <td className="p-3">100%</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">
                          <p className="font-medium">multi-platform-posting</p>
                        </td>
                        <td className="p-3">
                          <p className="text-sm">
                            Post to multiple social platforms
                          </p>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">Development</Badge>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200"
                          >
                            <AlertCircle className="h-3 w-3 mr-1" /> Disabled
                          </Badge>
                        </td>
                        <td className="p-3">0%</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" /> Sync Flags
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="system-settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>
                    Configure global system settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          General Settings
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">System Name</Label>
                            <Input
                              defaultValue="FB Page Management AI"
                              className="w-48 h-8 text-sm"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Environment</Label>
                            <select className="p-1 border rounded text-sm w-48">
                              <option>Production</option>
                              <option>Staging</option>
                              <option>Development</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Maintenance Mode</Label>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Debug Mode</Label>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          API Configuration
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">API Rate Limit</Label>
                            <Input
                              type="number"
                              defaultValue="100"
                              className="w-20 h-8 text-sm"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">API Timeout (s)</Label>
                            <Input
                              type="number"
                              defaultValue="30"
                              className="w-20 h-8 text-sm"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">CORS Origins</Label>
                            <Input
                              defaultValue="*"
                              className="w-48 h-8 text-sm"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">API Documentation</Label>
                            <Switch checked />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Database Configuration
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Database Type</Label>
                            <Badge variant="outline">
                              <Database className="h-3 w-3 mr-1" /> PostgreSQL
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Connection Pool</Label>
                            <Input
                              type="number"
                              defaultValue="20"
                              className="w-20 h-8 text-sm"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Query Timeout (s)</Label>
                            <Input
                              type="number"
                              defaultValue="10"
                              className="w-20 h-8 text-sm"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Auto Migrations</Label>
                            <Switch checked />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Storage Configuration
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Storage Provider</Label>
                            <select className="p-1 border rounded text-sm w-32">
                              <option>S3</option>
                              <option>Google Cloud</option>
                              <option>Azure Blob</option>
                              <option>Local</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Default Region</Label>
                            <select className="p-1 border rounded text-sm w-32">
                              <option>us-east-1</option>
                              <option>us-west-1</option>
                              <option>eu-west-1</option>
                              <option>ap-southeast-1</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">File Size Limit</Label>
                            <Input
                              type="number"
                              defaultValue="10"
                              className="w-20 h-8 text-sm"
                            />
                            <span className="text-xs text-muted-foreground">
                              MB
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Image Processing</Label>
                            <Switch checked />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Email Configuration
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Email Provider</Label>
                            <select className="p-1 border rounded text-sm w-32">
                              <option>SendGrid</option>
                              <option>Mailgun</option>
                              <option>AWS SES</option>
                              <option>SMTP</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">From Email</Label>
                            <Input
                              defaultValue="noreply@example.com"
                              className="w-48 h-8 text-sm"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">From Name</Label>
                            <Input
                              defaultValue="FB Page AI Assistant"
                              className="w-48 h-8 text-sm"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Email Templates</Label>
                            <Button variant="outline" size="sm">
                              Manage Templates
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Integration Settings
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Facebook API</Label>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Connected
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Stripe</Label>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Connected
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">OpenAI</Label>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Connected
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Google Analytics</Label>
                            <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-700 border-amber-200"
                            >
                              <Clock className="h-3 w-3 mr-1" /> Pending
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" /> Save Configuration
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>
                      Monitor system performance and health
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">API Status</p>
                          <p className="text-xs text-muted-foreground">
                            All systems operational
                          </p>
                        </div>
                        <div className="p-1 bg-green-100 rounded-full">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Database Status</p>
                          <p className="text-xs text-muted-foreground">
                            Connected, 12ms response time
                          </p>
                        </div>
                        <div className="p-1 bg-green-100 rounded-full">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Storage Status</p>
                          <p className="text-xs text-muted-foreground">
                            Connected, 85% available
                          </p>
                        </div>
                        <div className="p-1 bg-green-100 rounded-full">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Cache Status</p>
                          <p className="text-xs text-muted-foreground">
                            Connected, 92% hit rate
                          </p>
                        </div>
                        <div className="p-1 bg-green-100 rounded-full">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Facebook API</p>
                          <p className="text-xs text-muted-foreground">
                            Connected, rate limit: 95%
                          </p>
                        </div>
                        <div className="p-1 bg-amber-100 rounded-full">
                          <AlertCircle className="h-5 w-5 text-amber-600" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" /> Refresh Status
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Logs</CardTitle>
                    <CardDescription>
                      View recent system activity logs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2 text-xs font-mono">
                        <div className="p-2 border rounded-md">
                          <p className="text-green-600">
                            [INFO] 2023-05-20 10:15:22 - System started
                            successfully
                          </p>
                        </div>
                        <div className="p-2 border rounded-md">
                          <p className="text-blue-600">
                            [DEBUG] 2023-05-20 10:15:25 - Connected to database
                          </p>
                        </div>
                        <div className="p-2 border rounded-md">
                          <p className="text-amber-600">
                            [WARN] 2023-05-20 10:16:30 - High API usage detected
                          </p>
                        </div>
                        <div className="p-2 border rounded-md">
                          <p className="text-green-600">
                            [INFO] 2023-05-20 10:18:45 - User authentication
                            successful
                          </p>
                        </div>
                        <div className="p-2 border rounded-md">
                          <p className="text-red-600">
                            [ERROR] 2023-05-20 10:20:12 - Failed to connect to
                            external service
                          </p>
                        </div>
                        <div className="p-2 border rounded-md">
                          <p className="text-green-600">
                            [INFO] 2023-05-20 10:22:05 - Scheduled task
                            completed
                          </p>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                    <Button size="sm">
                      <ArrowUpRight className="h-4 w-4 mr-2" /> View All Logs
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Domain & SSL Configuration</CardTitle>
              <CardDescription>
                Manage custom domains and SSL certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-md bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Default Domain</h3>
                      <p className="text-sm text-muted-foreground">
                        app.fbpageai.com
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Custom Domain</h3>
                      <p className="text-sm text-muted-foreground">
                        dashboard.marketingagency.com
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Custom Domain</h3>
                      <p className="text-sm text-muted-foreground">
                        social.ecoproducts.com
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200"
                  >
                    <Clock className="h-3 w-3 mr-1" /> Pending Verification
                  </Badge>
                </div>

                <div className="flex justify-center">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Add Custom Domain
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SaasTransformation;
