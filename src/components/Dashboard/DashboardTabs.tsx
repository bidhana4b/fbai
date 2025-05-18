import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  PenTool,
  Calendar,
  MessageSquare,
  BarChart3,
  Link,
  Sparkles,
  CreditCard,
  Settings,
  CheckCircle2,
} from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface DashboardTabsProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab = "dashboard",
  onTabChange = () => {},
}) => {
  const tabs: TabItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "content-hub", label: "Content Hub", icon: PenTool },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "engagement", label: "Engagement", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "integration", label: "Integration", icon: Link },
    { id: "dynamic", label: "Dynamic Enhancements", icon: Sparkles },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "saas", label: "SaaS System", icon: Settings },
    {
      id: "implementation-status",
      label: "Implementation Status",
      icon: CheckCircle2,
    },
  ];

  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  return (
    <div className="w-full bg-background border-b">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="container mx-auto px-4">
          <TabsList className="h-14 w-full justify-start gap-2 bg-transparent p-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
