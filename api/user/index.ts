import { apiService } from '../index'

interface User {
  id: number
  name: string
  age: number
}

type UpdateUserResponse = {
  data: User[]
}

export const userRepository = {
  deleteUser: (id: Number) => {
    const url = '/user'
    return apiService.delete(url, { id })
  },

  addUser: (user: { name: string; age: number }) => {
    const url = '/user'
    return apiService.post(url, user)
  },

  updateUser: (user: User) => {
    const url = '/user'
    return apiService.put(url, user)
  },

  getUsers: (): Promise<UpdateUserResponse> => {
    return apiService.get<UpdateUserResponse>('/user')
  },
}
