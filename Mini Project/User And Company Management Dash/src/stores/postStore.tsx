import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PostState {
  posts: any[];
  setPosts: (posts: any[]) => void;
  addPost: (post: any) => void;
}

const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      posts: [],
      setPosts: (posts: any[]) => set({ posts }),
      addPost: (post: any) =>
        set((state) => ({ posts: [...state.posts, post] })),
    }),
    { name: "post-storage" }
  )
);

export default usePostStore;
