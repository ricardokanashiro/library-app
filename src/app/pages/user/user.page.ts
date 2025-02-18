import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: false
})
export class UserPage implements OnInit {

  public userData: User | undefined

  constructor(
    private authService: AuthService, 
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.getUser()
  }

  onLogout() {
    this.authService.logout()

    if(!this.authService.userIsAuthenticated) {
      this.router.navigateByUrl('/login')
    }
  }

  private async getUser() {
    const data = await this.storageService.get('loginData')
    const parsedData = data ? JSON.parse(data) : null
    this.userData = parsedData
  }

}
