import { Injectable } from '@angular/core';
import { userData, UsersService } from './users.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogged: boolean = false

  constructor(private usersService: UsersService, private alertCtrl: AlertController) {}

  private async setLoginStatus(isLogged: boolean) {
    this._isLogged = isLogged
  }

  public signIn(data: userData) {

    try {
      this.usersService.createUser(data)
      this.setLoginStatus(true)
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

  public login(data: { email: string, password: string }) {

    if(
      !this.usersService.getUserByEmail(data.email)
      || this.usersService.getUserByEmail(data.email)?.password !== data.password
    ) {
      
      this.alertCtrl.create({
        header: "Erro ao cadastrar conta",
        message: "Esse usuário não existe!",
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
  }

  public logout() {
    this.setLoginStatus(false)
  }

  get userIsAuthenticated() {
    return this._isLogged
  }
}
