interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  status: 'active' | 'banned' | 'pending'
  creationDate: string
}

interface UserFormData {
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  status: 'active' | 'banned' | 'pending'
}

// Zustand Store
interface UserStore {
  users: User[]
  loading: boolean
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void
  setLoading: (loading: boolean) => void
}

export type { UserStore, UserFormData, User }
