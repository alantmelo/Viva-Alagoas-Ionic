import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage = new BehaviorSubject<string>('pt-br'); // Valor padrão
  refreshPage$ = new BehaviorSubject<void>(undefined!); // Para notificar mudanças

  getCurrentLanguage(): string {
    return this.currentLanguage.getValue();
  }

  setCurrentLanguage(language: string): void {
    this.currentLanguage.next(language);
    this.refreshPage$.next(); // Notifica os inscritos sobre a mudança
  }

  getDescriptionForLanguage(event: any): string {
    if (!event) {
      return '';
    }

    const selectedLanguage = this.getCurrentLanguage();

    if (selectedLanguage === 'pt-br') {
      return event.description || '';
    }

    if (event.translations) {
      const translation = event.translations.find((t: { lang: string; }) => t.lang === selectedLanguage);
      return translation ? translation.description : '';
    }

    return '';
  }
  
}
