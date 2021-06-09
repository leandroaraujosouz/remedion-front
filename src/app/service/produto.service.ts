import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http :HttpClient
    ) { }

  token={
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  getAllProdutos(): Observable <Produto[]>{
    return this.http.get<Produto[]>(`${environment.server}/produto`,this.token)
  }

  getByIdProduto(id: number): Observable <Produto>{
    return this.http.get<Produto>(`${environment.server}/produto/${id}`,this.token)
  }

  getByNomeProduto(nome: String): Observable <Produto[]>{
    return this.http.get<Produto[]>(`${environment.server}/produto/nome/${nome}`,this.token)
  }

  getAllByNomePosto(nome: String, posto: String): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${environment.server}/produto/nomePosto/${nome}/${posto}`,this.token)
  }

  getAllByNomeMunicipioZona(nome: String, municipio: String, zona: String): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${environment.server}/produto/completa/${nome}/${municipio}/${zona}`,this.token)
  }

  postProduto(Produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(`${environment.server}/produto`,Produto, this.token)
  }

  putProduto(Produto: Produto): Observable<Produto>{
    return this.http.put<Produto>(`${environment.server}/produto`, Produto, this.token)
  }

  deleteProduto(id: number){
    return this.http.delete(`${environment.server}/produto/${id}`,this.token)
  }
}
