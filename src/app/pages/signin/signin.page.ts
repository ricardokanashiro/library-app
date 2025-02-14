import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: false
})
export class SigninPage implements OnInit {

  formulario: FormGroup | any

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onSignIn() {
    this.authService.signIn(this.formulario.value)
    this.router.navigateByUrl('/tabs/books')
  } 

}
