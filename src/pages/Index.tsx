
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Calendar, CreditCard, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="hover-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,243</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="hover-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">345</div>
              <p className="text-xs text-muted-foreground">+32 new users</p>
            </CardContent>
          </Card>
          
          <Card className="hover-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">78% occupancy rate</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Bookings */}
        <Card className="hover-card">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Overview of the latest bookings in your property</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm">Guest</th>
                    <th className="text-left py-3 px-2 text-sm">Room</th>
                    <th className="text-left py-3 px-2 text-sm">Check-in</th>
                    <th className="text-left py-3 px-2 text-sm">Check-out</th>
                    <th className="text-right py-3 px-2 text-sm">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-emplify-100 flex items-center justify-center">
                              <span className="font-medium text-emplify-600">
                                {['JD', 'AS', 'RK', 'MT', 'BL'][index]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">
                                {['John Doe', 'Alice Smith', 'Robert Kim', 'Maria Torres', 'Ben Lewis'][index]}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {['2 adults', '1 adult', '2 adults, 1 child', '4 adults', '3 adults'][index]}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          {['Suite 101', 'Deluxe 204', 'Standard 312', 'Premium 405', 'Suite 107'][index]}
                        </td>
                        <td className="py-3 px-2">
                          {['May 15, 2025', 'May 16, 2025', 'May 16, 2025', 'May 17, 2025', 'May 18, 2025'][index]}
                        </td>
                        <td className="py-3 px-2">
                          {['May 18, 2025', 'May 20, 2025', 'May 19, 2025', 'May 22, 2025', 'May 20, 2025'][index]}
                        </td>
                        <td className="py-3 px-2 text-right font-medium">
                          ${['450', '320', '280', '520', '450'][index]}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
