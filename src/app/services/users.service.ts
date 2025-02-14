import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

import { v4 as uuidV4 } from 'uuid';

export interface userData {
  name: string
  email: string
  password: string
} 

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public users: User[] = []

  constructor() {}

  public createUser(data: userData) {

    const userAlreadyExists = this.users.some(user => user.email === data.email)

    if(userAlreadyExists) {
      throw new Error("Um usuário com esse email já existe!")
    }

    this.users.push({ ...data, id: uuidV4() })
  }

  public getUserById(id: string) {
    const foundUser = this.users.find(user => user.id === id)
    return foundUser
  }

  public getUserByEmail(email: string) {
    const foundUser = this.users.find(user => user.email === email)
    return foundUser
  }
}
