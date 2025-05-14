
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, ChevronDown } from "lucide-react";

const Users = () => {
  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Users</h1>
          <Button className="bg-emplify-600 hover:bg-emplify-700">
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="w-full md:w-auto">
                  Filter <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full md:w-auto">
                  Export 
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm">Name</th>
                    <th className="text-left py-3 px-2 text-sm">Email</th>
                    <th className="text-left py-3 px-2 text-sm">Phone</th>
                    <th className="text-left py-3 px-2 text-sm">Total Bookings</th>
                    <th className="text-left py-3 px-2 text-sm">Status</th>
                    <th className="text-right py-3 px-2 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(8)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-emplify-100 flex items-center justify-center">
                              <span className="font-medium text-emplify-600">
                                {['JD', 'AS', 'RK', 'MT', 'BL', 'CP', 'EW', 'DM'][index]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">
                                {['John Doe', 'Alice Smith', 'Robert Kim', 'Maria Torres', 'Ben Lewis', 'Carol Peters', 'Emma Watson', 'David Miller'][index]}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          {['john@example.com', 'alice@example.com', 'robert@example.com', 'maria@example.com', 'ben@example.com', 'carol@example.com', 'emma@example.com', 'david@example.com'][index]}
                        </td>
                        <td className="py-3 px-2">
                          {['(123) 456-7890', '(234) 567-8901', '(345) 678-9012', '(456) 789-0123', '(567) 890-1234', '(678) 901-2345', '(789) 012-3456', '(890) 123-4567'][index]}
                        </td>
                        <td className="py-3 px-2">
                          {[5, 3, 2, 7, 4, 1, 6, 2][index]}
                        </td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            index % 3 === 0
                              ? "bg-green-100 text-green-800"
                              : index % 3 === 1
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {index % 3 === 0
                              ? "Active"
                              : index % 3 === 1
                              ? "Pending"
                              : "Inactive"}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">Showing 1-8 of 100 users</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Users;
