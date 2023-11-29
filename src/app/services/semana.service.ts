import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemanaService {
  private apiUrl = `${environment.apiUrl}/semana`;

  constructor(private http: HttpClient) { }

  //obtener semana
  getSemana(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
