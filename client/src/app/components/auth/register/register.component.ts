import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { RegisterService } from '../../../services/register.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, MatInputModule, CommonModule]
})
export class registerComponent {
  email = '';
  name = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private router: Router, private registerService: RegisterService) { }

  register() {
      // ✅ Clear previous error messages
      this.errorMessage = '';

      // ✅ Check if email is entered and valid
      if (!this.email || !this.email.includes('@')) {
        this.errorMessage = 'Please enter a valid email or password.';
        return;
      }

      // ✅ Check if password is entered and at least 6 characters long
      if (!this.password || this.password.length < 6) {
        this.errorMessage = 'Password must be at least 6 characters.';
        return;
      }

      // ✅ Check if passwords match
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }
      
    this.registerService.getRegisterDetails(this.email, this.password,this.name).subscribe(
      (data: any) => {
        if (data.status === 200) {
          this.router.navigate(['/login']);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
