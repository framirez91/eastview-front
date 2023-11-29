import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = `${environment.apiUrl}/tareas`;

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas
  getTareas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); 
  }

  // Crear una nueva tarea
  crearTarea(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Actualizar una tarea existente por ID
  actualizarTarea(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, data);
  }

  // Eliminar una tarea por ID
  eliminarTarea(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
  getTareasPorDia(dia: string): Observable<any> {
    const url = `${this.apiUrl}/dia/${dia}`;
    return this.http.get<any>(url);
  }
}