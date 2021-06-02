import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  
  userLogin: UserLogin = new UserLogin

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp

      environment.senha = this.userLogin.senha
      environment.email = this.userLogin.email
      environment.id = this.userLogin.id
      environment.nomeCompleto = this.userLogin.nomeCompleto
      environment.foto = this.userLogin.foto
      environment.token = this.userLogin.token
      environment.tipoUsuario = this.userLogin.tipoUsuario


      console.log(environment.senha)

      console.log(environment.email)

      console.log(environment.id)

      console.log(environment.nomeCompleto)

      console.log(environment.foto)

      console.log(environment.token)

      console.log(environment.tipoUsuario)

      this.router.navigate(['/inicio'])
    }, erro=>{
      if(erro.status == 500){
        alert('usuario ou senha estão incorretos!')
      }
    })
    window.document.body.style.backgroundImage = "url('https://i.imgur.com/TLGOmuJ.jpg')"
  }

}
