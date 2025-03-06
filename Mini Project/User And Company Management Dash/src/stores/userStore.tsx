import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  users: any[];
  setUsers: (users: any[]) => void;
  addUser: (user: any) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      users: [],
      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })), // ✅ Add user
    }),
    { name: "user-storage" }
  )
);

export default useUserStore;
