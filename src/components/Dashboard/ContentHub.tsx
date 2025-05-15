import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ImageIcon,
  MessageSquare,
  Wand2Icon,
  SaveIcon,
  CalendarIcon,
  RefreshCw,
  Settings2,
} from "lucide-react";

const ContentHub = () => {
  const [activeTab, setActiveTab] = useState("captions");
  const [captionText, setCaptionText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("casual");

  // Mock data for templates
  const captionTemplates = [
    {
      id: "casual",
      name: "Casual & Friendly",
      description: "Conversational tone with emojis",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Formal business language",
    },
    {
      id: "promotional",
      name: "Promotional",
      description: "Sales-focused with CTAs",
    },
    {
      id: "question",
      name: "Question-based",
      description: "Engagement through questions",
    },
  ];

  const imageTemplates = [
    {
      id: "product",
      name: "Product Showcase",
      description: "Highlight products with clean background",
    },
    {
      id: "lifestyle",
      name: "Lifestyle",
      description: "Products in real-world settings",
    },
    {
      id: "quote",
      name: "Quote Cards",
      description: "Text-based inspirational quotes",
    },
    {
      id: "announcement",
      name: "Announcement",
      description: "New product or event announcements",
    },
  ];

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Content Creation Hub</h1>
          <p className="text-muted-foreground">
            Create and manage your Facebook page content
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings2 className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <SaveIcon className="h-4 w-4 mr-2" />
            Save All
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="captions"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="captions" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            AI Caption Generator
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center">
            <ImageIcon className="h-4 w-4 mr-2" />
            AI Image Creator
          </TabsTrigger>
        </TabsList>

        <TabsContent value="captions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Caption Templates</CardTitle>
                  <CardDescription>
                    Select a template or create your own
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-2">
                      {captionTemplates.map((template) => (
                        <div
                          key={template.id}
                          className={`p-3 rounded-md cursor-pointer border ${selectedTemplate === template.id ? "border-primary bg-primary/5" : "border-border"}`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {template.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <span className="mr-2">+</span> Create New Template
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Prompt</CardTitle>
                  <CardDescription>
                    Customize your AI generation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tone</label>
                    <Select defaultValue="friendly">
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Length</label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">
                          Short (1-2 sentences)
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium (3-4 sentences)
                        </SelectItem>
                        <SelectItem value="long">
                          Long (5+ sentences)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Include</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10"
                      >
                        Hashtags
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10"
                      >
                        Emojis
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10"
                      >
                        Call to Action
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10"
                      >
                        Questions
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Wand2Icon className="h-4 w-4 mr-2" />
                    Generate Caption
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Caption Preview</CardTitle>
                  <CardDescription>
                    Edit and refine your generated caption
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Your AI-generated caption will appear here. You can edit it directly."
                    className="min-h-[200px]"
                    value={captionText}
                    onChange={(e) => setCaptionText(e.target.value)}
                  />

                  <div className="bg-muted/40 rounded-md p-4">
                    <h3 className="text-sm font-medium mb-2">Post Preview</h3>
                    <div className="border rounded-md p-4 bg-background">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=business" />
                          <AvatarFallback>BP</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Business Page</div>
                          <div className="text-xs text-muted-foreground">
                            Just now
                          </div>
                        </div>
                      </div>
                      <p className="text-sm mb-3">
                        {captionText ||
                          "Your caption will appear here. Generate a caption or start typing to see a preview of how your post will look."}
                      </p>
                      <div className="bg-muted h-40 rounded-md flex items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button>
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Image Templates</CardTitle>
                  <CardDescription>
                    Select a template or create your own
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-2">
                      {imageTemplates.map((template) => (
                        <div
                          key={template.id}
                          className="p-3 rounded-md cursor-pointer border border-border hover:border-primary/50"
                        >
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {template.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <span className="mr-2">+</span> Create New Template
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Image Prompt</CardTitle>
                  <CardDescription>
                    Describe the image you want to create
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Describe the image you want to generate..."
                    className="min-h-[100px]"
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Style</label>
                    <Select defaultValue="realistic">
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realistic">Realistic</SelectItem>
                        <SelectItem value="cartoon">Cartoon</SelectItem>
                        <SelectItem value="abstract">Abstract</SelectItem>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                        <SelectItem value="3d">3D Rendered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Aspect Ratio</label>
                    <Select defaultValue="square">
                      <SelectTrigger>
                        <SelectValue placeholder="Select aspect ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Square (1:1)</SelectItem>
                        <SelectItem value="portrait">Portrait (4:5)</SelectItem>
                        <SelectItem value="landscape">
                          Landscape (16:9)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Wand2Icon className="h-4 w-4 mr-2" />
                    Generate Image
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Image Preview</CardTitle>
                  <CardDescription>
                    Preview and edit your generated image
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted h-[400px] rounded-md flex items-center justify-center mb-4">
                    <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-muted h-20 rounded-md flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <div className="bg-muted h-20 rounded-md flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <div className="bg-muted h-20 rounded-md flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <div className="bg-muted h-20 rounded-md flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save Image
                    </Button>
                    <Button>
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Use in Post
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentHub;
