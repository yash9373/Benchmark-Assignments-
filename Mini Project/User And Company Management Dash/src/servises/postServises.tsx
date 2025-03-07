import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../servises/api";
import useFetchPosts from "../stores/postStore";
import useFetchUsers from "../stores/userStore";

type Post = {
  id: number;
  userId: number;
  userName: string;
  title: string;
  body: string;
  link: string;
  comments: any[];
};
const fetchAll = async () => {
  const [postRes, comRes, userRes] = await Promise.all([
    api.get("/posts"),
    api.get("/comments"),
    api.get("/users"),
  ]);

  const postsData = postRes.data;
  const commentsData = comRes.data;
  const usersData = userRes.data;

  const userMap = usersData.reduce((acc: Record<number, string>, user: any) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  const postsWithComments = postsData.map((post: Post) => {
    const postComments = commentsData.filter(
      (comment: any) => comment.postId === post.id
    );

    return {
      ...post,
      comments: postComments,
      comment_count: postComments.length,
      userName: userMap[post.userId] || "Unknown User",
    };
  });

  return { posts: postsWithComments };
};

export const usePost = () => {
  const { posts, setPosts } = useFetchPosts();

  const { data, isLoading, error } = useQuery({
    queryKey: ["postsWithComments"],
    queryFn: fetchAll,
  });

  useEffect(() => {
    if (data && posts.length === 0) {
      setPosts(data.posts); // ✅ Only sets posts if Zustand is empty (prevents overwriting)
    }
  }, [data, setPosts]);

  return { posts, isLoading, error };
};
