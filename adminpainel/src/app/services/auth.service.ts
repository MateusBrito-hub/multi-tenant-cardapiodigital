import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/user';
  private isAuthenticated = signal(false);
  private userData = signal<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        console.log('Login response:', response);
        this.handleAuthentication(response);
      }),
      catchError(this.handleError)
    );
  }

  private handleAuthentication(response: LoginResponse): void {
    localStorage.setItem('token', response.token);
    this.userData.set(response.user);
    this.isAuthenticated.set(true);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      if (error.status === 401) {
        errorMessage = 'Email ou senha inválidos';
      } else if (error.status === 0) {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
      } else {
        errorMessage = error.error.message || `Erro ${error.status}: ${error.statusText}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userData.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getIsAuthenticated() {
    return this.isAuthenticated();
  }

  getUserData() {
    console.log('getUserData', this.userData());
    return this.userData();
  }

  checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    this.isAuthenticated.set(!!token);

    if (token) {
      // Opcional: fazer uma requisição para validar o token
      // e obter os dados do usuário
    }
  }
}
