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
  updateAttractionsTranslations(attractions: any[], lang: string): any[] {
    if (!attractions || attractions.length === 0) {
      return []; // Retorna um array vazio se não houver atrações
    }

    return attractions.map(attraction => {
      let translatedName = attraction.name; // Nome padrão
      let translatedDescription = attraction.description; // Descrição padrão

      if (lang !== 'pt-br' && attraction.translations) {
        // Procura a tradução correspondente ao idioma atual
        const translation = attraction.translations.find((t: { lang: string; }) => t.lang === lang);

        if (translation) {
          translatedName = translation.name;
          translatedDescription = translation.description;
        }
      }

      return {
        ...attraction,
        translatedName, // Propriedade para exibir o nome traduzido
        translatedDescription // Propriedade para exibir a descrição traduzida
      };
    });
  }
}
