import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  formulario: FormGroup | any

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  async onLogIn() {
    await this.authService.login(this.formulario.value)

    if(this.authService.userIsAuthenticated) {
      this.router.navigateByUrl('/tabs/books')
    }
  }

}
