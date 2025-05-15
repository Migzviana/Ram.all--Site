import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl: string = 'http://localhost:8080/auth';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('user-email', value.email);
          sessionStorage.setItem('username', value.name);
        })
      );
  }

  signup(
    name: string,
    email: string,
    password: string
  ): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/register`, { name, email, password })
  }

  sendRecoveryEmail(email: string): Observable<HttpResponse<string>> {
    return this.httpClient.post<string>(
      `${this.apiUrl}/forgot-password`,
      { email },
      {
        observe: 'response',
        responseType: 'text' as 'json',
      }
    );
  }

  verifyResetToken(body: { token: string }): Observable<HttpResponse<string>> {
  return this.httpClient.post<string>(
    `${this.apiUrl}/verify-reset-token`,
    body,
    {
      observe: 'response',
      responseType: 'text' as 'json',
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }
  );
}


  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/reset-password`,
      { token, newPassword },
      {
        observe: 'response',
        responseType: 'text' as 'json'
      }
    );
  }
}
