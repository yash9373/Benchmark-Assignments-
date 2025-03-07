import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Comment {
  id: string;
  userAvatar?: string;
  name?: string;
  body: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

export default function CommentSection({ comments = [] }: CommentSectionProps) {
  return (
    <div className="border-t pt-2 mt-2 w-full">
      {/* Comments List */}
      <ScrollArea className="max-h-40 overflow-y-auto px-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-center space-x-3 p-2 border-b"
            >
              <Avatar>
                <AvatarImage
                  src={comment.userAvatar || "/default-avatar.png"}
                />
                <AvatarFallback>
                  {comment.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-left">
                  {comment.name || "Unknown User"}
                </p>
                <p className="text-gray-600 text-sm text-left">
                  {comment.body}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">No comments yet.</p>
        )}
      </ScrollArea>
    </div>
  );
}
