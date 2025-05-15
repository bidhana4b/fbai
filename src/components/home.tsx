import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  BarChart2,
  Calendar,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import Sidebar from "./Dashboard/Sidebar";
import ContentHub from "./Dashboard/ContentHub";
import SchedulingCalendar from "./Dashboard/SchedulingCalendar";
import DashboardTabs from "./Dashboard/DashboardTabs";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const MetricCard = ({
  title,
  value,
  change,
  isPositive,
  icon,
}: MetricCardProps) => {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p
              className={`text-xs mt-1 ${isPositive ? "text-green-600" : "text-red-600"}`}
            >
              {isPositive ? "↑" : "↓"} {change} from last month
            </p>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

interface RecentActivityProps {
  activities: {
    id: string;
    type: string;
    title: string;
    time: string;
    avatar?: string;
  }[];
}

const RecentActivity = ({ activities = [] }: RecentActivityProps) => {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar} />
                <AvatarFallback>{activity.type.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Home = () => {
  const [activeTab, setActiveTab] = React.useState("dashboard");

  const metrics = [
    {
      title: "Total Followers",
      value: "12,345",
      change: "5.2%",
      isPositive: true,
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      title: "Post Engagement",
      value: "8,721",
      change: "3.1%",
      isPositive: true,
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
    },
    {
      title: "Scheduled Posts",
      value: "24",
      change: "12%",
      isPositive: true,
      icon: <Calendar className="h-5 w-5 text-primary" />,
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "0.5%",
      isPositive: false,
      icon: <BarChart2 className="h-5 w-5 text-primary" />,
    },
  ];

  const recentActivities = [
    {
      id: "1",
      type: "Post",
      title: 'New post "Summer Sale" was published',
      time: "10 minutes ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=post1",
    },
    {
      id: "2",
      type: "Message",
      title: "John Smith sent a message about your product",
      time: "1 hour ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "3",
      type: "Comment",
      title: "Sarah Lee commented on your latest post",
      time: "3 hours ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: "4",
      type: "Analytics",
      title: "Weekly analytics report is ready",
      time: "1 day ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=analytics",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">
              Facebook Page Management AI Assistant
            </h1>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <DashboardTabs />

          <Tabs
            defaultValue="dashboard"
            className="mt-6"
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="content-hub">Content Hub</TabsTrigger>
              <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {metrics.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Performance Overview
                      </h3>
                      <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                        <p className="text-muted-foreground">
                          Performance chart will be displayed here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <RecentActivity activities={recentActivities} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content-hub">
              <ContentHub />
            </TabsContent>

            <TabsContent value="scheduling">
              <SchedulingCalendar />
            </TabsContent>

            <TabsContent value="engagement">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Engagement Dashboard
                  </h3>
                  <div className="h-96 flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Engagement dashboard content will be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Analytics Center
                  </h3>
                  <div className="h-96 flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Analytics content will be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integration">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Integration Panel
                  </h3>
                  <div className="h-96 flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Integration options will be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Home;
