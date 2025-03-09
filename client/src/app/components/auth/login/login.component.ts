import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule, 
    MatInputModule, 
    CommonModule, 
    MatIconModule,
    RouterModule
  ]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage: string = ''; // Added error message property

  constructor(private router: Router, private loginService: LoginService) { }

  login() {
    this.loading = true; // Show loader
    this.errorMessage = ''; // Reset error message on new login attempt

    this.loginService.getLoginDetails(this.email, this.password).subscribe({
      next: (response) => {
        
        localStorage.setItem('token', response);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Login failed! Please check your email and password.'; // Set error message
      },
      complete: () => {
        this.loading = false; // Hide loader once the API call completes
      }
    });
  }
}
