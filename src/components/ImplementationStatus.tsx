import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const ImplementationStatus = () => {
  const statusData = [
    {
      category: "User Types",
      features: [
        {
          name: "Super Admin/Platform Owner",
          status: "implemented",
          file: "SaasTransformation.tsx",
        },
        {
          name: "Page User/Client",
          status: "implemented",
          file: "SaasTransformation.tsx",
        },
        {
          name: "Team Member",
          status: "implemented",
          file: "SaasTransformation.tsx",
        },
      ],
    },
    {
      category: "Authentication Flow",
      features: [
        {
          name: "Admin Dashboard",
          status: "implemented",
          file: "SaasTransformation.tsx",
        },
        { name: "Client Dashboard", status: "implemented", file: "home.tsx" },
        { name: "Limited Access Dashboard", status: "pending", file: "" },
      ],
    },
    {
      category: "Super Admin Flows",
      features: [
        {
          name: "Manage Users",
          status: "implemented",
          file: "SaasTransformation.tsx",
        },
        {
          name: "Manage Subscriptions",
          status: "implemented",
          file: "SaasTransformation.tsx",
        },
        {
          name: "View Platform Analytics",
          status: "implemented",
          file: "SaasTransformation.tsx",
        },
        {
          name: "Enable/Disable Features",
          status: "implemented",
          file: "SaasTransformation.tsx",
        },
        {
          name: "Add New Features",
          status: "implemented",
          file: "SaasTransformation.tsx",
        },
      ],
    },
    {
      category: "Page User Flows",
      features: [
        { name: "Connect Facebook Pages", status: "pending", file: "" },
        {
          name: "Access Content Creation Hub",
          status: "implemented",
          file: "ContentHub.tsx",
        },
        {
          name: "Access Scheduling Calendar",
          status: "implemented",
          file: "SchedulingCalendar.tsx",
        },
        {
          name: "Access Engagement Dashboard",
          status: "implemented",
          file: "EngagementDashboard.tsx",
        },
        {
          name: "Access Analytics Center",
          status: "implemented",
          file: "AnalyticsCenter.tsx",
        },
        {
          name: "Access Integration Panel",
          status: "implemented",
          file: "IntegrationPanel.tsx",
        },
        {
          name: "Manage Team Members",
          status: "implemented",
          file: "SaasTransformation.tsx",
        },
        {
          name: "Manage Subscription",
          status: "implemented",
          file: "Billing.tsx",
        },
      ],
    },
    {
      category: "Content Creation Hub",
      features: [
        {
          name: "Generate AI Captions",
          status: "implemented",
          file: "ContentHub.tsx",
        },
        {
          name: "Create AI Images",
          status: "implemented",
          file: "ContentHub.tsx",
        },
        { name: "Use Brand Templates", status: "pending", file: "" },
      ],
    },
    {
      category: "Scheduling Calendar",
      features: [
        { name: "Drag-and-Drop Post Planning", status: "pending", file: "" },
        {
          name: "Schedule Posts",
          status: "implemented",
          file: "SchedulingCalendar.tsx",
        },
        { name: "Set Auto-Posting", status: "pending", file: "" },
      ],
    },
    {
      category: "Engagement Dashboard",
      features: [
        { name: "Configure Chatbot", status: "pending", file: "" },
        { name: "Create Response Templates", status: "pending", file: "" },
        { name: "Edit Conversation Flows", status: "pending", file: "" },
        { name: "Auto-Reply to Comments", status: "pending", file: "" },
        {
          name: "Handle Inbox Messages",
          status: "implemented",
          file: "EngagementDashboard.tsx",
        },
      ],
    },
    {
      category: "Analytics Center",
      features: [
        {
          name: "View Performance Metrics",
          status: "implemented",
          file: "AnalyticsCenter.tsx",
        },
        { name: "Get AI Improvement Suggestions", status: "pending", file: "" },
        {
          name: "Generate Reports",
          status: "implemented",
          file: "AnalyticsCenter.tsx",
        },
      ],
    },
    {
      category: "Integration Panel",
      features: [
        { name: "Connect Facebook Ads", status: "pending", file: "" },
        { name: "Connect Booking Systems", status: "pending", file: "" },
        { name: "Set Up Cross-Platform Sharing", status: "pending", file: "" },
      ],
    },
    {
      category: "Team Management",
      features: [
        {
          name: "Invite Team Member",
          status: "implemented",
          file: "SaasTransformation.tsx",
        },
        {
          name: "Assign Roles",
          status: "implemented",
          file: "SaasTransformation.tsx",
        },
        {
          name: "Remove Team Member",
          status: "implemented",
          file: "SaasTransformation.tsx",
        },
      ],
    },
    {
      category: "Subscription Management",
      features: [
        { name: "Select Plan", status: "implemented", file: "Billing.tsx" },
        { name: "Process Payment", status: "implemented", file: "Billing.tsx" },
        {
          name: "Activate Features Based on Plan",
          status: "implemented",
          file: "Billing.tsx",
        },
        {
          name: "Upgrade/Downgrade",
          status: "implemented",
          file: "Billing.tsx",
        },
      ],
    },
    {
      category: "Dynamic Enhancements",
      features: [
        { name: "Suggest Trends", status: "pending", file: "" },
        { name: "Analyze Competitors", status: "pending", file: "" },
        { name: "Translate Posts", status: "pending", file: "" },
      ],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "implemented":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" /> Implemented
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            <Clock className="h-3 w-3 mr-1" /> In Progress
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            <AlertCircle className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  // Calculate implementation statistics
  const totalFeatures = statusData.reduce(
    (acc, category) => acc + category.features.length,
    0,
  );

  const implementedFeatures = statusData.reduce(
    (acc, category) =>
      acc + category.features.filter((f) => f.status === "implemented").length,
    0,
  );

  const inProgressFeatures = statusData.reduce(
    (acc, category) =>
      acc + category.features.filter((f) => f.status === "in-progress").length,
    0,
  );

  const pendingFeatures = statusData.reduce(
    (acc, category) =>
      acc + category.features.filter((f) => f.status === "pending").length,
    0,
  );

  const implementationPercentage = Math.round(
    (implementedFeatures / totalFeatures) * 100,
  );

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Implementation Status</h1>
          <p className="text-muted-foreground">
            Track the development progress of your Facebook Page Management AI
            Assistant
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {implementationPercentage}%
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-primary rounded-full h-2"
                style={{ width: `${implementationPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {implementedFeatures} of {totalFeatures} features implemented
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Feature Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Implemented</span>
                <span className="text-sm font-medium">
                  {implementedFeatures}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-green-500 rounded-full h-2"
                  style={{
                    width: `${(implementedFeatures / totalFeatures) * 100}%`,
                  }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">In Progress</span>
                <span className="text-sm font-medium">
                  {inProgressFeatures}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-amber-500 rounded-full h-2"
                  style={{
                    width: `${(inProgressFeatures / totalFeatures) * 100}%`,
                  }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Pending</span>
                <span className="text-sm font-medium">{pendingFeatures}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-red-500 rounded-full h-2"
                  style={{
                    width: `${(pendingFeatures / totalFeatures) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Complete Engagement Dashboard features
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Implement Integration Panel connections
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Develop Dynamic Enhancements module
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {statusData.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-left">Feature</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">File</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.features.map((feature, featureIndex) => (
                      <tr key={featureIndex} className="border-t">
                        <td className="p-3">{feature.name}</td>
                        <td className="p-3">
                          {getStatusBadge(feature.status)}
                        </td>
                        <td className="p-3">
                          {feature.file ? (
                            <code className="text-xs bg-muted p-1 rounded">
                              {feature.file}
                            </code>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              Not implemented
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImplementationStatus;
