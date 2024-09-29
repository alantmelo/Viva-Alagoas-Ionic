import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'authToken';
  private id = 'id';
  private name = 'name';

  constructor() {}

  // Save token to Local Storage
  saveToken(data: string): void {
    localStorage.setItem(this.tokenKey, data);
  }
  saveId(data: string): void {
    localStorage.setItem(this.id, data);
  }
  saveName(data: string): void {
    localStorage.setItem(this.name, data);
  }
  getId(): string | null {
    return localStorage.getItem(this.name);
  }
  getName(): string | null {
    return localStorage.getItem(this.id);
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
