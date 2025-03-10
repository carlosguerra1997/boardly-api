import { UserResponse } from '@/modules/user/application/response/user-response'

interface UserItemReadView {
  id: string
  username: string
  email: string
}

export const userSerialize = (item: UserResponse): UserItemReadView =>  {
  return {
    id: item.id,
    username: item.username,
    email: item.email
  }
}