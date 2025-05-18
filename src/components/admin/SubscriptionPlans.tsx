import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/auth";
import { SubscriptionPlan } from "@/types/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] =
    useState<Partial<SubscriptionPlan> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("subscription_plans")
        .select("*")
        .order("price", { ascending: true });

      if (error) throw error;
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast({
        title: "Error fetching plans",
        description: "Could not load subscription plans.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (plan?: SubscriptionPlan) => {
    if (plan) {
      setCurrentPlan({
        ...plan,
        features: { ...plan.features },
      });
      setIsEditing(true);
    } else {
      setCurrentPlan({
        id: "",
        name: "",
        description: "",
        price: 0,
        interval: "month",
        features: {
          max_pages: 1,
          ai_captions: true,
          ai_images: false,
          analytics: "basic",
          team_members: 1,
        },
      });
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPlan) return;

    setIsSaving(true);

    try {
      if (isEditing) {
        const { error } = await supabase
          .from("subscription_plans")
          .update({
            name: currentPlan.name,
            description: currentPlan.description,
            price: currentPlan.price,
            interval: currentPlan.interval,
            features: currentPlan.features,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentPlan.id);

        if (error) throw error;

        toast({
          title: "Plan updated",
          description: "The subscription plan has been updated successfully.",
        });
      } else {
        const { error } = await supabase.from("subscription_plans").insert({
          id: currentPlan.id,
          name: currentPlan.name,
          description: currentPlan.description,
          price: currentPlan.price,
          interval: currentPlan.interval,
          features: currentPlan.features,
        });

        if (error) throw error;

        toast({
          title: "Plan created",
          description:
            "The new subscription plan has been created successfully.",
        });
      }

      await fetchPlans();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving plan:", error);
      toast({
        title: "Error saving plan",
        description: "Could not save the subscription plan.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePlan = async (planId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this plan? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase
        .from("subscription_plans")
        .delete()
        .eq("id", planId);

      if (error) throw error;

      toast({
        title: "Plan deleted",
        description: "The subscription plan has been deleted successfully.",
      });

      await fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast({
        title: "Error deleting plan",
        description: "Could not delete the subscription plan.",
        variant: "destructive",
      });
    }
  };

  const updateFeature = (key: string, value: any) => {
    if (!currentPlan) return;

    setCurrentPlan({
      ...currentPlan,
      features: {
        ...currentPlan.features,
        [key]: value,
      },
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>
            Manage your platform subscription plans
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit" : "Create"} Subscription Plan
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update the details of this subscription plan."
                  : "Create a new subscription plan for your platform."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSavePlan}>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="id">Plan ID</Label>
                    <Input
                      id="id"
                      value={currentPlan?.id || ""}
                      onChange={(e) =>
                        setCurrentPlan({ ...currentPlan!, id: e.target.value })
                      }
                      placeholder="basic"
                      required
                      disabled={isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Plan Name</Label>
                    <Input
                      id="name"
                      value={currentPlan?.name || ""}
                      onChange={(e) =>
                        setCurrentPlan({
                          ...currentPlan!,
                          name: e.target.value,
                        })
                      }
                      placeholder="Basic Plan"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={currentPlan?.description || ""}
                    onChange={(e) =>
                      setCurrentPlan({
                        ...currentPlan!,
                        description: e.target.value,
                      })
                    }
                    placeholder="Essential features for small businesses"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={currentPlan?.price || 0}
                      onChange={(e) =>
                        setCurrentPlan({
                          ...currentPlan!,
                          price: parseFloat(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interval">Billing Interval</Label>
                    <select
                      id="interval"
                      className="w-full p-2 border rounded-md"
                      value={currentPlan?.interval || "month"}
                      onChange={(e) =>
                        setCurrentPlan({
                          ...currentPlan!,
                          interval: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="month">Monthly</option>
                      <option value="year">Yearly</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Features</Label>

                  <div className="space-y-2">
                    <Label htmlFor="max_pages">Max Facebook Pages</Label>
                    <Input
                      id="max_pages"
                      type="number"
                      value={currentPlan?.features?.max_pages || 1}
                      onChange={(e) =>
                        updateFeature("max_pages", parseInt(e.target.value))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="team_members">Team Members</Label>
                    <Input
                      id="team_members"
                      type="number"
                      value={currentPlan?.features?.team_members || 1}
                      onChange={(e) =>
                        updateFeature("team_members", parseInt(e.target.value))
                      }
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai_captions">AI Captions</Label>
                    <Switch
                      id="ai_captions"
                      checked={currentPlan?.features?.ai_captions || false}
                      onCheckedChange={(checked) =>
                        updateFeature("ai_captions", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai_images">AI Images</Label>
                    <Switch
                      id="ai_images"
                      checked={currentPlan?.features?.ai_images || false}
                      onCheckedChange={(checked) =>
                        updateFeature("ai_images", checked)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="analytics">Analytics Level</Label>
                    <select
                      id="analytics"
                      className="w-full p-2 border rounded-md"
                      value={currentPlan?.features?.analytics || "basic"}
                      onChange={(e) =>
                        updateFeature("analytics", e.target.value)
                      }
                      required
                    >
                      <option value="basic">Basic</option>
                      <option value="advanced">Advanced</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Plan"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No subscription plans found. Create one to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="text-2xl font-bold mt-2">
                        ${plan.price.toFixed(2)}
                        <span className="text-sm font-normal text-muted-foreground">
                          /{plan.interval}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(plan)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeletePlan(plan.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>{plan.features.max_pages} Facebook Pages</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>{plan.features.team_members} Team Members</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>
                        {plan.features.ai_captions
                          ? "AI Caption Generation"
                          : "No AI Captions"}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>
                        {plan.features.ai_images
                          ? "AI Image Generation"
                          : "No AI Images"}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span className="capitalize">
                        {plan.features.analytics} Analytics
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionPlans;
