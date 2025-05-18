export interface UserProfile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  is_super_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface Workspace {
  id: string;
  name: string;
  owner_id: string;
  plan_id?: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role_id: number;
  created_at: string;
  updated_at: string;
  user?: UserProfile;
  role?: Role;
}

export interface FacebookPage {
  id: string;
  workspace_id: string;
  page_id: string;
  page_name: string;
  page_token?: string;
  page_image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  interval: string;
  features: {
    max_pages: number;
    ai_captions: boolean;
    ai_images: boolean;
    analytics: string;
    team_members: number;
  };
  created_at: string;
  updated_at: string;
}

export interface FeatureFlag {
  id: number;
  name: string;
  description?: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceFeatureFlag {
  id: string;
  workspace_id: string;
  feature_id: number;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  feature?: FeatureFlag;
}
