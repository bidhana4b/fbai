-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workspaces table
CREATE TABLE IF NOT EXISTS workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workspace_members table
CREATE TABLE IF NOT EXISTS workspace_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(workspace_id, user_id)
);

-- Create facebook_pages table
CREATE TABLE IF NOT EXISTS facebook_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  page_id TEXT NOT NULL,
  page_name TEXT NOT NULL,
  page_token TEXT,
  page_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(workspace_id, page_id)
);

-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  interval TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feature_flags table
CREATE TABLE IF NOT EXISTS feature_flags (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workspace_feature_flags table
CREATE TABLE IF NOT EXISTS workspace_feature_flags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  feature_id INTEGER NOT NULL REFERENCES feature_flags(id) ON DELETE CASCADE,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(workspace_id, feature_id)
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  is_super_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
('owner', 'Workspace owner with full access'),
('admin', 'Administrator with most permissions'),
('editor', 'Can create and edit content'),
('analyst', 'Can view analytics only'),
('support', 'Can handle messages and comments')
ON CONFLICT (name) DO NOTHING;

-- Insert default subscription plans
INSERT INTO subscription_plans (id, name, description, price, interval, features) VALUES
('basic', 'Basic', 'Essential features for small businesses', 9.99, 'month', '{"max_pages": 1, "ai_captions": true, "ai_images": false, "analytics": "basic", "team_members": 1}'),
('pro', 'Professional', 'Advanced features for growing businesses', 29.99, 'month', '{"max_pages": 5, "ai_captions": true, "ai_images": true, "analytics": "advanced", "team_members": 3}'),
('enterprise', 'Enterprise', 'Complete solution for large businesses', 99.99, 'month', '{"max_pages": 20, "ai_captions": true, "ai_images": true, "analytics": "premium", "team_members": 10}')
ON CONFLICT (id) DO NOTHING;

-- Insert default feature flags
INSERT INTO feature_flags (name, description, enabled) VALUES
('ai_captions', 'AI-powered caption generation', true),
('ai_images', 'AI-powered image generation', true),
('analytics_basic', 'Basic analytics features', true),
('analytics_advanced', 'Advanced analytics features', true),
('analytics_premium', 'Premium analytics features', true),
('team_management', 'Team member management', true),
('multi_page', 'Multiple Facebook page management', true)
ON CONFLICT (name) DO NOTHING;

-- Enable realtime
alter publication supabase_realtime add table workspaces;
alter publication supabase_realtime add table workspace_members;
alter publication supabase_realtime add table facebook_pages;
