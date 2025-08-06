import { mockUsersStore } from "@/shared/config/constants"
import { User, UserFormData } from "@/types"

export const generateMockUsers = (): User[] => {
  return [...mockUsersStore] 
}

export const mockAPI = {
  fetchUsers: async (): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return generateMockUsers()
  },

  createUser: async (userData: UserFormData): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      creationDate: new Date().toISOString()
    }
    
    mockUsersStore.push(newUser)
    return newUser
  },

  updateUser: async (
    id: string,
    userData: Partial<UserFormData>
  ): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const userIndex = mockUsersStore.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    
    const updatedUser = { ...mockUsersStore[userIndex], ...userData }
    mockUsersStore[userIndex] = updatedUser
    
    return updatedUser
  },

  deleteUser: async (id: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const userIndex = mockUsersStore.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    
    const deletedUser = mockUsersStore[userIndex]
    mockUsersStore.splice(userIndex, 1)
    
    return deletedUser
  }
}