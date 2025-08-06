import { User, UserFormData } from '@/types'

export const generateMockUsers = (): User[] => [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    creationDate: '2024-01-15T10:30:00.000Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    status: 'pending',
    creationDate: '2024-02-20T14:45:00.000Z'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'moderator',
    status: 'banned',
    creationDate: '2024-03-10T09:15:00.000Z'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'user',
    status: 'active',
    creationDate: '2024-03-25T16:20:00.000Z'
  }
]

export const mockAPI = {
  fetchUsers: async (): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return generateMockUsers()
  },

  createUser: async (userData: UserFormData): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      id: Date.now().toString(),
      ...userData,
      creationDate: new Date().toISOString()
    }
  },

  updateUser: async (
    id: string,
    userData: Partial<UserFormData>
  ): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const users = generateMockUsers()
    const existingUser = users.find((u) => u.id === id)
    if (!existingUser) throw new Error('User not found')
    return { ...existingUser, ...userData }
  },

  deleteUser: async (id: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const users = generateMockUsers()
    const existingUser = users.find((u) => u.id !== id)
    if (!existingUser) throw new Error('User not found')
    return existingUser
  }
}
