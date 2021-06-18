import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  token={
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  getAllCategoria(): Observable<Categoria[]>{
    this.token.headers = new HttpHeaders().set('Authorization',environment.token)
    return this.http.get<Categoria[]>(`${environment.server}/categoria`,this.token)
  }

  getByIdCategoria(id: number): Observable<Categoria>{
    this.token.headers = new HttpHeaders().set('Authorization',environment.token)
    return this.http.get<Categoria>(`${environment.server}/categoria/${id}`, this.token)
    }

  postCategoria(categoria: Categoria): Observable<Categoria>{
    this.token.headers = new HttpHeaders().set('Authorization',environment.token)
    return this.http.post<Categoria>(`${environment.server}/categoria`,categoria,this.token)
  }

  putCategoria(categoria: Categoria): Observable<Categoria>{
    this.token.headers = new HttpHeaders().set('Authorization',environment.token)
    return this.http.put<Categoria>(`${environment.server}/categoria`,categoria,this.token)
  }

  deleteCategoria(id: number){
    this.token.headers = new HttpHeaders().set('Authorization',environment.token)
    return this.http.delete(`${environment.server}/categoria/${id}`,this.token)
  }


}