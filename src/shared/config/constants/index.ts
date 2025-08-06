import { User, UserFormData } from '@/types'

export const mockUsersStore: User[] = [
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

