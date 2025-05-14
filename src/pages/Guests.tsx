
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Guests = () => {
  return (
    <AppLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Guests</h1>
        <p className="text-muted-foreground">Manage your property guests and their information.</p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Active Guests</CardTitle>
              <CardDescription>Currently checked-in guests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Arriving Today</CardTitle>
              <CardDescription>Expected check-ins</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Departing Today</CardTitle>
              <CardDescription>Expected check-outs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Guest Activity</CardTitle>
            <CardDescription>Latest guest check-ins and check-outs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="font-medium">Sarah Johnson</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Room 204 • Check-in</span>
                  <span className="text-muted-foreground">Today, 2:15 PM</span>
                </div>
              </div>
              <div className="border-b pb-2">
                <p className="font-medium">Michael Brown</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Room 318 • Check-in</span>
                  <span className="text-muted-foreground">Today, 1:45 PM</span>
                </div>
              </div>
              <div className="border-b pb-2">
                <p className="font-medium">Emma Wilson</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Room 112 • Check-out</span>
                  <span className="text-muted-foreground">Today, 11:30 AM</span>
                </div>
              </div>
              <div className="border-b pb-2">
                <p className="font-medium">Robert Garcia</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Room 245 • Check-out</span>
                  <span className="text-muted-foreground">Today, 10:20 AM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Guests;
