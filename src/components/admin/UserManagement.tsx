import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/auth";
import { UserProfile } from "@/types/auth";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface UserWithEmail extends UserProfile {
  email?: string;
  workspaces_count?: number;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserWithEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Get user profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("user_profiles")
        .select("*");

      if (profilesError) throw profilesError;

      // Get auth users to get emails
      const { data: authUsers, error: authError } =
        await supabase.auth.admin.listUsers();
      if (authError) throw authError;

      // Get workspace counts
      const { data: workspaceCounts, error: countError } = await supabase
        .from("workspace_members")
        .select("user_id, count", { count: "exact", head: false })
        .group("user_id");

      if (countError) throw countError;

      // Combine the data
      const combinedUsers = profiles.map((profile: UserProfile) => {
        const authUser = authUsers.users.find((u) => u.id === profile.id);
        const workspaceCount = workspaceCounts.find(
          (w) => w.user_id === profile.id,
        );

        return {
          ...profile,
          email: authUser?.email,
          workspaces_count: workspaceCount?.count || 0,
        };
      });

      setUsers(combinedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error fetching users",
        description: "Could not load user data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSuperAdmin = async (userId: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({ is_super_admin: !currentValue })
        .eq("id", userId);

      if (error) throw error;

      // Update local state
      setUsers(
        users.map((user) =>
          user.id === userId
            ? { ...user, is_super_admin: !currentValue }
            : user,
        ),
      );

      toast({
        title: "User updated",
        description: `Super admin status ${!currentValue ? "granted" : "revoked"}.`,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Update failed",
        description: "Could not update user status.",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      user.full_name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage all users in the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="ml-2"
            onClick={fetchUsers}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No users found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Workspaces</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Super Admin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>
                          {user.full_name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>{user.full_name || "Unnamed User"}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email || "No email"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.workspaces_count}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={user.is_super_admin}
                      onCheckedChange={() =>
                        toggleSuperAdmin(user.id, user.is_super_admin)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagement;
