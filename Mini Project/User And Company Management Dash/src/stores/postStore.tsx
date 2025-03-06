import { create } from "zustand";

interface PostState {
  posts: any[];
  setPosts: (posts: any[]) => void;
  addPost: (post: any) => void;
}

const usePostStore = create<PostState>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
}));

export default usePostStore;
