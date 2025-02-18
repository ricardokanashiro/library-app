import { Injectable } from '@angular/core';
import { userData, UsersService } from './users.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogged: boolean = false

  constructor(
    private usersService: UsersService, 
    private alertCtrl: AlertController,
    private storageService: StorageService
  ) {}

  private async setLoginStatus(isLogged: boolean) {
    this._isLogged = isLogged
  }

  public async signIn(data: userData) {

    try {
      const addedUser = await this.usersService.createUser(data)
      this.setLoginStatus(true)

      await this.storageService.set('loginData', JSON.stringify(addedUser))
    } 
    catch (err: any) {
      
      this.alertCtrl.create({
        header: "Erro ao cadastrar conta",
        message: err.message,
        buttons: [
          { text: 'Ok' }
        ]
      })
      .then(alertEl => {
        alertEl.present()
      })  
    }
  }

  public async login(data: { email: string, password: string }) {

    const foundUser = await this.usersService.getUserByEmail(data.email)

    if(
      !foundUser || foundUser?.password !== data.password
    ) {
      
      this.alertCtrl.create({
        header: "Erro ao logar essa conta!",
        message: "Esse usuário não existe",
        buttons: [
          { text: 'Ok' }
        ]
      })
      .then(alertEl => {
        alertEl.present()
      })

      return
    }
    
    this.setLoginStatus(true)
    await this.storageService.set('loginData', JSON.stringify(foundUser))
  }

  public logout() {
    this.setLoginStatus(false)
  }

  get userIsAuthenticated() {
    return this._isLogged
  }
}
