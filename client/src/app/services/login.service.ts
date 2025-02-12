import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private apiUrl = environment.apiUrl; // ✅ Backend API URL from env file

  constructor(private http: HttpClient) { }

  getLoginDetails(userEmail: string, userPassword: string): Observable<any> {
    const body = {
      email: userEmail,
      password: userPassword
    };
    console.log(body);
    return this.http.post(`http://localhost:8080/auth/login`, body, { responseType: 'text' });
  }
}
