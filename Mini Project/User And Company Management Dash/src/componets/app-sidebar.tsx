"use client";

import * as React from "react";
import { BookOpen, Bot, Command, PieChart, Settings2 } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../servises/useUsers"; // ✅ Import useUsers hook
import { useAuth } from "@/context/authContext"; // ✅ Import Auth Context

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const { user: loggedInUser } = useAuth(); // ✅ Get the logged-in user
  const { users, isLoading, error } = useUsers(); // ✅ Fetch all users
  console.log("this is the users", users);
  console.log("this is the users login", loggedInUser);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users</div>;

  const currentUser = users.find((u) => u.name === loggedInUser) || {
    name: "Guest",
    email: "user@email.com",
    avatar: "/default-avatar.png",
    role: "user",
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={[
            {
              title: "Dashboard",
              url: "/dashboard",
              icon: PieChart,
              isActive: true,
              items: [],
            },
            { title: "Users", url: "/user", icon: Bot, items: [] },
            {
              title: "Companies",
              url: "/companies",
              icon: BookOpen,
              items: [],
            },
            { title: "Posts", url: "/posts", icon: Settings2, items: [] },
          ]}
        />

        {/* Show admin buttons only */}
        {currentUser.role === "admin" && (
          <div className="flex flex-col gap-2 p-4">
            <Button
              className="bg-green-500 text-gray-800 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/addUser")}
            >
              + Add User
            </Button>
            <Button
              className="bg-green-500 text-gray-800 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/addComp")}
            >
              + Add Company
            </Button>
            <Button
              className="bg-green-500 text-gray-800 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/addPost")}
            >
              + Add Post
            </Button>
          </div>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
