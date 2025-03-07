import React from "react";
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

export default function UsersTable() {
  const { users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log("User from the list" + users.length);
  return (
    <div className="border border-grey-500 rounded-md m-4 bg-grey-500">
      <Table className="w-full">
        <TableCaption>A list of users and their roles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Photo</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Company</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
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
                  {user.role?.name || "No Role Assigned"}
                </TableCell>
                <TableCell className="text-center rounded-r-md">
                  {user.company || "No Company"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Users Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
