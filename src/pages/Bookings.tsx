import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, ChevronDown, PlusCircle, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Bookings = () => {
  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Bookings</h1>
          <Button className="bg-emplify-600 hover:bg-emplify-700">
            <PlusCircle className="mr-2 h-4 w-4" /> New Booking
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search bookings..."
                      className="pl-8"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="w-full md:w-auto">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Date Range
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto">
                      Filter <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-sm">Booking ID</th>
                        <th className="text-left py-3 px-2 text-sm">Guest</th>
                        <th className="text-left py-3 px-2 text-sm">Room</th>
                        <th className="text-left py-3 px-2 text-sm">Check-in</th>
                        <th className="text-left py-3 px-2 text-sm">Check-out</th>
                        <th className="text-left py-3 px-2 text-sm">Status</th>
                        <th className="text-right py-3 px-2 text-sm">Amount</th>
                        <th className="text-right py-3 px-2 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array(8)
                        .fill(0)
                        .map((_, index) => (
                          <tr key={index} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-2">
                              <span className="font-mono text-sm">#BK{(20250 + index).toString().padStart(5, '0')}</span>
                            </td>
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
                              {['Suite 101', 'Deluxe 204', 'Standard 312', 'Premium 405', 'Suite 107', 'Standard 210', 'Deluxe 315', 'Premium 408'][index]}
                            </td>
                            <td className="py-3 px-2">
                              {['May 15, 2025', 'May 16, 2025', 'May 16, 2025', 'May 17, 2025', 'May 18, 2025', 'May 19, 2025', 'May 20, 2025', 'May 21, 2025'][index]}
                            </td>
                            <td className="py-3 px-2">
                              {['May 18, 2025', 'May 20, 2025', 'May 19, 2025', 'May 22, 2025', 'May 20, 2025', 'May 22, 2025', 'May 23, 2025', 'May 24, 2025'][index]}
                            </td>
                            <td className="py-3 px-2">
                              <Badge className={
                                index % 4 === 0 ? "bg-green-100 text-green-800 hover:bg-green-200" :
                                index % 4 === 1 ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                                index % 4 === 2 ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                                "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              }>
                                {index % 4 === 0 ? "Confirmed" : 
                                 index % 4 === 1 ? "Pending" : 
                                 index % 4 === 2 ? "Checked In" : 
                                 "Completed"}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 text-right font-medium">
                              ${['450', '320', '280', '520', '450', '290', '350', '490'][index]}
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
                  <p className="text-sm text-muted-foreground">Showing 1-8 of 120 bookings</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tab contents would be implemented similarly */}
          <TabsContent value="upcoming" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Showing upcoming bookings...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Showing active bookings...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="past" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Past Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Showing past bookings...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Bookings;
