import React, { createContext, useContext, useEffect, useState } from "react";
import {
  supabase,
  getCurrentUser,
  getUserProfile,
  getUserWorkspaces,
} from "@/lib/auth";
import { UserProfile, Workspace } from "@/types/auth";

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  workspaces: (Workspace & { role: any })[];
  currentWorkspace: (Workspace & { role: any }) | null;
  loading: boolean;
  setCurrentWorkspace: (workspace: (Workspace & { role: any }) | null) => void;
  refreshWorkspaces: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  workspaces: [],
  currentWorkspace: null,
  loading: true,
  setCurrentWorkspace: () => {},
  refreshWorkspaces: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [workspaces, setWorkspaces] = useState<(Workspace & { role: any })[]>(
    [],
  );
  const [currentWorkspace, setCurrentWorkspace] = useState<
    (Workspace & { role: any }) | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { user: authUser, error } = await getCurrentUser();

      if (authUser) {
        setUser(authUser);
        await refreshProfile();
        await refreshWorkspaces();
      } else {
        setUser(null);
        setProfile(null);
        setWorkspaces([]);
        setCurrentWorkspace(null);
      }

      setLoading(false);
    };

    fetchUserData();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
          await refreshProfile();
          await refreshWorkspaces();
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setProfile(null);
          setWorkspaces([]);
          setCurrentWorkspace(null);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Set first workspace as current if none selected
  useEffect(() => {
    if (workspaces.length > 0 && !currentWorkspace) {
      setCurrentWorkspace(workspaces[0]);
    }
  }, [workspaces, currentWorkspace]);

  const refreshProfile = async () => {
    if (!user) return;

    const { profile: userProfile } = await getUserProfile(user.id);
    if (userProfile) {
      setProfile(userProfile);
    }
  };

  const refreshWorkspaces = async () => {
    if (!user) return;

    const { workspaces: userWorkspaces } = await getUserWorkspaces(user.id);
    if (userWorkspaces) {
      setWorkspaces(userWorkspaces);

      // Update current workspace if it exists in the new list
      if (currentWorkspace) {
        const updatedWorkspace = userWorkspaces.find(
          (w) => w.id === currentWorkspace.id,
        );
        if (updatedWorkspace) {
          setCurrentWorkspace(updatedWorkspace);
        } else if (userWorkspaces.length > 0) {
          setCurrentWorkspace(userWorkspaces[0]);
        } else {
          setCurrentWorkspace(null);
        }
      }
    }
  };

  const value = {
    user,
    profile,
    workspaces,
    currentWorkspace,
    loading,
    setCurrentWorkspace,
    refreshWorkspaces,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
