import PostList from "@/componets/postList";
import { usePost } from "@/servises/postServises";

export default function Posts() {
  const post = usePost();
  console.log("Posts data:", post.posts);
  return <PostList posts={post.posts} />;
}
