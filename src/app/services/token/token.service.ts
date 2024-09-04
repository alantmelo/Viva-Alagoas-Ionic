import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'authToken';

  constructor() {}

  // Save token to Local Storage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve token from Local Storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove token from Local Storage
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if the token exists
  hasToken(): boolean {
    return this.getToken() !== null;
  }
}
