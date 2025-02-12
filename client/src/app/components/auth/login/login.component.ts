import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [MatCard, MatFormField, FormsModule, MatInputModule]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router,private loginService:LoginService) { }

  login() {
    this.loginService.getLoginDetails(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        localStorage.setItem('token', response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err)
        console.log("login again")
      }
    });
    
  }
}
