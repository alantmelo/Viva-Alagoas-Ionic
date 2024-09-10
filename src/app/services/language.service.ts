// language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSource = new BehaviorSubject<string>(this.getStoredLanguage());
  private refreshPageSource = new Subject<void>();

  language$ = this.languageSource.asObservable();
  refreshPage$ = this.refreshPageSource.asObservable();

  constructor() {}

  private getStoredLanguage(): string {
    return localStorage.getItem('selectedLanguage') || 'pt-br'; // Valor padrão
  }

  getCurrentLanguage(): string {
    return this.languageSource.getValue(); // Retorna a língua atual
  }

  setLanguage(language: string) {
    localStorage.setItem('selectedLanguage', language);
    this.languageSource.next(language);
    this.refreshPageSource.next(); // Emite um evento para atualizar a página
  }
}
