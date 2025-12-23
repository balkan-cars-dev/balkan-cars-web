import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

interface AuthResponse {
  token: string;
  userId: string; // Matches your updated Java LoginResponse
}

interface RegisterResponse {
  token?: string;
  message?: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  private tokenKey = 'jwtToken';
  private userIdKey = 'userId'; // Key for local storage
  
  // Track authentication state
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/login`,
      { email, password }
    ).pipe(
      tap(res => {
        // Save both token and userId to localStorage
        this.setToken(res.token);
        localStorage.setItem(this.userIdKey, res.userId);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/register`,
      data
    ).pipe(
      tap(res => {
        if (res.token) {
          this.setToken(res.token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  /**
   * Retrieves the current user's ID.
   * Prioritizes the stored ID, falls back to decoding the JWT.
   */
  getUserId(): string {
    // 1. Check direct storage first
    return localStorage.getItem(this.userIdKey) || '';
  }

  logout(): void {
    this.removeToken();
    localStorage.removeItem(this.userIdKey);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  // Private helper methods
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}