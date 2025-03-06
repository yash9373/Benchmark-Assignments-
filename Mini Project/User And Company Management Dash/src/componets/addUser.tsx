"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import useUserStore from "@/stores/userStore";
import { useUsers } from "@/servises/useUsers";
import api from "@/servises/api";

export default function addUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { users, addUser } = useUserStore();
  const onSubmit = (data: any) => {
    const respo = api.post("/users", data);
    console.log("Submitted Data:", data, "respo : ", respo);
    alert("User added successfully");
    addUser(data);
  };
  console.log("user from add " + users.length);
  return (
    <div>
      <h1 className="font-bold p-4">Add User</h1>
      <Card className="w-full ">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {errors.name?.message as string}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  placeholder="Enter username"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username?.message as string}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.email?.message === "string"
                      ? errors.email.message
                      : ""}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...register("phone", { required: "Phone is required" })}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.phone?.message === "string"
                      ? errors.phone.message
                      : ""}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  {...register("company", { required: "Company is required" })}
                  placeholder="Enter company name"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.company?.message === "string"
                      ? errors.company.message
                      : ""}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  {...register("address", { required: "Address is required" })}
                  placeholder="Enter address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.address?.message === "string"
                      ? errors.address.message
                      : ""}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  {...register("zip", { required: "ZIP Code is required" })}
                  placeholder="Enter ZIP Code"
                />
                {errors.zip && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.zip?.message === "string"
                      ? errors.zip.message
                      : ""}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  {...register("state", { required: "State is required" })}
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.state?.message === "string"
                      ? errors.state.message
                      : ""}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  {...register("country", { required: "Country is required" })}
                  placeholder="Enter country"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.country?.message === "string"
                      ? errors.country.message
                      : ""}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="photo">Profile Photo</Label>
                <Input id="photo" type="file" {...register("photo")} />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer"
            >
              Add User
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
