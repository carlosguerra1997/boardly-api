import { User } from '@/modules/user/domain/user'

interface UserItemReadView {
  id: string
  username: string
  email: string
}

export const userSerialize = (item: User): UserItemReadView =>  {
  return {
    id: item.getId(),
    username: item.getUsername(),
    email: item.getEmail()
  }
}