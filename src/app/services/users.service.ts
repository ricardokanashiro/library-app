import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

import { v4 as uuidV4 } from 'uuid';
import { StorageService } from './storage.service';

export interface userData {
  name: string
  email: string
  password: string
} 

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private key = 'users'

  constructor(private storageService: StorageService) {}

  public async createUser(data: userData) {

    const userData = await this.storageService.get(this.key)
    let users: User[] = []
    
    if(userData) {
      users = JSON.parse(userData) as User[]
    }

    const userAlreadyExists = users.some(user => user.email === data.email)

    if(userAlreadyExists) {
      throw new Error("Um usuário com esse email já existe!")
    }

    const newUser = { ...data, id: uuidV4() }

    await this.storageService.set(this.key, JSON.stringify([...users, newUser]))

    return newUser
  }

  public async getUserById(id: string) {

    const usersData = await this.storageService.get(this.key)
    const usersParsed = JSON.parse(usersData) as User[]

    const foundUser = usersParsed.find(user => user.id === id)
    return foundUser
  }

  public async getUserByEmail(email: string) {
    
    const usersData = await this.storageService.get(this.key)
    const usersParsed = JSON.parse(usersData) as User[]

    const foundUser = usersParsed.find(user => user.email === email)
    return foundUser
  }
}
