import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, LineChart, PieChart, TrendingUp, Zap } from "lucide-react";

const AnalyticsCenter = () => {
  return (
    <div className="space-y-6 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Center</h2>
        <div className="flex gap-2">
          <select className="px-3 py-1 border rounded-md text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
          <button className="px-3 py-1 bg-primary text-white rounded-md text-sm">
            Export Report
          </button>
        </div>
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="mb-4">
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="audience">Audience Insights</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Reach & Impressions</h3>
                  <LineChart className="h-5 w-5 text-primary" />
                </div>
                <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-muted-foreground">
                    Reach & Impressions chart will be displayed here
                  </p>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Reach</p>
                    <p className="font-semibold">24,582</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Impressions</p>
                    <p className="font-semibold">42,891</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Growth</p>
                    <p className="font-semibold text-green-600">+12.4%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Engagement Rate</h3>
                  <BarChart2 className="h-5 w-5 text-primary" />
                </div>
                <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-muted-foreground">
                    Engagement Rate chart will be displayed here
                  </p>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Likes</p>
                    <p className="font-semibold">8,721</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Comments</p>
                    <p className="font-semibold">1,432</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Shares</p>
                    <p className="font-semibold">643</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Audience Growth</h3>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-muted-foreground">
                    Audience Growth chart will be displayed here
                  </p>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">New Followers</p>
                    <p className="font-semibold">1,245</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Unfollows</p>
                    <p className="font-semibold">132</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Net Growth</p>
                    <p className="font-semibold text-green-600">+1,113</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Conversion Metrics</h3>
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-muted-foreground">
                    Conversion Metrics chart will be displayed here
                  </p>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Click-through Rate</p>
                    <p className="font-semibold">3.2%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Conversion Rate</p>
                    <p className="font-semibold">1.8%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">ROI</p>
                    <p className="font-semibold text-green-600">+24.5%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Audience Demographics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium mb-2">Age Distribution</h4>
                  <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Age distribution chart will be displayed here
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium mb-2">
                    Gender Distribution
                  </h4>
                  <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Gender distribution chart will be displayed here
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium mb-2">
                    Geographic Distribution
                  </h4>
                  <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Geographic distribution map will be displayed here
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium mb-2">
                    Online Activity Times
                  </h4>
                  <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Activity heatmap will be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Content Performance Analysis
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-2">
                    Top Performing Posts
                  </h4>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="p-2 text-left">Post</th>
                          <th className="p-2 text-left">Date</th>
                          <th className="p-2 text-left">Reach</th>
                          <th className="p-2 text-left">Engagement</th>
                          <th className="p-2 text-left">Conversion</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-2">Summer Sale Announcement</td>
                          <td className="p-2">Jun 15, 2023</td>
                          <td className="p-2">12,453</td>
                          <td className="p-2">8.2%</td>
                          <td className="p-2">3.1%</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2">Customer Testimonial Video</td>
                          <td className="p-2">Jun 22, 2023</td>
                          <td className="p-2">9,872</td>
                          <td className="p-2">7.5%</td>
                          <td className="p-2">2.8%</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2">Product Tutorial</td>
                          <td className="p-2">Jun 28, 2023</td>
                          <td className="p-2">8,541</td>
                          <td className="p-2">6.9%</td>
                          <td className="p-2">2.5%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium mb-2">
                    Content Type Performance
                  </h4>
                  <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Content type comparison chart will be displayed here
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium mb-2">
                    Posting Time Analysis
                  </h4>
                  <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Posting time analysis chart will be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                AI-Generated Recommendations
              </h3>
              <div className="space-y-6">
                <div className="p-4 border rounded-md bg-muted/20">
                  <h4 className="text-md font-medium mb-2">
                    Content Strategy Recommendations
                  </h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Increase video content - videos are outperforming images
                      by 32% in engagement
                    </li>
                    <li>
                      Post more frequently during 7-9 PM on weekdays based on
                      audience activity
                    </li>
                    <li>
                      Incorporate more user-generated content which has 45%
                      higher engagement
                    </li>
                    <li>
                      Use more question-based captions to increase comment rates
                    </li>
                  </ul>
                </div>

                <div className="p-4 border rounded-md bg-muted/20">
                  <h4 className="text-md font-medium mb-2">
                    Audience Growth Recommendations
                  </h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Target lookalike audiences based on your highest
                      converting followers
                    </li>
                    <li>
                      Run a referral campaign to leverage existing audience
                      network
                    </li>
                    <li>
                      Collaborate with complementary brands for cross-promotion
                    </li>
                    <li>
                      Optimize hashtag strategy to reach new audience segments
                    </li>
                  </ul>
                </div>

                <div className="p-4 border rounded-md bg-muted/20">
                  <h4 className="text-md font-medium mb-2">
                    Conversion Optimization Recommendations
                  </h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Implement stronger CTAs in top-performing posts</li>
                    <li>
                      Create a retargeting campaign for users who engaged but
                      didn't convert
                    </li>
                    <li>Simplify the conversion path from post to purchase</li>
                    <li>
                      Test different offer structures to identify optimal
                      conversion rates
                    </li>
                  </ul>
                </div>

                <button className="w-full py-2 bg-primary text-white rounded-md">
                  Apply Recommendations to Strategy
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsCenter;
