import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import api from "../servises/api";

interface UserState {
  users: any[];
  setUsers: (users: any[]) => void;
  addUser: (user: any) => void;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })), // ✅ Add user
}));

export default useUserStore;
