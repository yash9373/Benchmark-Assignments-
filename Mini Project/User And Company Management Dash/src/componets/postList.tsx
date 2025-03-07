import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";
import CommentSection from "./comentSection";
import image from "../assets/image.png";
type Post = {
  id: number;
  userId: number;
  userName: string;
  title: string;
  body: string;
  link: string;
  comments: any[];
  comment_count: number;
};

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const [openPostId, setOpenPostId] = useState<number | null>(null);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="shadow-md rounded-lg">
          <CardContent>
            <div className="flex items-center space-x-3 p-2">
              <Avatar>
                <AvatarImage src={image} alt="User Avatar" />
                <AvatarFallback>{"U"}</AvatarFallback>
              </Avatar>

              <span className="font-semibold">{post.userName}</span>
            </div>
            <p className="p-2 text-left font-bold">{post.title}</p>

            <p className="p-2 text-left">{post.body}</p>

            <div className="flex justify-between px-2 py-1">
              <Button variant="ghost">
                <Heart className="w-6 h-6 text-red-500" />
              </Button>
              <Button
                variant="ghost"
                className="flex items-center space-x-2"
                onClick={() =>
                  setOpenPostId(openPostId === post.id ? null : post.id)
                }
              >
                <MessageCircle className="w-5 h-5" />
                <span>{post.comment_count}</span>
              </Button>
            </div>

            {openPostId === post.id && (
              <CommentSection comments={post.comments} />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
