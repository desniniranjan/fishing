
import { Home, Users, Calendar, Building } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const mobileNavItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Users", href: "/users", icon: Users },
    { name: "Bookings", href: "/bookings", icon: Calendar },
    { name: "Staff", href: "/staff", icon: Users },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <div className="flex justify-around">
        {mobileNavItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.href)}
            className={cn(
              "mobile-tab w-full",
              currentPath === item.href ? "active" : ""
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
