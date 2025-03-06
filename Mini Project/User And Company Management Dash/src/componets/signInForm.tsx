import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthServices from "../servises/authServises";
import { useNavigate } from "react-router-dom";
type FormFields = {
  username: string;
  password: string;
};

export default function SignInForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setErrorMessage(null);
    const response = await AuthServices(data);

    if (response.success) {
      console.log("Login successful:", response.token);
      navigate("/dashboard");
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your username and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              {...register("username", {
                required: "Username field is required",
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "Invalid username format",
                },
                maxLength: {
                  value: 30,
                  message: "Username cannot exceed 30 characters",
                },
              })}
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Password cannot exceed 30 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign in"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
