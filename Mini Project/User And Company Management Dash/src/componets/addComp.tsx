"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useCompanyStore from "../stores/companieStore"; // Import Zustand store

export default function CompanyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { companies, addCompany } = useCompanyStore(); // Zustand state

  const onSubmit = (data: any) => {
    console.log("Submitted Company Data:", data);

    addCompany(data);

    alert("Company added successfully");
    console.log("Updated Companies List:", companies);
  };

  return (
    <div>
      <h1 className="font-bold p-4">Add Company</h1>
      <Card className="w-full">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  {...register("name", {
                    required: "Company name is required",
                  })}
                  placeholder="Enter company name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {String(errors.name.message)}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...register("address", { required: "Address is required" })}
                  placeholder="Enter address"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {String(errors.name.message)}
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
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {String(errors.name.message)}
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
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {String(errors.name.message)}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="employeeCount">Employee Count</Label>
                <Input
                  id="employeeCount"
                  type="number"
                  {...register("employeeCount", {
                    required: "Employee count is required",
                  })}
                  placeholder="Enter employee count"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {String(errors.name.message)}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  {...register("industry", {
                    required: "Industry is required",
                  })}
                  placeholder="Enter industry"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {String(errors.name.message)}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="marketCap">Market Cap ($)</Label>
                <Input
                  id="marketCap"
                  type="number"
                  {...register("marketCap", {
                    required: "Market cap is required",
                  })}
                  placeholder="Enter market cap"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {String(errors.name.message)}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="domain">Company Domain</Label>
                <Input
                  id="domain"
                  {...register("domain", { required: "Domain is required" })}
                  placeholder="Enter domain"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {String(errors.name.message)}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="ceoName">CEO Name</Label>
                <Input
                  id="ceoName"
                  {...register("ceoName", { required: "CEO name is required" })}
                  placeholder="Enter CEO name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {String(errors.name.message)}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="logo">Company Logo</Label>
                <Input id="logo" type="file" {...register("logo")} />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer"
            >
              Add Company
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
