import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getWorkspaceMembers,
  getRoles,
  inviteWorkspaceMember,
  removeWorkspaceMember,
  updateMemberRole,
} from "@/lib/auth";
import { WorkspaceMember, Role } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, UserPlus, Trash2, UserCog } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TeamManagement = () => {
  const { currentWorkspace, user } = useAuth();
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [isInviting, setIsInviting] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<WorkspaceMember | null>(
    null,
  );
  const [newRoleId, setNewRoleId] = useState<number | null>(null);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!currentWorkspace) return;

      setLoading(true);
      try {
        const [membersResult, rolesResult] = await Promise.all([
          getWorkspaceMembers(currentWorkspace.id),
          getRoles(),
        ]);

        if (membersResult.members) setMembers(membersResult.members);
        if (rolesResult.roles) {
          setRoles(rolesResult.roles);
          if (rolesResult.roles.length > 0) {
            // Default to editor role for invites
            const editorRole = rolesResult.roles.find(
              (r) => r.name === "editor",
            );
            setSelectedRoleId(editorRole?.id || rolesResult.roles[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentWorkspace]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWorkspace || !selectedRoleId) return;

    setIsInviting(true);

    try {
      const { success, error } = await inviteWorkspaceMember(
        currentWorkspace.id,
        inviteEmail,
        selectedRoleId,
      );

      if (success) {
        toast({
          title: "Team member invited",
          description: `${inviteEmail} has been added to the workspace.`,
        });

        // Refresh members list
        const { members: updatedMembers } = await getWorkspaceMembers(
          currentWorkspace.id,
        );
        if (updatedMembers) setMembers(updatedMembers);

        setInviteEmail("");
        setIsInviteDialogOpen(false);
      } else {
        toast({
          title: "Invitation failed",
          description: error || "Could not invite team member.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Invitation failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsInviting(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!currentWorkspace) return;

    try {
      const { success } = await removeWorkspaceMember(
        currentWorkspace.id,
        memberId,
      );

      if (success) {
        toast({
          title: "Team member removed",
          description: "The team member has been removed from the workspace.",
        });

        // Update local state
        setMembers(members.filter((m) => m.user_id !== memberId));
      } else {
        toast({
          title: "Removal failed",
          description: "Could not remove team member.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Removal failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWorkspace || !selectedMember || !newRoleId) return;

    setIsUpdatingRole(true);

    try {
      const { success } = await updateMemberRole(
        currentWorkspace.id,
        selectedMember.user_id,
        newRoleId,
      );

      if (success) {
        toast({
          title: "Role updated",
          description: "The team member's role has been updated.",
        });

        // Refresh members list
        const { members: updatedMembers } = await getWorkspaceMembers(
          currentWorkspace.id,
        );
        if (updatedMembers) setMembers(updatedMembers);

        setIsRoleDialogOpen(false);
      } else {
        toast({
          title: "Update failed",
          description: "Could not update team member's role.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingRole(false);
    }
  };

  const openRoleDialog = (member: WorkspaceMember) => {
    setSelectedMember(member);
    setNewRoleId(member.role_id);
    setIsRoleDialogOpen(true);
  };

  if (!currentWorkspace) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Management</CardTitle>
          <CardDescription>No workspace selected</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Team Management</CardTitle>
          <CardDescription>Manage your workspace team members</CardDescription>
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Invite a new member to join your workspace.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInvite}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={selectedRoleId?.toString() || ""}
                    onValueChange={(value) =>
                      setSelectedRoleId(parseInt(value))
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id.toString()}>
                          {role.name.charAt(0).toUpperCase() +
                            role.name.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsInviteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isInviting}>
                  {isInviting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inviting...
                    </>
                  ) : (
                    "Send Invitation"
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
        ) : members.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No team members found. Invite someone to get started.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.user?.avatar_url} />
                        <AvatarFallback>
                          {member.user?.full_name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{member.user?.full_name || "Unknown User"}</div>
                        <div className="text-sm text-muted-foreground">
                          {member.user_id === currentWorkspace.owner_id
                            ? "Owner"
                            : ""}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {member.role?.name || "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(member.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {member.user_id !== user?.id &&
                        member.user_id !== currentWorkspace.owner_id && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openRoleDialog(member)}
                            >
                              <UserCog className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveMember(member.user_id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Role</DialogTitle>
              <DialogDescription>
                Update the role for{" "}
                {selectedMember?.user?.full_name || "this team member"}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateRole}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="newRole">Role</Label>
                  <Select
                    value={newRoleId?.toString() || ""}
                    onValueChange={(value) => setNewRoleId(parseInt(value))}
                  >
                    <SelectTrigger id="newRole">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id.toString()}>
                          {role.name.charAt(0).toUpperCase() +
                            role.name.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRoleDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdatingRole}>
                  {isUpdatingRole ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Role"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TeamManagement;
