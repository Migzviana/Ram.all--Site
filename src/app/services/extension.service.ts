import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Extension } from '../interface/extension';

@Injectable({
  providedIn: 'root',
})
export class ExtensionService {
  private apiUrl = 'http://localhost:8080/extensions';

  constructor(private http: HttpClient) {}

  getAllExtensions(): Observable<Extension[]> {
    return this.http.get<Extension[]>(`${this.apiUrl}/all`);
  }

  getAvailableExtensions(): Observable<Extension[]> {
    return this.http.get<Extension[]>(`${this.apiUrl}/available`);
  }

  getUnavailableExtensions(): Observable<Extension[]>{
    return this.http.get<Extension[]>(`${this.apiUrl}/unavailable`);
  }

  loginExtension(extensionNumber: string) {
    const token = sessionStorage.getItem('auth-token');

    return this.http.post(
      `${this.apiUrl}/login`,
      { extension: extensionNumber },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  logoutExtension(extensionNumber: string) {
    const token = sessionStorage.getItem('auth-token');

    return this.http.delete(`${this.apiUrl}/logout/${extensionNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  setExtensionRange(start: number, end: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/set-range`,
      null,
      {
        params: {
          inicio: start.toString(),
          fim: end.toString(),
        },
      }
    );
  }
}
