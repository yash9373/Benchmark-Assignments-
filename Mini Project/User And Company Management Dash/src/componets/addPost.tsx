"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import api from "@/servises/api";
import usePostStore from "@/stores/postStore";

export default function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addPost } = usePostStore();
  const onSubmit = (data: any) => {
    const respo = api.post("/post", data);
    console.log("Submitted Data:", data, "respo : ", respo);
    alert("post added successfully");
    addPost(data);
  };

  return (
    <div>
      <h1 className="font-bold p-4">Add Post</h1>
      <Card className="w-full">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  type="number"
                  {...register("userId", { required: "User ID is required" })}
                  placeholder="Enter User ID"
                />
                {errors.userId && (
                  <p className="text-red-500 text-sm">
                    {errors.userId?.message as string}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  placeholder="Enter title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">
                    {errors.title?.message as string}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="body">Post Content</Label>
                <Textarea
                  id="body"
                  {...register("body", {
                    required: "Post content is required",
                  })}
                  placeholder="Enter post content"
                />
                {errors.body && (
                  <p className="text-red-500 text-sm">
                    {errors.body?.message as string}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="link">Reference Link</Label>
                <Input
                  id="link"
                  type="url"
                  {...register("link", {
                    required: "Reference link is required",
                  })}
                  placeholder="Enter reference URL"
                />
                {errors.link && (
                  <p className="text-red-500 text-sm">
                    {errors.link?.message as string}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="comment_count">Number of Comments</Label>
                <Input
                  id="comment_count"
                  type="number"
                  {...register("comment_count", {
                    required: "Number of comments is required",
                  })}
                  placeholder="Enter comment count"
                />
                {errors.comment_count && (
                  <p className="text-red-500 text-sm">
                    {errors.comment_count?.message as string}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer"
            >
              Add Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
