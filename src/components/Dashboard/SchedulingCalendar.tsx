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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Repeat,
  MoreHorizontal,
  Image,
  Edit,
  Trash2,
} from "lucide-react";

interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  scheduledDate: Date;
  isRecurring: boolean;
  recurringPattern?: string;
}

const SchedulingCalendar = () => {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data for scheduled posts
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: "1",
      title: "Weekly Product Showcase",
      content: "Check out our latest product features and updates!",
      imageUrl:
        "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&q=80",
      scheduledDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      isRecurring: true,
      recurringPattern: "Weekly",
    },
    {
      id: "2",
      title: "Customer Testimonial",
      content: "Hear what our customers are saying about our services!",
      imageUrl:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
      scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      isRecurring: false,
    },
    {
      id: "3",
      title: "Tips & Tricks",
      content:
        "Learn how to maximize your social media presence with these simple tips.",
      scheduledDate: new Date(new Date().setDate(new Date().getDate() + 4)),
      isRecurring: false,
    },
  ]);

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const navigateDay = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleCreatePost = () => {
    // In a real app, this would create a new post and add it to the scheduledPosts array
    setIsCreateDialogOpen(false);
  };

  const formatDateRange = () => {
    if (view === "month") {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(currentDate);
    } else if (view === "week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return `${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(startOfWeek)} - ${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(endOfWeek)}`;
    } else {
      return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(currentDate);
    }
  };

  const renderMonthView = () => {
    // This would be a full calendar month view
    return (
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium py-2">
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }).map((_, index) => {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            index -
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                1,
              ).getDay() +
              1,
          );
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = new Date().toDateString() === date.toDateString();
          const postsForDay = scheduledPosts.filter(
            (post) => post.scheduledDate.toDateString() === date.toDateString(),
          );

          return (
            <div
              key={index}
              className={`min-h-24 border rounded-md p-1 ${isCurrentMonth ? "bg-background" : "bg-muted/30"} ${isToday ? "border-primary" : "border-border"}`}
              onClick={() => setSelectedDate(date)}
            >
              <div
                className={`text-xs font-medium ${isToday ? "text-primary" : ""}`}
              >
                {date.getDate()}
              </div>
              <div className="mt-1">
                {postsForDay.slice(0, 2).map((post) => (
                  <div
                    key={post.id}
                    className="text-xs bg-primary/10 rounded p-1 mb-1 truncate"
                  >
                    {post.title}
                  </div>
                ))}
                {postsForDay.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{postsForDay.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    // This would be a week view with hourly slots
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-8 gap-1">
          <div className="font-medium py-2"></div>
          {days.map((day, index) => {
            const isToday = new Date().toDateString() === day.toDateString();
            return (
              <div
                key={index}
                className={`text-center py-2 ${isToday ? "text-primary font-bold" : ""}`}
              >
                <div>
                  {
                    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                      day.getDay()
                    ]
                  }
                </div>
                <div>{day.getDate()}</div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 12 }).map((_, hourIndex) => {
            const hour = hourIndex + 8; // Start from 8 AM
            return (
              <React.Fragment key={hourIndex}>
                <div className="text-xs text-right pr-2 py-2">
                  {hour % 12 || 12}
                  {hour < 12 ? "am" : "pm"}
                </div>
                {days.map((day, dayIndex) => {
                  const postsAtHour = scheduledPosts.filter((post) => {
                    const postDate = post.scheduledDate;
                    return (
                      postDate.toDateString() === day.toDateString() &&
                      postDate.getHours() === hour
                    );
                  });

                  return (
                    <div
                      key={dayIndex}
                      className="border border-border min-h-16 relative"
                    >
                      {postsAtHour.map((post) => (
                        <div
                          key={post.id}
                          className="absolute inset-0 m-1 bg-primary/10 rounded p-1 text-xs overflow-hidden"
                        >
                          {post.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    // This would be a detailed day view
    return (
      <div className="flex flex-col space-y-2">
        <div className="text-lg font-medium">
          {new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          }).format(currentDate)}
        </div>
        <div className="space-y-2">
          {Array.from({ length: 12 }).map((_, hourIndex) => {
            const hour = hourIndex + 8; // Start from 8 AM
            const postsAtHour = scheduledPosts.filter((post) => {
              const postDate = post.scheduledDate;
              return (
                postDate.toDateString() === currentDate.toDateString() &&
                postDate.getHours() === hour
              );
            });

            return (
              <div key={hourIndex} className="flex">
                <div className="w-16 text-right pr-4 py-2 text-sm">
                  {hour % 12 || 12}
                  {hour < 12 ? "am" : "pm"}
                </div>
                <div className="flex-1 border-l pl-4 min-h-16">
                  {postsAtHour.length > 0 ? (
                    postsAtHour.map((post) => (
                      <Card key={post.id} className="mb-2">
                        <CardHeader className="py-2">
                          <CardTitle className="text-sm">
                            {post.title}
                          </CardTitle>
                          {post.isRecurring && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Repeat className="h-3 w-3 mr-1" />
                              {post.recurringPattern}
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="text-xs">{post.content}</p>
                          {post.imageUrl && (
                            <div className="mt-2">
                              <img
                                src={post.imageUrl}
                                alt="Post preview"
                                className="rounded-md h-20 object-cover"
                              />
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="py-2 flex justify-end space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="h-16 flex items-center justify-center border border-dashed rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCreateDialogOpen(true)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Post
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background p-6 rounded-lg h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Scheduling Calendar</h2>
        <div className="flex items-center space-x-4">
          <Tabs defaultValue={view}>
            <TabsList>
              <TabsTrigger value="month" onClick={() => setView("month")}>
                Month
              </TabsTrigger>
              <TabsTrigger value="week" onClick={() => setView("week")}>
                Week
              </TabsTrigger>
              <TabsTrigger value="day" onClick={() => setView("day")}>
                Day
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (view === "month") navigateMonth("prev");
              else if (view === "week") navigateWeek("prev");
              else navigateDay("prev");
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (view === "month") navigateMonth("next");
              else if (view === "week") navigateWeek("next");
              else navigateDay("next");
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-medium">{formatDateRange()}</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Posts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="recurring">Recurring</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex h-[calc(100%-140px)]">
        <div className="w-3/4 pr-4">
          <Card className="h-full">
            <CardContent className="p-4 h-full overflow-auto">
              {view === "month" && renderMonthView()}
              {view === "week" && renderWeekView()}
              {view === "day" && renderDayView()}
            </CardContent>
          </Card>
        </div>
        <div className="w-1/4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Content Queue</CardTitle>
              <CardDescription>Drag posts to schedule them</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-350px)]">
                <div className="space-y-4">
                  {scheduledPosts.map((post) => (
                    <Card key={post.id} className="cursor-move">
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p className="text-xs truncate">{post.content}</p>
                        {post.imageUrl && (
                          <div className="mt-2 relative h-16 w-full">
                            <img
                              src={post.imageUrl}
                              alt="Post preview"
                              className="rounded-md h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="py-2 flex justify-between">
                        <div className="text-xs text-muted-foreground flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                          }).format(post.scheduledDate)}
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Schedule a new post for your Facebook page.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Post Title</Label>
              <Input id="title" placeholder="Enter a title for your post" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label>Add Media</Label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Image className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag and drop an image or click to browse
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Upload Image
                </Button>
              </div>
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label htmlFor="schedule-date">Schedule Date & Time</Label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input id="schedule-date" type="date" />
                </div>
                <div className="flex-1">
                  <Input id="schedule-time" type="time" />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="recurring" />
              <Label htmlFor="recurring">Make this a recurring post</Label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="recurring-pattern">Repeat</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreatePost}>Schedule Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchedulingCalendar;
