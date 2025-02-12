import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true, // ✅ Standalone Component
  template: '',
})
export class LogoutComponent {
  constructor(private router: Router) {
    localStorage.removeItem('token'); // ✅ Clear authentication token
    this.router.navigate(['/login']); // ✅ Redirect to login after logout
  }
}
