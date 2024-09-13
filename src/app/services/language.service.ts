import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANGUAGE_KEY = 'selectedLanguage';
  private currentLanguageSubject: BehaviorSubject<string>;
  public currentLanguage$: Observable<string>;

  private refreshPageSubject: Subject<void> = new Subject<void>();
  public refreshPage$: Observable<void> = this.refreshPageSubject.asObservable();

  constructor() {
    const savedLanguage = localStorage.getItem(this.LANGUAGE_KEY) || 'pt-br';
    this.currentLanguageSubject = new BehaviorSubject<string>(savedLanguage);
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();
  }

  setSelectedLanguage(language: string) {
    this.currentLanguageSubject.next(language);
    localStorage.setItem(this.LANGUAGE_KEY, language);
    this.refreshPageSubject.next();
  }
  getCurrentLanguage(): string {
    return this.currentLanguageSubject.getValue();
  }

  setCurrentLanguage(language: string) {
    this.currentLanguageSubject.next(language);
    localStorage.setItem(this.LANGUAGE_KEY, language); // Salva a linguagem no localStorage
    this.refreshPageSubject.next(); // Emite um sinal para que os observadores possam reagir à mudança
  }

  getDescriptionForLanguage(event: any): string {
    if (!event) {
      return '';
    }

    const selectedLanguage = this.currentLanguageSubject.getValue();
    
    if (selectedLanguage === 'pt-br') {
      return event.description || '';
    }

    if (event.translations) {
      const translation = event.translations.find((t: { lang: string; }) => t.lang === selectedLanguage);
      return translation ? translation.description : '';
    }

    return '';
  }

  getNameForLanguage(event: any): string {
    if (!event) {
      return '';
    }

    const selectedLanguage = this.currentLanguageSubject.getValue();
    
    if (selectedLanguage === 'pt-br') {
      return event.name || '';
    }

    if (event.translations) {
      const translation = event.translations.find((t: { lang: string; }) => t.lang === selectedLanguage);
      return translation ? translation.name : '';
    }

    return '';
  }
  
}
