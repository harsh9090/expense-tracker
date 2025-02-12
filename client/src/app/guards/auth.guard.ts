import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true; // ✅ User is authenticated
  } else {
    router.navigate(['/login']); // 🔒 Redirect to login if not authenticated
    return false;
  }
};
