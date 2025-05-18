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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Download,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Calendar,
  DollarSign,
  BarChart2,
  Users,
  Settings,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  downloadUrl: string;
}

interface Subscription {
  id: string;
  name: string;
  price: string;
  billingCycle: string;
  status: "active" | "canceled" | "past_due";
  nextBillingDate: string;
  features: string[];
}

interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "bank";
  details: string;
  expiry?: string;
  isDefault: boolean;
}

const Billing = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for invoices
  const invoices: Invoice[] = [
    {
      id: "INV-2023-001",
      date: "Jul 01, 2023",
      amount: "$49.99",
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-2023-002",
      date: "Jun 01, 2023",
      amount: "$49.99",
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-2023-003",
      date: "May 01, 2023",
      amount: "$49.99",
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-2023-004",
      date: "Apr 01, 2023",
      amount: "$49.99",
      status: "paid",
      downloadUrl: "#",
    },
  ];

  // Mock data for subscription plans
  const subscriptionPlans = [
    {
      id: "basic",
      name: "Basic",
      price: "$29.99",
      billingCycle: "monthly",
      features: [
        "1 Facebook Page",
        "Basic Analytics",
        "Content Scheduling",
        "5 AI-Generated Posts/month",
        "Email Support",
      ],
      recommended: false,
    },
    {
      id: "pro",
      name: "Professional",
      price: "$49.99",
      billingCycle: "monthly",
      features: [
        "3 Facebook Pages",
        "Advanced Analytics",
        "Content Scheduling",
        "20 AI-Generated Posts/month",
        "Engagement Dashboard",
        "Priority Support",
      ],
      recommended: true,
    },
    {
      id: "business",
      name: "Business",
      price: "$99.99",
      billingCycle: "monthly",
      features: [
        "10 Facebook Pages",
        "Premium Analytics",
        "Content Scheduling",
        "Unlimited AI-Generated Posts",
        "Engagement Dashboard",
        "Competitor Analysis",
        "Dedicated Account Manager",
      ],
      recommended: false,
    },
  ];

  // Mock data for current subscription
  const currentSubscription: Subscription = {
    id: "sub_12345",
    name: "Professional Plan",
    price: "$49.99",
    billingCycle: "Monthly",
    status: "active",
    nextBillingDate: "Aug 01, 2023",
    features: [
      "3 Facebook Pages",
      "Advanced Analytics",
      "Content Scheduling",
      "20 AI-Generated Posts/month",
      "Engagement Dashboard",
      "Priority Support",
    ],
  };

  // Mock data for payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: "pm_1",
      type: "card",
      details: "Visa ending in 4242",
      expiry: "04/25",
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "paypal",
      details: "account@example.com",
      isDefault: false,
    },
  ];

  const getStatusBadge = (
    status: "paid" | "pending" | "failed" | "active" | "canceled" | "past_due",
  ) => {
    switch (status) {
      case "paid":
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />{" "}
            {status === "paid" ? "Paid" : "Active"}
          </Badge>
        );
      case "pending":
      case "past_due":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            <Clock className="h-3 w-3 mr-1" />{" "}
            {status === "pending" ? "Pending" : "Past Due"}
          </Badge>
        );
      case "failed":
      case "canceled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            <AlertCircle className="h-3 w-3 mr-1" />{" "}
            {status === "failed" ? "Failed" : "Canceled"}
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
          <h1 className="text-2xl font-bold">Billing & Subscription</h1>
          <p className="text-muted-foreground">
            Manage your subscription, payment methods, and billing history
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Billing FAQ
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Billing Settings
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Subscription
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Payment Methods
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Invoices
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currentSubscription.name}
                </div>
                <p className="text-xs text-muted-foreground">
                  {getStatusBadge(currentSubscription.status)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Next Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currentSubscription.price}
                </div>
                <p className="text-xs text-muted-foreground">
                  Due on {currentSubscription.nextBillingDate}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {paymentMethods.find((pm) => pm.isDefault)?.details}
                </div>
                <p className="text-xs text-muted-foreground">
                  Expires {paymentMethods.find((pm) => pm.isDefault)?.expiry}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Summary</CardTitle>
                <CardDescription>
                  Your current subscription details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium">
                    {currentSubscription.name}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Billing Cycle</span>
                  <span className="font-medium">
                    {currentSubscription.billingCycle}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Next Billing Date
                  </span>
                  <span className="font-medium">
                    {currentSubscription.nextBillingDate}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">
                    {currentSubscription.price}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <span>{getStatusBadge(currentSubscription.status)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" /> Change Plan
                </Button>
                <Button variant="destructive">Cancel Subscription</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>Your recent billing history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.slice(0, 3).map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-md">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{invoice.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {invoice.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{invoice.amount}</span>
                        {getStatusBadge(invoice.status)}
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All Invoices <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>
                Your current plan usage and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">AI-Generated Posts</span>
                    <p className="text-xs text-muted-foreground">
                      12 of 20 used this month
                    </p>
                  </div>
                  <span className="text-sm">60%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">Facebook Pages</span>
                    <p className="text-xs text-muted-foreground">
                      2 of 3 connected
                    </p>
                  </div>
                  <span className="text-sm">67%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: "67%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">Analytics Reports</span>
                    <p className="text-xs text-muted-foreground">
                      5 of 10 generated this month
                    </p>
                  </div>
                  <span className="text-sm">50%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Subscription</CardTitle>
              <CardDescription>
                Details about your current subscription plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-md bg-muted/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {currentSubscription.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentSubscription.billingCycle} billing
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      {currentSubscription.price}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Next billing: {currentSubscription.nextBillingDate}
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="text-sm font-medium mb-2">Plan Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentSubscription.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" /> Change Plan
              </Button>
              <Button variant="destructive">Cancel Subscription</Button>
            </CardFooter>
          </Card>

          <div>
            <h3 className="text-lg font-semibold mb-4">Available Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={plan.recommended ? "border-primary" : ""}
                >
                  {plan.recommended && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                      Recommended
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground"> / month</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={plan.id === "pro" ? "default" : "outline"}
                    >
                      {plan.id === "pro" ? "Current Plan" : "Select Plan"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your saved payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="p-4 border rounded-md flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-md">
                      {method.type === "card" ? (
                        <CreditCard className="h-4 w-4" />
                      ) : (
                        <DollarSign className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{method.details}</p>
                      {method.expiry && (
                        <p className="text-xs text-muted-foreground">
                          Expires {method.expiry}
                        </p>
                      )}
                    </div>
                    {method.isDefault && (
                      <Badge variant="outline" className="ml-2">
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Payment Method
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Your billing address and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billing-name">Name</Label>
                    <Input
                      id="billing-name"
                      defaultValue="Jane Doe"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="billing-email">Email</Label>
                    <Input
                      id="billing-email"
                      defaultValue="jane.doe@example.com"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="billing-address">Address</Label>
                  <Input
                    id="billing-address"
                    defaultValue="123 Main St"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="billing-city">City</Label>
                    <Input
                      id="billing-city"
                      defaultValue="San Francisco"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="billing-state">State</Label>
                    <Input
                      id="billing-state"
                      defaultValue="CA"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="billing-zip">ZIP Code</Label>
                    <Input
                      id="billing-zip"
                      defaultValue="94103"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="billing-country">Country</Label>
                  <select
                    id="billing-country"
                    className="w-full p-2 border rounded-md mt-1"
                    defaultValue="US"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>
                View and download your past invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-left">Invoice</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Amount</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-t">
                        <td className="p-3">{invoice.id}</td>
                        <td className="p-3">{invoice.date}</td>
                        <td className="p-3">{invoice.amount}</td>
                        <td className="p-3">
                          {getStatusBadge(invoice.status)}
                        </td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" /> Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {invoices.length} of {invoices.length} invoices
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

          <Card>
            <CardHeader>
              <CardTitle>Invoice Settings</CardTitle>
              <CardDescription>
                Configure your invoice preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="invoice-email">Invoice Email</Label>
                    <Input
                      id="invoice-email"
                      defaultValue="billing@yourcompany.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="invoice-format">Invoice Format</Label>
                    <select
                      id="invoice-format"
                      className="w-full p-2 border rounded-md mt-1"
                      defaultValue="pdf"
                    >
                      <option value="pdf">PDF</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="auto-download"
                    className="rounded border-gray-300"
                    defaultChecked
                  />
                  <Label htmlFor="auto-download">
                    Automatically download new invoices
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="email-receipt"
                    className="rounded border-gray-300"
                    defaultChecked
                  />
                  <Label htmlFor="email-receipt">
                    Email receipt when payment is processed
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" /> Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Billing;
