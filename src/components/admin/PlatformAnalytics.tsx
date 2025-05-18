import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AnalyticsData {
  totalUsers: number;
  totalWorkspaces: number;
  totalPages: number;
  activeUsers: number;
  planDistribution: Record<string, number>;
  userGrowth: { date: string; count: number }[];
  workspaceGrowth: { date: string; count: number }[];
}

const PlatformAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Get total users count
      const { count: totalUsers, error: usersError } = await supabase
        .from("user_profiles")
        .select("*", { count: "exact", head: true });

      if (usersError) throw usersError;

      // Get total workspaces count
      const { count: totalWorkspaces, error: workspacesError } = await supabase
        .from("workspaces")
        .select("*", { count: "exact", head: true });

      if (workspacesError) throw workspacesError;

      // Get total Facebook pages count
      const { count: totalPages, error: pagesError } = await supabase
        .from("facebook_pages")
        .select("*", { count: "exact", head: true });

      if (pagesError) throw pagesError;

      // Get active users (users who have logged in within the last 30 days)
      // In a real app, you would track this with a last_login field
      // For now, we'll just use a placeholder value
      const activeUsers = Math.floor(totalUsers * 0.8); // Placeholder

      // Get plan distribution
      const { data: planData, error: planError } = await supabase
        .from("workspaces")
        .select("plan_id");

      if (planError) throw planError;

      const planDistribution: Record<string, number> = {};
      planData.forEach((workspace) => {
        const plan = workspace.plan_id || "none";
        planDistribution[plan] = (planDistribution[plan] || 0) + 1;
      });

      // Generate mock growth data for demonstration
      const userGrowth = generateMockGrowthData(totalUsers);
      const workspaceGrowth = generateMockGrowthData(totalWorkspaces);

      setAnalytics({
        totalUsers,
        totalWorkspaces,
        totalPages,
        activeUsers,
        planDistribution,
        userGrowth,
        workspaceGrowth,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast({
        title: "Error fetching analytics",
        description: "Could not load platform analytics data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate mock growth data
  const generateMockGrowthData = (total: number) => {
    const data = [];
    const today = new Date();
    let currentTotal = total;

    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Decrease by a random amount as we go back in time
      if (i > 0) {
        const decrease = Math.floor(Math.random() * (total * 0.05)) + 1;
        currentTotal = Math.max(0, currentTotal - decrease);
      }

      data.push({
        date: date.toISOString().split("T")[0],
        count: currentTotal,
      });
    }

    return data;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Platform Analytics</CardTitle>
          <CardDescription>
            Overview of platform usage and growth
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={fetchAnalytics}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : analytics ? (
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="plans">Plans</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Users</CardDescription>
                    <CardTitle className="text-3xl">
                      {analytics.totalUsers}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {analytics.activeUsers} active in the last 30 days
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Workspaces</CardDescription>
                    <CardTitle className="text-3xl">
                      {analytics.totalWorkspaces}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Avg{" "}
                      {(
                        analytics.totalWorkspaces /
                        Math.max(1, analytics.totalUsers)
                      ).toFixed(1)}{" "}
                      per user
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Facebook Pages</CardDescription>
                    <CardTitle className="text-3xl">
                      {analytics.totalPages}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Avg{" "}
                      {(
                        analytics.totalPages /
                        Math.max(1, analytics.totalWorkspaces)
                      ).toFixed(1)}{" "}
                      per workspace
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>User Engagement</CardDescription>
                    <CardTitle className="text-3xl">
                      {Math.round(
                        (analytics.activeUsers /
                          Math.max(1, analytics.totalUsers)) *
                          100,
                      )}
                      %
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Active users in the last 30 days
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="growth" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">User Growth</h3>
                  <div className="h-64 bg-muted/50 rounded-md p-4">
                    {/* In a real app, you would use a chart library like recharts */}
                    <div className="text-center text-muted-foreground">
                      Chart visualization would go here
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Workspace Growth</h3>
                  <div className="h-64 bg-muted/50 rounded-md p-4">
                    <div className="text-center text-muted-foreground">
                      Chart visualization would go here
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="plans" className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Subscription Plan Distribution
                </h3>
                <div className="space-y-2">
                  {Object.entries(analytics.planDistribution).map(
                    ([plan, count]) => (
                      <div key={plan} className="flex items-center">
                        <div className="w-32 capitalize">{plan}</div>
                        <div className="flex-1">
                          <div className="h-4 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{
                                width: `${(count / analytics.totalWorkspaces) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-16 text-right">
                          {count} (
                          {Math.round(
                            (count / analytics.totalWorkspaces) * 100,
                          )}
                          %)
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No analytics data available.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlatformAnalytics;
