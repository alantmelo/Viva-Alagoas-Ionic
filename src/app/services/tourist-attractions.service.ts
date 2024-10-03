import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TouristAttractionsService {
  private apiUrl = `${environment.apiUrl}mobile/v1/tourist-attractions`
  constructor(private http: HttpClient) {}

  // Método para buscar todas as atrações turísticas de uma cidade específica pelo cityId
  findAllByCityId(
    cityId: number,
    page: number = 1,
    pageSize: number = 10,
    searchTerm: string = ''
  ): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('search', searchTerm);
  
    return this.http.get(`${this.apiUrl}/city/${cityId}`, { params });
  }
  

  findByCityId(cityId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/home/${cityId}`);
  }

  // Método para buscar uma atração turística pelo ID
  findOne(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
