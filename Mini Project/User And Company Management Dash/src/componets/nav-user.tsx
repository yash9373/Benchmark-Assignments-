"use client";

import { LogOut, ChevronsUpDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useAuth } from "@/context/authContext"; // ✅ Import Auth Context
import { useNavigate } from "react-router-dom"; // ✅ Import for redirection

export function NavUser({ user }) {
  const { logout } = useAuth(); // ✅ Get logout function
  const navigate = useNavigate();
  const { isMobile } = useSidebar();

  const handleLogout = () => {
    logout();
    navigate("/sign-in"); // ✅ Redirect to Sign-in Page
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.avatar || "/default-avatar.png"}
                  alt={user?.name || "User"}
                />
                <AvatarFallback className="rounded-lg">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.name || "Guest"}
                </span>
                <span className="truncate text-xs">
                  {user?.email || "user@email.com"}
                </span>
                {user?.role && (
                  <span className="text-xs font-medium text-gray-500">
                    {user.role}
                  </span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.avatar || "/default-avatar.png"}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.name || "Guest"}
                  </span>
                  <span className="truncate text-xs">
                    {user?.email || "user@email.com"}
                  </span>
                  {user?.role && (
                    <span className="text-xs font-medium text-gray-500">
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
