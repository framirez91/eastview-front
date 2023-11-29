import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudadano } from '../interfaces/ciudadano';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CiudadanoService  {
  private apiUrl = `${environment.apiUrl}/ciudadanos`;


  constructor(private http: HttpClient) { }

  getCiudadano(): Observable<Ciudadano[]> {
    return this.http.get<Ciudadano[]>(this.apiUrl);
  }

  getCiudadanoById(id: number): Observable<Ciudadano> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Ciudadano>(url);
  }

  deleteCiudadano(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  updateCiudadano(id: number, ciudadano: Ciudadano): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, ciudadano);
  }
  createCiudadano(ciudadano: Ciudadano): Observable<any> {
    return this.http.post(this.apiUrl, ciudadano);
  }
}
