import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin
  fundo: any
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    environment.token = ''
    environment.tipoUsuario = ''

    window.scroll(0,0)

    this.fundo = window.document.querySelector('#fundo')
    this.mudar()
  }

  mudar(){
    this.fundo.style.backgroundImage = "none"//"url('https://i.imgur.com/fUjrW1b.jpg')"
    this.fundo.style.opacity= 1
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
      if(environment.tipoUsuario == 'normal'){
        this.router.navigate(['/pesquisa'])
      }else{
        this.router.navigate(['/consultar-produto'])
      }
      
    }, erro=>{
      if(erro.status == 500){
        this.alertasService.showAlertDanger('E-mail ou senha estão incorretos. Tente novamente!')
      }
    })

  }

}
