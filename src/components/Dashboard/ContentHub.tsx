import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/auth";
import { FeatureFlag } from "@/types/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  ImageIcon,
  MessageSquare,
  Wand2Icon,
  SaveIcon,
  CalendarIcon,
  RefreshCw,
  Settings2,
  Loader2,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const ContentHub = () => {
  const [activeTab, setActiveTab] = useState("captions");
  const [captionText, setCaptionText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("casual");
  const [captionPrompt, setCaptionPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [selectedTone, setSelectedTone] = useState("friendly");
  const [selectedLength, setSelectedLength] = useState("medium");
  const [selectedStyle, setSelectedStyle] = useState("realistic");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("square");
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [generatedVariations, setGeneratedVariations] = useState<string[]>([]);
  const { toast } = useToast();

  // Initialize Supabase client with proper environment variable checks
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration Required</CardTitle>
            <CardDescription>
              Please connect to Supabase by clicking the "Connect to Supabase" button in the top right corner. This will help you set up your environment variables.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Once connected, you'll be able to use all features of the Content Hub.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Function to generate caption using Gemini AI
  const generateCaption = async () => {
    if (!captionPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic or prompt for your caption",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingCaption(true);

    try {
      // Call the Edge Function to generate caption
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-generate-caption",
        {
          body: {
            prompt: captionPrompt,
            maxTokens:
              selectedLength === "short"
                ? 100
                : selectedLength === "medium"
                  ? 200
                  : 300,
            temperature:
              selectedTone === "formal"
                ? 0.3
                : selectedTone === "professional"
                  ? 0.5
                  : 0.8,
          },
        },
      );

      if (error) throw new Error(error.message);

      if (data?.text) {
        setCaptionText(data.text);
        toast({
          title: "Caption Generated",
          description: "Your AI caption has been created successfully",
        });
      } else if (data?.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error generating caption:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate caption",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  // Function to generate image using Gemini AI
  const generateImage = async () => {
    if (!imagePrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for your image",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingImage(true);

    try {
      // Determine dimensions based on aspect ratio
      let width = 1024;
      let height = 1024;

      if (selectedAspectRatio === "portrait") {
        width = 800;
        height = 1000;
      } else if (selectedAspectRatio === "landscape") {
        width = 1280;
        height = 720;
      }

      // Call the Edge Function to generate image
      const { data, error } = await supabase.functions.invoke(
        "generate-image",
        {
          body: {
            prompt: `${selectedStyle} style image of ${imagePrompt}`,
            width,
            height,
          },
        },
      );

      if (error) throw new Error(error.message);

      if (data?.imageUrl) {
        setGeneratedImageUrl(data.imageUrl);

        // Generate variations with different seeds for demonstration
        const variations = [];
        for (let i = 1; i <= 4; i++) {
          variations.push(
            `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(imagePrompt + i)}&width=${width}&height=${height}`,
          );
        }
        setGeneratedVariations(variations);

        toast({
          title: "Image Generated",
          description: "Your AI image has been created successfully",
        });
      } else if (data?.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

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
                    <select
                      value={selectedTone}
                      onChange={(e) => setSelectedTone(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="friendly">Friendly</option>
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="humorous">Humorous</option>
                      <option value="formal">Formal</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Length</label>
                    <select
                      value={selectedLength}
                      onChange={(e) => setSelectedLength(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="short">Short (1-2 sentences)</option>
                      <option value="medium">Medium (3-4 sentences)</option>
                      <option value="long">Long (5+ sentences)</option>
                    </select>
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Topic or Prompt
                    </label>
                    <Input
                      placeholder="Enter a topic for your caption..."
                      value={captionPrompt}
                      onChange={(e) => setCaptionPrompt(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={generateCaption}
                    disabled={isGeneratingCaption || !captionPrompt.trim()}
                  >
                    {isGeneratingCaption ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2Icon className="h-4 w-4 mr-2" />
                        Generate Caption
                      </>
                    )}
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
                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
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
                  <Button
                    variant="outline"
                    onClick={generateCaption}
                    disabled={isGeneratingCaption || !captionPrompt.trim()}
                  >
                    {isGeneratingCaption ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
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
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Style</label>
                    <select
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="realistic">Realistic</option>
                      <option value="cartoon">Cartoon</option>
                      <option value="abstract">Abstract</option>
                      <option value="minimalist">Minimalist</option>
                      <option value="3d">3D Rendered</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Aspect Ratio</label>
                    <select
                      value={selectedAspectRatio}
                      onChange={(e) => setSelectedAspectRatio(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="square">Square (1:1)</option>
                      <option value="portrait">Portrait (4:5)</option>
                      <option value="landscape">Landscape (16:9)</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={generateImage}
                    disabled={isGeneratingImage || !imagePrompt.trim()}
                  >
                    {isGeneratingImage ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2Icon className="h-4 w-4 mr-2" />
                        Generate Image
                      </>
                    )}
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
                    {generatedImageUrl ? (
                      <img
                        src={generatedImageUrl}
                        alt="Generated image"
                        className="h-full w-full object-contain rounded-md"
                      />
                    ) : (
                      <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {generatedVariations.length > 0 ? (
                      generatedVariations.map((url, index) => (
                        <div
                          key={index}
                          className="bg-muted h-20 rounded-md flex items-center justify-center overflow-hidden cursor-pointer"
                          onClick={() => setGeneratedImageUrl(url)}
                        >
                          <img
                            src={url}
                            alt={`Variation ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={generateImage}
                    disabled={isGeneratingImage || !imagePrompt.trim()}
                  >
                    {isGeneratingImage ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
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