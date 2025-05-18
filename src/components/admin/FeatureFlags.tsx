import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/auth";
import { FeatureFlag } from "@/types/auth";
import { Button } from "@/components/ui/button";
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
import { Loader2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const FeatureFlags = () => {
  const [features, setFeatures] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFeature, setNewFeature] = useState<Partial<FeatureFlag>>({
    name: "",
    description: "",
    enabled: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("feature_flags")
        .select("*")
        .order("name");

      if (error) throw error;
      setFeatures(data);
    } catch (error) {
      console.error("Error fetching features:", error);
      toast({
        title: "Error fetching features",
        description: "Could not load feature flags.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeature = async (
    featureId: number,
    currentValue: boolean,
  ) => {
    try {
      const { error } = await supabase
        .from("feature_flags")
        .update({ enabled: !currentValue })
        .eq("id", featureId);

      if (error) throw error;

      // Update local state
      setFeatures(
        features.map((feature) =>
          feature.id === featureId
            ? { ...feature, enabled: !currentValue }
            : feature,
        ),
      );

      toast({
        title: "Feature updated",
        description: `Feature ${!currentValue ? "enabled" : "disabled"} successfully.`,
      });
    } catch (error) {
      console.error("Error updating feature:", error);
      toast({
        title: "Update failed",
        description: "Could not update feature status.",
        variant: "destructive",
      });
    }
  };

  const handleCreateFeature = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { data, error } = await supabase
        .from("feature_flags")
        .insert({
          name: newFeature.name,
          description: newFeature.description,
          enabled: newFeature.enabled,
        })
        .select();

      if (error) throw error;

      toast({
        title: "Feature created",
        description: "New feature flag has been created successfully.",
      });

      setFeatures([...features, data[0]]);
      setIsDialogOpen(false);
      setNewFeature({ name: "", description: "", enabled: true });
    } catch (error) {
      console.error("Error creating feature:", error);
      toast({
        title: "Creation failed",
        description: "Could not create new feature flag.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Feature Flags</CardTitle>
          <CardDescription>
            Manage platform-wide feature availability
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Feature Flag</DialogTitle>
              <DialogDescription>
                Add a new feature flag to control functionality across the
                platform.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateFeature}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Feature Name</Label>
                  <Input
                    id="name"
                    value={newFeature.name}
                    onChange={(e) =>
                      setNewFeature({ ...newFeature, name: e.target.value })
                    }
                    placeholder="feature_name"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Use snake_case for feature names (e.g., advanced_analytics)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newFeature.description}
                    onChange={(e) =>
                      setNewFeature({
                        ...newFeature,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe what this feature controls"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="enabled">Enabled by Default</Label>
                  <Switch
                    id="enabled"
                    checked={newFeature.enabled}
                    onCheckedChange={(checked) =>
                      setNewFeature({ ...newFeature, enabled: checked })
                    }
                  />
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
                      Creating...
                    </>
                  ) : (
                    "Create Feature"
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
        ) : features.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No feature flags found. Create one to get started.
          </div>
        ) : (
          <div className="space-y-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center justify-between p-4 border rounded-md"
              >
                <div>
                  <h3 className="font-medium">{feature.name}</h3>
                  {feature.description && (
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  )}
                </div>
                <Switch
                  checked={feature.enabled}
                  onCheckedChange={() =>
                    handleToggleFeature(feature.id, feature.enabled)
                  }
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeatureFlags;
