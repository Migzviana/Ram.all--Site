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
  
  getAvailableExtensions(): Observable<Extension[]>{
    return this.http.get<Extension[]>(`${this.apiUrl}/available`)
  }

  getRangeExtension(inicio: number, fim: number): Observable<Extension[]> {
    return this.http.get<Extension[]>(`${this.apiUrl}/range?inicio=${inicio}&fim=${fim}`);
  }

  loginExtension(extensionNumber: string) {
    const token = sessionStorage.getItem('auth-token');
  
    return this.http.post(
      `http://localhost:8080/extensions/login`,
      { extension: extensionNumber },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  }
  

  logoutExtension(extensionNumber: string) {
    const token = sessionStorage.getItem('auth-token');
  
    return this.http.delete(
      `http://localhost:8080/extensions/logout/${extensionNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }  
}
