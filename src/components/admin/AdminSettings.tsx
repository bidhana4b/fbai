import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure global platform settings and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Basic platform configuration options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input
                id="platform-name"
                defaultValue="Facebook Page AI Assistant"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-email">Support Email</Label>
              <Input
                id="support-email"
                type="email"
                defaultValue="support@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform-description">Platform Description</Label>
              <Textarea
                id="platform-description"
                defaultValue="A comprehensive AI dashboard that helps users manage their Facebook business pages with automated content creation, scheduling, and engagement tools."
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              <Switch id="maintenance-mode" />
            </div>

            <Button className="mt-4">Save Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>
              Configure external API integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook-app-id">Facebook App ID</Label>
              <Input id="facebook-app-id" defaultValue="123456789012345" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook-app-secret">Facebook App Secret</Label>
              <Input
                id="facebook-app-secret"
                type="password"
                defaultValue="••••••••••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-facebook-api">Enable Facebook API</Label>
              <Switch id="enable-facebook-api" defaultChecked />
            </div>

            <Button className="mt-4">Save API Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
