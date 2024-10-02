import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationHelperService {

  constructor(private translate: TranslateService) {}

  // Método helper para obter a tradução de uma chave
  async getTranslation(key: string): Promise<string> {
    const translation = await firstValueFrom(this.translate.get(key));
    return translation;
  }
}
