import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TouristAttractionsService {
  private apiUrl = `${environment.apiUrl}mobile/v1/tourist-attractions`
  constructor(private http: HttpClient) {}

  // Método para buscar todas as atrações turísticas de uma cidade específica pelo cityId
  findAllByCityId(cityId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/city/${cityId}`);
  }

  // Método para buscar uma atração turística pelo ID
  findOne(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
