import React, { useState } from "react";
import { useUsers } from "../servises/useUsers";
import image from "../assets/image.png";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditProfileDialog } from "../componets/profile"; // Import the dialog component

export default function UsersTable() {
  const { users, isLoading, error } = useUsers();
  const [userData, setUserData] = useState(users); // Store user data
  const [search, setSearch] = useState(""); // Search state

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Function to update user data
  const handleUserUpdate = (updatedUser: any) => {
    setUserData((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  // Filter users based on search input
  const filteredUsers = userData.filter((user) =>
    Object.values(user).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="border border-gray-500 rounded-md m-4 p-4 bg-gray-100">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-400 rounded-md"
      />

      <Table className="w-full">
        <TableCaption>A list of users and their details.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Photo</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Company</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-300 transition">
                <TableCell className="rounded-l-md">
                  <img
                    src={user.photo || image}
                    alt={user.name || "No Name"}
                    className="w-10 h-10 rounded-full"
                  />
                </TableCell>
                <TableCell className="text-center">
                  {user.name || "No Name"}
                </TableCell>
                <TableCell className="text-center">
                  {user.company || "No Company"}
                </TableCell>
                <TableCell className="text-center">
                  {user.email || "No Email"}
                </TableCell>
                <TableCell className="text-center rounded-r-md">
                  <EditProfileDialog
                    user={user}
                    handleUpdate={handleUserUpdate}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No Users Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
