
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MobileNavigation from "@/components/layout/MobileNavigation";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Desktop Sidebar - Hidden on mobile */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full">
          {/* Fixed Top Navigation */}
          <div className="sticky top-0 z-10 w-full">
            <Navbar />
          </div>
          
          <main className="flex-1 overflow-auto p-4 md:p-6 pb-24 md:pb-6">
            {children}
          </main>
          
          {/* Mobile Bottom Navigation */}
          <MobileNavigation />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
