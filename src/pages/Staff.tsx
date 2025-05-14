import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Staff = () => {
  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <Button className="bg-emplify-600 hover:bg-emplify-700">
            <UserPlus className="mr-2 h-4 w-4" /> Add Staff Member
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Staff</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
            <TabsTrigger value="housekeeping">Housekeeping</TabsTrigger>
            <TabsTrigger value="frontdesk">Front Desk</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Staff Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search staff..."
                      className="pl-8"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="w-full md:w-auto">
                      Department <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto">
                      Export 
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array(9)
                    .fill(0)
                    .map((_, index) => (
                      <Card key={index} className="hover-card">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="h-12 w-12 rounded-full bg-emplify-100 flex items-center justify-center">
                              <span className="font-medium text-emplify-600">
                                {['SM', 'LJ', 'KW', 'BT', 'ER', 'PM', 'AH', 'TC', 'JR'][index]}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">
                                {[
                                  'Sarah Miller',
                                  'Luis Johnson',
                                  'Karen Wilson',
                                  'Brian Thompson',
                                  'Emma Rodriguez',
                                  'Paul Martinez',
                                  'Anna Harris',
                                  'Tom Clark',
                                  'Jessica Reed'
                                ][index]}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {[
                                  'General Manager',
                                  'Assistant Manager',
                                  'Front Desk Lead',
                                  'Front Desk Agent',
                                  'Housekeeping Manager',
                                  'Housekeeping Staff',
                                  'Maintenance',
                                  'Security',
                                  'Food & Beverage'
                                ][index]}
                              </p>
                              <div className="mt-3 flex items-center text-sm">
                                <span className="text-muted-foreground mr-4">{[
                                  'Full-time',
                                  'Full-time',
                                  'Full-time',
                                  'Part-time',
                                  'Full-time',
                                  'Part-time',
                                  'Full-time',
                                  'Full-time',
                                  'Part-time'
                                ][index]}</span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  index % 3 === 0
                                    ? "bg-green-100 text-green-800"
                                    : index % 3 === 1
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                                }`}>
                                  {[
                                    'Management',
                                    'Management',
                                    'Front Desk',
                                    'Front Desk',
                                    'Housekeeping',
                                    'Housekeeping',
                                    'Maintenance',
                                    'Security',
                                    'F&B'
                                  ][index]}
                                </span>
                              </div>
                              <div className="mt-4 flex space-x-2">
                                <Button size="sm" variant="outline">View Profile</Button>
                                <Button size="sm" variant="outline">Schedule</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">Showing 9 of 24 staff members</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tab contents would follow the same pattern */}
          <TabsContent value="management" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Management Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Showing management staff...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="housekeeping" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Housekeeping Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Showing housekeeping staff...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="frontdesk" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Front Desk Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Showing front desk staff...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Staff;
