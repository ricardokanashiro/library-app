import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isLoggedGuard: CanMatchFn = (route, segments) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  // if(!authService.userIsAuthenticated) {
  //   router.navigateByUrl('/login')
  // }

  // return authService.userIsAuthenticated
  return true
}
