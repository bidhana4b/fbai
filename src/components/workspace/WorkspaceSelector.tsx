import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createWorkspace } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ChevronDown, Plus, Loader2 } from "lucide-react";

const WorkspaceSelector = () => {
  const {
    user,
    workspaces,
    currentWorkspace,
    setCurrentWorkspace,
    refreshWorkspaces,
  } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsCreating(true);
    setError(null);

    try {
      const { workspace, error } = await createWorkspace(
        newWorkspaceName,
        user.id,
      );
      if (error) throw new Error(error.message);

      await refreshWorkspaces();
      setNewWorkspaceName("");
      setIsDialogOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to create workspace");
    } finally {
      setIsCreating(false);
    }
  };

  if (!currentWorkspace) return null;

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between w-[200px]">
            <span className="truncate">{currentWorkspace.name}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {workspaces.map((workspace) => (
            <DropdownMenuItem
              key={workspace.id}
              className={workspace.id === currentWorkspace.id ? "bg-muted" : ""}
              onClick={() => setCurrentWorkspace(workspace)}
            >
              <span className="truncate">{workspace.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start p-2 h-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Workspace
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Workspace</DialogTitle>
                <DialogDescription>
                  Create a new workspace to manage your Facebook pages.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateWorkspace}>
                <div className="space-y-4 py-4">
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <div className="space-y-2">
                    <Label htmlFor="name">Workspace Name</Label>
                    <Input
                      id="name"
                      value={newWorkspaceName}
                      onChange={(e) => setNewWorkspaceName(e.target.value)}
                      placeholder="My Workspace"
                      required
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
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Workspace"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default WorkspaceSelector;
