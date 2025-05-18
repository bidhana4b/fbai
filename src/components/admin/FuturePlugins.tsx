import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FuturePlugins = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Future Plugins</CardTitle>
        <CardDescription>Manage and configure platform plugins</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-8 text-center text-muted-foreground">
          Plugin management functionality coming soon.
        </div>
      </CardContent>
    </Card>
  );
};

export default FuturePlugins;
