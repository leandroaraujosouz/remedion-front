import { UserLogin } from './../model/UserLogin'
import { User } from '../model/user'
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>(`${environment.server}/usuarios/logar`, userLogin)
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>(`${environment.server}/usuarios/cadastrar`, user)
  }

  logado(){
    let ok = false
    if (environment.token != ''){
      ok=true
    }
    return ok 
  }

  atualizarUsuario(user: User): Observable<User>{
    return this.http.put<User>(`${environment.server}/usuarios/cadastrar`, user)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`${environment.server}/usuarios/${id}`)
  }
  
  adm(){
    let ok = false
    if (environment.tipoUsuario == 'adm'){
      ok=true
    }
    return ok 
  }

  normal(){
    let ok = false
    if (environment.tipoUsuario == 'normal'){
      ok=true
    }
    return ok 
  }
}
