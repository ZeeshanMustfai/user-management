import { UserStore } from '@/types'
import { create } from 'zustand'

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id)
    })),
  setLoading: (loading) => set({ loading })
}))
