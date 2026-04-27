import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Precio {
  id: number;
  precio: number;
  unidad: string;
  fecha: string;
  creado_en: string;
}

export interface PrecioCreate {
  precio: number;
  unidad: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrecioService {
  private apiUrl = 'https://reto-cacao-backend-production.up.railway.app';

  constructor(private http: HttpClient) {}

  getPrecios(): Observable<Precio[]> {
    return this.http.get<Precio[]>(`${this.apiUrl}/precios`);
  }

  getUltimoPrecio(): Observable<Precio> {
    return this.http.get<Precio>(`${this.apiUrl}/precios/ultimo`);
  }

  createPrecio(datos: PrecioCreate): Observable<Precio> {
    return this.http.post<Precio>(`${this.apiUrl}/precios`, datos);
  }

  updatePrecio(id: number, datos: PrecioCreate): Observable<Precio> {
    return this.http.put<Precio>(`${this.apiUrl}/precios/${id}`, datos);
  }

  deletePrecio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/precios/${id}`);
  }
}