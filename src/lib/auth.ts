import { createClient } from "@supabase/supabase-js";
import { UserProfile, Workspace, WorkspaceMember, Role } from "@/types/auth";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication functions
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signUp(
  email: string,
  password: string,
  fullName: string,
) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (authError) return { data: null, error: authError };

  // Create user profile
  if (authData.user) {
    const { error: profileError } = await supabase
      .from("user_profiles")
      .insert({
        id: authData.user.id,
        full_name: fullName,
        is_super_admin: false,
      });

    if (profileError) return { data: null, error: profileError };
  }

  return { data: authData, error: null };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error || !session) return { user: null, error };

  return { user: session.user, error: null };
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  return { profile: data as UserProfile | null, error };
}

// Workspace functions
export async function createWorkspace(name: string, ownerId: string) {
  const { data, error } = await supabase
    .from("workspaces")
    .insert({
      name,
      owner_id: ownerId,
      plan_id: "basic", // Default to basic plan
    })
    .select()
    .single();

  if (error) return { workspace: null, error };

  // Add owner as a member with owner role
  const { data: ownerRole } = await supabase
    .from("roles")
    .select("id")
    .eq("name", "owner")
    .single();

  if (ownerRole) {
    await supabase.from("workspace_members").insert({
      workspace_id: data.id,
      user_id: ownerId,
      role_id: ownerRole.id,
    });
  }

  return { workspace: data as Workspace, error: null };
}

export async function getUserWorkspaces(userId: string) {
  const { data, error } = await supabase
    .from("workspace_members")
    .select(
      `
      workspace_id,
      workspaces:workspace_id(*),
      roles:role_id(*)
    `,
    )
    .eq("user_id", userId);

  if (error) return { workspaces: [], error };

  const workspaces = data.map((item) => ({
    ...item.workspaces,
    role: item.roles,
  }));

  return { workspaces, error: null };
}

export async function getWorkspaceMembers(workspaceId: string) {
  const { data, error } = await supabase
    .from("workspace_members")
    .select(
      `
      *,
      user:user_id(id, full_name, avatar_url),
      role:role_id(*)
    `,
    )
    .eq("workspace_id", workspaceId);

  return { members: data as WorkspaceMember[], error };
}

export async function inviteWorkspaceMember(
  workspaceId: string,
  email: string,
  roleId: number,
) {
  // In a real app, you would send an email invitation
  // For now, we'll just check if the user exists and add them directly
  const { data: userData, error: userError } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (userError) return { success: false, error: "User not found" };

  const { error } = await supabase.from("workspace_members").insert({
    workspace_id: workspaceId,
    user_id: userData.id,
    role_id: roleId,
  });

  return { success: !error, error: error?.message };
}

export async function removeWorkspaceMember(
  workspaceId: string,
  userId: string,
) {
  const { error } = await supabase
    .from("workspace_members")
    .delete()
    .eq("workspace_id", workspaceId)
    .eq("user_id", userId);

  return { success: !error, error: error?.message };
}

export async function updateMemberRole(
  workspaceId: string,
  userId: string,
  roleId: number,
) {
  const { error } = await supabase
    .from("workspace_members")
    .update({ role_id: roleId })
    .eq("workspace_id", workspaceId)
    .eq("user_id", userId);

  return { success: !error, error: error?.message };
}

export async function getRoles() {
  const { data, error } = await supabase.from("roles").select("*");

  return { roles: data as Role[], error };
}

// Check if user has permission for a specific action
export async function checkPermission(
  userId: string,
  workspaceId: string,
  permission: string,
) {
  // First check if user is super admin
  const { profile, error: profileError } = await getUserProfile(userId);
  if (profileError) return { hasPermission: false };

  if (profile?.is_super_admin) return { hasPermission: true };

  // Check user's role in the workspace
  const { data, error } = await supabase
    .from("workspace_members")
    .select(
      `
      roles:role_id(*)
    `,
    )
    .eq("workspace_id", workspaceId)
    .eq("user_id", userId)
    .single();

  if (error || !data) return { hasPermission: false };

  const role = data.roles.name;

  // Define permissions for each role
  const permissions: Record<string, string[]> = {
    owner: ["all"],
    admin: [
      "manage_members",
      "view_analytics",
      "create_content",
      "edit_content",
      "view_content",
      "manage_pages",
    ],
    editor: ["create_content", "edit_content", "view_content"],
    analyst: ["view_analytics", "view_content"],
    support: ["view_content", "reply_messages"],
  };

  const rolePermissions = permissions[role] || [];
  const hasPermission =
    rolePermissions.includes("all") || rolePermissions.includes(permission);

  return { hasPermission };
}
