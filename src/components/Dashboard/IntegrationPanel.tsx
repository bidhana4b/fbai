import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Calendar,
  ShoppingCart,
  Mail,
  MessageSquare,
  CreditCard,
  Link,
  Check,
  X,
} from "lucide-react";

const IntegrationPanel = () => {
  return (
    <div className="space-y-6 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Integration Panel</h2>
        <Button variant="outline" size="sm">
          Add New Integration
        </Button>
      </div>

      <Tabs defaultValue="ads">
        <TabsList className="mb-4">
          <TabsTrigger value="ads">Facebook Ads</TabsTrigger>
          <TabsTrigger value="booking">Booking Systems</TabsTrigger>
          <TabsTrigger value="cross-platform">
            Cross-Platform Sharing
          </TabsTrigger>
          <TabsTrigger value="sales">Sales Funnels</TabsTrigger>
        </TabsList>

        <TabsContent value="ads">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Facebook className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Facebook Ads Manager
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Connect and manage your Facebook ad campaigns
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                    <Check className="h-3 w-3" /> Connected
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-3">Active Campaigns</h4>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="p-2 text-left">Campaign Name</th>
                          <th className="p-2 text-left">Status</th>
                          <th className="p-2 text-left">Budget</th>
                          <th className="p-2 text-left">Results</th>
                          <th className="p-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-2">Summer Sale Promotion</td>
                          <td className="p-2">
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              Active
                            </span>
                          </td>
                          <td className="p-2">$50/day</td>
                          <td className="p-2">124 conversions</td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2">New Product Launch</td>
                          <td className="p-2">
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                              Scheduled
                            </span>
                          </td>
                          <td className="p-2">$75/day</td>
                          <td className="p-2">Starts Jul 15</td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium mb-3">
                    Create New Campaign
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="campaign-name">Campaign Name</Label>
                      <Input
                        id="campaign-name"
                        placeholder="Enter campaign name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="campaign-objective">Objective</Label>
                      <select
                        id="campaign-objective"
                        className="w-full p-2 border rounded-md"
                      >
                        <option>Brand Awareness</option>
                        <option>Traffic</option>
                        <option>Engagement</option>
                        <option>Lead Generation</option>
                        <option>Conversions</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="campaign-budget">Daily Budget</Label>
                      <Input
                        id="campaign-budget"
                        type="number"
                        placeholder="Enter amount"
                      />
                    </div>
                    <div>
                      <Label htmlFor="campaign-duration">Duration</Label>
                      <select
                        id="campaign-duration"
                        className="w-full p-2 border rounded-md"
                      >
                        <option>7 days</option>
                        <option>14 days</option>
                        <option>30 days</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>
                  <Button className="mt-4">Create Campaign</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="booking">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Calendly</h3>
                        <p className="text-sm text-muted-foreground">
                          Appointment scheduling
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full flex items-center gap-1">
                          <X className="h-3 w-3" /> Not Connected
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Connect Calendly
                    </Button>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-full">
                        <ShoppingCart className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Shopify</h3>
                        <p className="text-sm text-muted-foreground">
                          E-commerce platform
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                          <Check className="h-3 w-3" /> Connected
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Configure Settings
                    </Button>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <MessageSquare className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          Acuity Scheduling
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Appointment booking
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full flex items-center gap-1">
                          <X className="h-3 w-3" /> Not Connected
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Connect Acuity
                    </Button>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-100 rounded-full">
                        <CreditCard className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Square</h3>
                        <p className="text-sm text-muted-foreground">
                          Payment processing
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full flex items-center gap-1">
                          <X className="h-3 w-3" /> Not Connected
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Connect Square
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium mb-3">
                    Booking Widget Settings
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Booking Widget on Facebook Page</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow customers to book directly from your Facebook
                          page
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Automatic Confirmation Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Send automatic confirmation messages for bookings
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Reminder Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send reminder notifications before appointments
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cross-platform">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Cross-Platform Sharing
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-pink-100 rounded-full">
                        <Instagram className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Instagram</h3>
                        <p className="text-sm text-muted-foreground">
                          Share posts to Instagram
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Twitter className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Twitter</h3>
                        <p className="text-sm text-muted-foreground">
                          Share posts to Twitter
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Linkedin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">LinkedIn</h3>
                        <p className="text-sm text-muted-foreground">
                          Share posts to LinkedIn
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-red-100 rounded-full">
                        <Mail className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email Newsletter</h3>
                        <p className="text-sm text-muted-foreground">
                          Share posts to email subscribers
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium mb-3">
                    Cross-Platform Settings
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Automatic Cross-Posting</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically share Facebook posts to connected
                          platforms
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Customize Per Platform</Label>
                        <p className="text-sm text-muted-foreground">
                          Customize content for each platform when sharing
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Schedule Cross-Platform Posts</Label>
                        <p className="text-sm text-muted-foreground">
                          Schedule posts for optimal times on each platform
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Sales Funnels</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-3">Active Funnels</h4>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="p-2 text-left">Funnel Name</th>
                          <th className="p-2 text-left">Type</th>
                          <th className="p-2 text-left">Conversion Rate</th>
                          <th className="p-2 text-left">Status</th>
                          <th className="p-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-2">Lead Magnet Funnel</td>
                          <td className="p-2">Lead Generation</td>
                          <td className="p-2">4.2%</td>
                          <td className="p-2">
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              Active
                            </span>
                          </td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2">Product Launch Funnel</td>
                          <td className="p-2">Sales</td>
                          <td className="p-2">2.8%</td>
                          <td className="p-2">
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              Active
                            </span>
                          </td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2">Webinar Registration</td>
                          <td className="p-2">Event</td>
                          <td className="p-2">5.1%</td>
                          <td className="p-2">
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                              Draft
                            </span>
                          </td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Messenger Bot Funnel</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Create automated conversation flows to guide users to
                        conversion
                      </p>
                      <Button variant="outline" className="w-full">
                        Create Bot Funnel
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Lead Form Funnel</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Create lead collection forms with follow-up sequences
                      </p>
                      <Button variant="outline" className="w-full">
                        Create Form Funnel
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Event Registration</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Create event registration with reminders and follow-ups
                      </p>
                      <Button variant="outline" className="w-full">
                        Create Event Funnel
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="text-md font-medium mb-3">CTA Optimization</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Smart CTA Placement</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically optimize CTA placement in posts
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>A/B Testing</Label>
                        <p className="text-sm text-muted-foreground">
                          Test different CTAs to find the most effective ones
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Personalized CTAs</Label>
                        <p className="text-sm text-muted-foreground">
                          Show different CTAs based on user behavior
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationPanel;
