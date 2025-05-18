import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Users,
  Settings2,
  Save,
  RefreshCw,
  PlusCircle,
  Bot,
  Zap,
  ChevronRight,
  MessageCircle,
  ThumbsUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  ArrowUpRight,
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
  sentiment?: "positive" | "neutral" | "negative";
}

interface Comment {
  id: string;
  author: string;
  content: string;
  postTitle: string;
  timestamp: string;
  avatar?: string;
  sentiment?: "positive" | "neutral" | "negative";
  isReplied: boolean;
}

interface ResponseTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
}

const EngagementDashboard = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Mock data for inbox messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "John Smith",
      content:
        "Hi there! I'm interested in your services. Can you tell me more about your pricing plans?",
      timestamp: "10 minutes ago",
      isRead: false,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      sentiment: "positive",
    },
    {
      id: "2",
      sender: "Sarah Johnson",
      content:
        "I've been trying to contact your support team for days with no response. This is unacceptable!",
      timestamp: "1 hour ago",
      isRead: false,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      sentiment: "negative",
    },
    {
      id: "3",
      sender: "Michael Brown",
      content:
        "Just wanted to say I love your products. Been a customer for years!",
      timestamp: "3 hours ago",
      isRead: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      sentiment: "positive",
    },
    {
      id: "4",
      sender: "Emily Davis",
      content:
        "Do you ship internationally? I'm based in Australia and would like to place an order.",
      timestamp: "5 hours ago",
      isRead: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      sentiment: "neutral",
    },
    {
      id: "5",
      sender: "David Wilson",
      content:
        "I received my order yesterday but it was damaged during shipping. What's your return policy?",
      timestamp: "1 day ago",
      isRead: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      sentiment: "negative",
    },
  ]);

  // Mock data for comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Lisa Taylor",
      content:
        "This is exactly what I've been looking for! When will you have more in stock?",
      postTitle: "New Product Launch",
      timestamp: "30 minutes ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      sentiment: "positive",
      isReplied: false,
    },
    {
      id: "2",
      author: "Robert Garcia",
      content:
        "The quality of this product is terrible. I'm very disappointed.",
      postTitle: "Customer Testimonials",
      timestamp: "2 hours ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      sentiment: "negative",
      isReplied: false,
    },
    {
      id: "3",
      author: "Jennifer Martinez",
      content: "Can this be used with other products in your line?",
      postTitle: "Product Tutorial",
      timestamp: "4 hours ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer",
      sentiment: "neutral",
      isReplied: true,
    },
    {
      id: "4",
      author: "Thomas Anderson",
      content:
        "I've been using this for a week now and I'm seeing great results!",
      postTitle: "Weekly Tips & Tricks",
      timestamp: "1 day ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=thomas",
      sentiment: "positive",
      isReplied: true,
    },
    {
      id: "5",
      author: "Amanda Lewis",
      content: "Do you offer any discounts for bulk purchases?",
      postTitle: "Special Offers",
      timestamp: "2 days ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amanda",
      sentiment: "neutral",
      isReplied: false,
    },
  ]);

  // Mock data for response templates
  const responseTemplates: ResponseTemplate[] = [
    {
      id: "1",
      name: "General Inquiry Response",
      content:
        "Thank you for reaching out! We appreciate your interest in our products/services. A team member will get back to you shortly with more information.",
      category: "General",
    },
    {
      id: "2",
      name: "Pricing Information",
      content:
        "Thank you for your interest in our pricing! We offer several plans to meet different needs. You can find detailed information on our website at [LINK], or I'd be happy to discuss options that might work best for you.",
      category: "Sales",
    },
    {
      id: "3",
      name: "Customer Support Issue",
      content:
        "I'm sorry to hear you're experiencing difficulties. We take customer satisfaction very seriously. Could you please provide more details about the issue so we can resolve it promptly?",
      category: "Support",
    },
    {
      id: "4",
      name: "Positive Feedback Response",
      content:
        "Thank you so much for your kind words! We're thrilled to hear you're enjoying our products/services. Your support means a lot to us!",
      category: "Feedback",
    },
    {
      id: "5",
      name: "International Shipping",
      content:
        "Yes, we do ship internationally! Shipping costs and delivery times vary by location. Please provide your country and postal code, and I'll be happy to give you specific information.",
      category: "Sales",
    },
    {
      id: "6",
      name: "Returns & Refunds",
      content:
        "I'm sorry to hear about the damage. Our return policy allows returns within 30 days of receipt. Please send photos of the damaged item to support@example.com, and we'll process a replacement or refund right away.",
      category: "Support",
    },
  ];

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    // Mark as read
    setMessages(
      messages.map((m) => (m.id === message.id ? { ...m, isRead: true } : m)),
    );

    // Set appropriate template based on message content
    if (message.content.toLowerCase().includes("pricing")) {
      setSelectedTemplate("2"); // Pricing Information template
      setReplyText(responseTemplates.find((t) => t.id === "2")?.content || "");
    } else if (message.sentiment === "negative") {
      setSelectedTemplate("3"); // Customer Support Issue template
      setReplyText(responseTemplates.find((t) => t.id === "3")?.content || "");
    } else if (message.sentiment === "positive") {
      setSelectedTemplate("4"); // Positive Feedback Response template
      setReplyText(responseTemplates.find((t) => t.id === "4")?.content || "");
    } else if (
      message.content.toLowerCase().includes("ship") ||
      message.content.toLowerCase().includes("international")
    ) {
      setSelectedTemplate("5"); // International Shipping template
      setReplyText(responseTemplates.find((t) => t.id === "5")?.content || "");
    } else if (
      message.content.toLowerCase().includes("return") ||
      message.content.toLowerCase().includes("refund") ||
      message.content.toLowerCase().includes("damaged")
    ) {
      setSelectedTemplate("6"); // Returns & Refunds template
      setReplyText(responseTemplates.find((t) => t.id === "6")?.content || "");
    } else {
      setSelectedTemplate("1"); // General Inquiry Response template
      setReplyText(responseTemplates.find((t) => t.id === "1")?.content || "");
    }
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = responseTemplates.find((t) => t.id === templateId);
    if (template) {
      setReplyText(template.content);
    }
  };

  const handleSendReply = () => {
    // In a real app, this would send the reply to the user
    console.log(`Sending reply to ${selectedMessage?.sender}: ${replyText}`);
    setSelectedMessage(null);
    setReplyText("");
    setSelectedTemplate(null);
  };

  const getSentimentBadge = (
    sentiment: "positive" | "neutral" | "negative",
  ) => {
    switch (sentiment) {
      case "positive":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <ThumbsUp className="h-3 w-3 mr-1" /> Positive
          </Badge>
        );
      case "negative":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            <AlertCircle className="h-3 w-3 mr-1" /> Negative
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200"
          >
            <MessageCircle className="h-3 w-3 mr-1" /> Neutral
          </Badge>
        );
    }
  };

  const renderChatbotBuilder = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chatbot Flows</CardTitle>
              <CardDescription>
                Configure conversation paths for your chatbot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-2">
                  <div className="p-3 rounded-md cursor-pointer border border-primary bg-primary/5">
                    <div className="font-medium">Welcome Message</div>
                    <div className="text-sm text-muted-foreground">
                      Initial greeting for new conversations
                    </div>
                  </div>
                  <div className="p-3 rounded-md cursor-pointer border border-border hover:border-primary/50">
                    <div className="font-medium">Product Inquiry</div>
                    <div className="text-sm text-muted-foreground">
                      Handle questions about products and services
                    </div>
                  </div>
                  <div className="p-3 rounded-md cursor-pointer border border-border hover:border-primary/50">
                    <div className="font-medium">Support Request</div>
                    <div className="text-sm text-muted-foreground">
                      Process customer support inquiries
                    </div>
                  </div>
                  <div className="p-3 rounded-md cursor-pointer border border-border hover:border-primary/50">
                    <div className="font-medium">Booking Flow</div>
                    <div className="text-sm text-muted-foreground">
                      Guide users through appointment scheduling
                    </div>
                  </div>
                  <div className="p-3 rounded-md cursor-pointer border border-border hover:border-primary/50">
                    <div className="font-medium">FAQ Responses</div>
                    <div className="text-sm text-muted-foreground">
                      Answer common questions automatically
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Flow
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Settings</CardTitle>
              <CardDescription>
                Configure your chatbot's AI behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sentiment Analysis</Label>
                  <div className="text-xs text-muted-foreground">
                    Detect user emotions in messages
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Intent Recognition</Label>
                  <div className="text-xs text-muted-foreground">
                    Identify user goals from messages
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Human Handoff</Label>
                  <div className="text-xs text-muted-foreground">
                    Transfer complex issues to human agents
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Response Generation</Label>
                  <div className="text-xs text-muted-foreground">
                    Create dynamic responses based on context
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Flow Editor</CardTitle>
              <CardDescription>
                Design your conversation flow with a visual editor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Welcome Message Flow</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Zap className="h-4 w-4 mr-1" /> Test Flow
                    </Button>
                    <Button size="sm">
                      <Save className="h-4 w-4 mr-1" /> Save Flow
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Start Node */}
                  <div className="bg-background border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                        <span className="font-medium">Start</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md text-sm">
                      Hi there! 👋 Welcome to [Business Name]. How can I help
                      you today?
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* User Input Node */}
                  <div className="bg-background border rounded-md p-4 ml-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                          <Users className="h-3 w-3 text-white" />
                        </div>
                        <span className="font-medium">User Input</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md text-sm">
                      Capture user response and identify intent
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Conditional Node */}
                  <div className="bg-background border rounded-md p-4 ml-12">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                          <Zap className="h-3 w-3 text-white" />
                        </div>
                        <span className="font-medium">Condition</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md text-sm">
                      <div className="font-medium mb-1">Check Intent:</div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          <span>If "product inquiry" → Product Info Flow</span>
                        </div>
                        <div className="flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          <span>If "support" → Support Flow</span>
                        </div>
                        <div className="flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          <span>Else → General Response</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add Node Button */}
                  <div className="flex justify-center">
                    <Button variant="outline">
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Node
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Bot className="h-4 w-4 mr-2" /> Preview Chatbot
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" /> Deploy Chatbot
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Engagement Dashboard</h1>
          <p className="text-muted-foreground">
            Manage conversations and comments from your Facebook page
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="inbox"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="inbox" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Inbox
            <Badge className="ml-2 bg-primary">
              {messages.filter((m) => !m.isRead).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Comments
            <Badge className="ml-2 bg-primary">
              {comments.filter((c) => !c.isReplied).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center">
            <Bot className="h-4 w-4 mr-2" />
            Chatbot Builder
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>
                    Manage your Facebook page messages
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="divide-y">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 cursor-pointer hover:bg-muted/50 ${selectedMessage?.id === message.id ? "bg-muted/50" : ""} ${!message.isRead ? "border-l-4 border-primary" : ""}`}
                          onClick={() => handleSelectMessage(message)}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src={message.avatar} />
                              <AvatarFallback>
                                {message.sender.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{message.sender}</p>
                                <span className="text-xs text-muted-foreground">
                                  {message.timestamp}
                                </span>
                              </div>
                              <p className="text-sm line-clamp-2">
                                {message.content}
                              </p>
                              {message.sentiment && (
                                <div>
                                  {getSentimentBadge(message.sentiment)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {selectedMessage ? (
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={selectedMessage.avatar} />
                          <AvatarFallback>
                            {selectedMessage.sender.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{selectedMessage.sender}</CardTitle>
                          <CardDescription>
                            {selectedMessage.timestamp}
                          </CardDescription>
                        </div>
                      </div>
                      {selectedMessage.sentiment && (
                        <div>
                          {getSentimentBadge(selectedMessage.sentiment)}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-md">
                      <p>{selectedMessage.content}</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Response Templates</Label>
                      <Select
                        value={selectedTemplate || undefined}
                        onValueChange={handleTemplateChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                          {responseTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Your Reply</Label>
                      <Textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply here..."
                        className="min-h-[150px]"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="auto-translate" />
                      <Label htmlFor="auto-translate">
                        Auto-translate response
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedMessage(null)}
                    >
                      Cancel
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Clock className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                      <Button onClick={handleSendReply}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Select a message
                    </h3>
                    <p className="text-muted-foreground">
                      Choose a message from the inbox to view and reply
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Comments</CardTitle>
                <CardDescription>
                  Manage and respond to comments on your Facebook posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="border rounded-md p-4 bg-background"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src={comment.avatar} />
                              <AvatarFallback>
                                {comment.author.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {comment.author}
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />{" "}
                                {comment.timestamp}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {comment.sentiment && (
                              <div>{getSentimentBadge(comment.sentiment)}</div>
                            )}
                            {comment.isReplied ? (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" />{" "}
                                Replied
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-50 text-amber-700 border-amber-200"
                              >
                                <Clock className="h-3 w-3 mr-1" /> Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="text-xs font-medium text-muted-foreground mb-1">
                            On post: {comment.postTitle}
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" /> Reply
                          </Button>
                          <Button size="sm">
                            <Bot className="h-4 w-4 mr-1" /> Auto-Reply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter comments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Comments</SelectItem>
                    <SelectItem value="pending">Pending Replies</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <RefreshCw className="h-4 w-4 mr-2" /> Refresh Comments
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chatbot">{renderChatbotBuilder()}</TabsContent>
      </Tabs>
    </div>
  );
};

export default EngagementDashboard;
