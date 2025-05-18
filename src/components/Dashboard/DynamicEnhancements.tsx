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
  TrendingUp,
  Sparkles,
  Globe,
  Languages,
  Search,
  BarChart2,
  RefreshCw,
  PlusCircle,
  ArrowUpRight,
  Zap,
  MessageCircle,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Filter,
  Save,
} from "lucide-react";

interface TrendingTopic {
  id: string;
  topic: string;
  category: string;
  popularity: number;
  growth: number;
  isPositive: boolean;
}

interface CompetitorInsight {
  id: string;
  name: string;
  avatar?: string;
  postFrequency: string;
  topContent: string;
  engagement: string;
}

const DynamicEnhancements = () => {
  const [activeTab, setActiveTab] = useState("trends");

  // Mock data for trending topics
  const trendingTopics: TrendingTopic[] = [
    {
      id: "1",
      topic: "Sustainable Products",
      category: "Eco-Friendly",
      popularity: 89,
      growth: 12.4,
      isPositive: true,
    },
    {
      id: "2",
      topic: "Work From Home Tips",
      category: "Lifestyle",
      popularity: 76,
      growth: 8.7,
      isPositive: true,
    },
    {
      id: "3",
      topic: "Virtual Events",
      category: "Entertainment",
      popularity: 72,
      growth: 15.2,
      isPositive: true,
    },
    {
      id: "4",
      topic: "Mental Health Awareness",
      category: "Health",
      popularity: 68,
      growth: 9.5,
      isPositive: true,
    },
    {
      id: "5",
      topic: "DIY Home Projects",
      category: "Home",
      popularity: 65,
      growth: 6.8,
      isPositive: true,
    },
    {
      id: "6",
      topic: "Online Learning",
      category: "Education",
      popularity: 61,
      growth: -2.3,
      isPositive: false,
    },
  ];

  // Mock data for competitor insights
  const competitorInsights: CompetitorInsight[] = [
    {
      id: "1",
      name: "Eco Solutions Inc.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eco",
      postFrequency: "5-7 posts/week",
      topContent: "Video tutorials on sustainable living",
      engagement: "High (8.2% avg)",
    },
    {
      id: "2",
      name: "Green Living Co.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=green",
      postFrequency: "3-5 posts/week",
      topContent: "User-generated content & testimonials",
      engagement: "Medium (5.7% avg)",
    },
    {
      id: "3",
      name: "EarthFirst Products",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=earth",
      postFrequency: "8-10 posts/week",
      topContent: "Product demonstrations & reviews",
      engagement: "High (7.9% avg)",
    },
    {
      id: "4",
      name: "Sustainable Living Today",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sustainable",
      postFrequency: "4-6 posts/week",
      topContent: "Educational infographics",
      engagement: "Medium (4.8% avg)",
    },
  ];

  // Mock data for viral formats
  const viralFormats = [
    {
      id: "1",
      title: "Before & After Transformations",
      description: "Show product results with compelling visual comparisons",
      engagementRate: "12.4%",
    },
    {
      id: "2",
      title: "Day-in-the-Life Videos",
      description: "Behind-the-scenes content showing authentic experiences",
      engagementRate: "10.8%",
    },
    {
      id: "3",
      title: "User Testimonial Spotlights",
      description: "Real customers sharing their positive experiences",
      engagementRate: "9.7%",
    },
    {
      id: "4",
      title: "Quick Tips & Hacks",
      description: "Short, actionable advice that provides immediate value",
      engagementRate: "8.9%",
    },
    {
      id: "5",
      title: "Interactive Polls & Questions",
      description: "Engaging content that encourages audience participation",
      engagementRate: "8.5%",
    },
  ];

  // Mock data for translation languages
  const languages = [
    { code: "es", name: "Spanish", translated: true },
    { code: "fr", name: "French", translated: true },
    { code: "de", name: "German", translated: false },
    { code: "it", name: "Italian", translated: false },
    { code: "pt", name: "Portuguese", translated: true },
    { code: "zh", name: "Chinese", translated: false },
    { code: "ja", name: "Japanese", translated: false },
    { code: "ar", name: "Arabic", translated: false },
  ];

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dynamic Enhancements</h1>
          <p className="text-muted-foreground">
            Discover trends, analyze competitors, and optimize your content
            strategy
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="trends"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="trends" className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trend Suggestions
          </TabsTrigger>
          <TabsTrigger value="viral" className="flex items-center">
            <Sparkles className="h-4 w-4 mr-2" />
            Viral Format Templates
          </TabsTrigger>
          <TabsTrigger value="multilingual" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Multilingual Translation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Trending Topics</CardTitle>
                  <CardDescription>
                    Popular topics in your industry
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="divide-y">
                      {trendingTopics.map((topic) => (
                        <div
                          key={topic.id}
                          className="p-4 cursor-pointer hover:bg-muted/50"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{topic.topic}</p>
                              <Badge variant="outline" className="mt-1">
                                {topic.category}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{topic.popularity}%</p>
                              <p
                                className={`text-xs ${topic.isPositive ? "text-green-600" : "text-red-600"}`}
                              >
                                {topic.isPositive ? "↑" : "↓"}{" "}
                                {Math.abs(topic.growth)}%
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between p-4">
                  <div className="text-sm text-muted-foreground">
                    Updated 2 hours ago
                  </div>
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4 mr-2" /> Search Topics
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-2">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Competitor Analysis</CardTitle>
                    <CardDescription>
                      Insights from top competitors in your niche
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {competitorInsights.map((competitor) => (
                        <div
                          key={competitor.id}
                          className="border rounded-md p-4 bg-background"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <Avatar>
                                <AvatarImage src={competitor.avatar} />
                                <AvatarFallback>
                                  {competitor.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {competitor.name}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">
                                Post Frequency
                              </p>
                              <p>{competitor.postFrequency}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Top Content
                              </p>
                              <p>{competitor.topContent}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Engagement
                              </p>
                              <p>{competitor.engagement}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Content Strategy</CardTitle>
                    <CardDescription>
                      AI-generated recommendations based on trends and
                      competitor analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md bg-muted/20">
                        <h4 className="text-md font-medium mb-2">
                          Content Mix Recommendations
                        </h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Increase video content focusing on sustainable
                            product demonstrations
                          </li>
                          <li>
                            Create more user-generated content showcasing real
                            results
                          </li>
                          <li>
                            Develop educational infographics about eco-friendly
                            practices
                          </li>
                          <li>
                            Launch a weekly "Tips & Tricks" series for higher
                            engagement
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 border rounded-md bg-muted/20">
                        <h4 className="text-md font-medium mb-2">
                          Posting Schedule Optimization
                        </h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Optimal posting times: Weekdays 7-9 AM and 6-8 PM
                          </li>
                          <li>
                            Increase posting frequency to 5-7 posts per week
                          </li>
                          <li>
                            Schedule educational content on Tuesdays and
                            Thursdays
                          </li>
                          <li>
                            Share user testimonials on weekends for higher
                            engagement
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Zap className="h-4 w-4 mr-2" /> Apply Recommendations
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="viral" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Viral Format Templates</CardTitle>
                  <CardDescription>
                    High-performing content formats for your industry
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="divide-y">
                      {viralFormats.map((format) => (
                        <div
                          key={format.id}
                          className="p-4 cursor-pointer hover:bg-muted/50"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{format.title}</p>
                              <Badge className="bg-green-100 text-green-700 border-green-200">
                                {format.engagementRate}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {format.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="p-4">
                  <Button className="w-full">
                    <PlusCircle className="h-4 w-4 mr-2" /> Create New Template
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Template Editor</CardTitle>
                  <CardDescription>
                    Customize viral content templates for your brand
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">
                        Before & After Transformation Template
                      </h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Zap className="h-4 w-4 mr-1" /> Preview
                        </Button>
                        <Button size="sm">
                          <Save className="h-4 w-4 mr-1" /> Save Template
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="template-title">Template Title</Label>
                          <Input
                            id="template-title"
                            defaultValue="Before & After Transformation"
                          />
                        </div>
                        <div>
                          <Label htmlFor="template-category">Category</Label>
                          <select
                            id="template-category"
                            className="w-full p-2 border rounded-md"
                            defaultValue="product-demo"
                          >
                            <option value="product-demo">
                              Product Demonstration
                            </option>
                            <option value="testimonial">Testimonial</option>
                            <option value="educational">Educational</option>
                            <option value="promotional">Promotional</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="template-description">
                          Description
                        </Label>
                        <textarea
                          id="template-description"
                          className="w-full p-2 border rounded-md min-h-[100px]"
                          defaultValue="Show the transformation your product creates with compelling before and after visuals. This format builds credibility and showcases real results."
                        ></textarea>
                      </div>

                      <div>
                        <Label>Template Structure</Label>
                        <div className="border rounded-md p-4 space-y-4 mt-2">
                          <div>
                            <Label htmlFor="caption-template">
                              Caption Template
                            </Label>
                            <textarea
                              id="caption-template"
                              className="w-full p-2 border rounded-md min-h-[100px]"
                              defaultValue="🔄 BEFORE vs AFTER with [PRODUCT_NAME]! 🔄\n\nAmazing results after just [TIMEFRAME]! ✨\n\n👉 [KEY_BENEFIT_1]\n👉 [KEY_BENEFIT_2]\n👉 [KEY_BENEFIT_3]\n\nReal results, no filters! Have you tried [PRODUCT_NAME] yet? Share your experience in the comments! 💬\n\n#BeforeAndAfter #Transformation #[INDUSTRY_HASHTAG]"
                            ></textarea>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Image Layout</Label>
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="border rounded-md p-2 text-center bg-muted/50">
                                  BEFORE
                                </div>
                                <div className="border rounded-md p-2 text-center bg-muted/50">
                                  AFTER
                                </div>
                              </div>
                            </div>
                            <div>
                              <Label>Recommended Hashtags</Label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline">#BeforeAndAfter</Badge>
                                <Badge variant="outline">#Transformation</Badge>
                                <Badge variant="outline">#Results</Badge>
                                <Badge variant="outline">#RealResults</Badge>
                                <Badge variant="outline">+Add</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <ArrowUpRight className="h-4 w-4 mr-2" /> Export Template
                  </Button>
                  <Button>
                    <MessageCircle className="h-4 w-4 mr-2" /> Share with Team
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="multilingual" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Translation Settings</CardTitle>
                  <CardDescription>
                    Manage multilingual content settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Translation</Label>
                      <div className="text-xs text-muted-foreground">
                        Automatically translate new posts
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>AI Language Adaptation</Label>
                      <div className="text-xs text-muted-foreground">
                        Adapt content for cultural context
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Multilingual Comments</Label>
                      <div className="text-xs text-muted-foreground">
                        Auto-translate incoming comments
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Translation Quality</Label>
                      <div className="text-xs text-muted-foreground">
                        Set translation quality level
                      </div>
                    </div>
                    <select className="p-1 border rounded-md text-sm">
                      <option>Standard</option>
                      <option>Professional</option>
                      <option>Expert</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                  <CardDescription>
                    Language preferences of your audience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Language distribution chart will be displayed here
                    </p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>English</span>
                      <span className="font-medium">64%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: "64%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Spanish</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: "18%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>French</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: "12%" }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Language Management</CardTitle>
                  <CardDescription>
                    Configure languages for content translation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Search languages..."
                        className="max-w-sm"
                      />
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                      </Button>
                    </div>

                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="p-2 text-left">Language</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">Audience %</th>
                            <th className="p-2 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {languages.map((language) => (
                            <tr key={language.code} className="border-t">
                              <td className="p-2">
                                <div className="flex items-center gap-2">
                                  <Languages className="h-4 w-4" />
                                  {language.name}
                                </div>
                              </td>
                              <td className="p-2">
                                {language.translated ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200"
                                  >
                                    <CheckCircle2 className="h-3 w-3 mr-1" />{" "}
                                    Active
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="bg-amber-50 text-amber-700 border-amber-200"
                                  >
                                    <Clock className="h-3 w-3 mr-1" /> Inactive
                                  </Badge>
                                )}
                              </td>
                              <td className="p-2">
                                {language.code === "es"
                                  ? "18%"
                                  : language.code === "fr"
                                    ? "12%"
                                    : language.code === "de"
                                      ? "8%"
                                      : language.code === "it"
                                        ? "6%"
                                        : language.code === "pt"
                                          ? "5%"
                                          : language.code === "zh"
                                            ? "4%"
                                            : language.code === "ja"
                                              ? "3%"
                                              : "2%"}
                              </td>
                              <td className="p-2">
                                <Button variant="ghost" size="sm">
                                  {language.translated
                                    ? "Configure"
                                    : "Activate"}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Translation Preview</CardTitle>
                  <CardDescription>
                    Preview and edit translated content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Original Content (English)</Label>
                      <textarea
                        className="w-full p-2 border rounded-md min-h-[100px] mt-2"
                        defaultValue="Introducing our new eco-friendly product line! Made with sustainable materials and designed to reduce your carbon footprint. Check out our website for more information and special launch discounts!"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <Label>Spanish Translation</Label>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-3 w-3 mr-1" /> Regenerate
                          </Button>
                        </div>
                        <textarea
                          className="w-full p-2 border rounded-md min-h-[100px] mt-2"
                          defaultValue="¡Presentamos nuestra nueva línea de productos ecológicos! Fabricados con materiales sostenibles y diseñados para reducir tu huella de carbono. ¡Visita nuestro sitio web para obtener más información y descuentos especiales de lanzamiento!"
                        ></textarea>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <Label>French Translation</Label>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-3 w-3 mr-1" /> Regenerate
                          </Button>
                        </div>
                        <textarea
                          className="w-full p-2 border rounded-md min-h-[100px] mt-2"
                          defaultValue="Découvrez notre nouvelle gamme de produits écologiques ! Fabriqués avec des matériaux durables et conçus pour réduire votre empreinte carbone. Consultez notre site Web pour plus d'informations et des remises spéciales de lancement !"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Users className="h-4 w-4 mr-2" /> Target Audience
                  </Button>
                  <Button>
                    <Save className="h-4 w-4 mr-2" /> Save Translations
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DynamicEnhancements;
