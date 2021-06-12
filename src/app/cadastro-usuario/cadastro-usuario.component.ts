import { AuthService } from './../service/auth.service';
import { environment } from 'src/environments/environment.prod';

import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  //Variáveis
  user: User = new User
  auxSenha: string = ''
  auxTipoUsuario: string = ''
  fundo: any //variavel que pega div de fundo

  constructor(
    public authService: AuthService,
    private router: Router,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    this.fundo = window.document.querySelector('#fundo')
    this.mudar() //muda o fundo da tela
  }

  mudar(){
    this.fundo.style.backgroundImage = "url('https://i.imgur.com/CnzlKp0.jpg')"
  }

  //Método para confirmar a senha do cadastro do usuário
  confirmarSenha(event: any){
    this.auxSenha = event.target.value
  }

  //Método para capturar o tipo de usuário
  tipoUsuario(event: any) {
    this.auxTipoUsuario = event.target.value
  }

  cancelar(){
    if(this.authService.logado()){
      this.router.navigate(['/pesquisa'])
    }
    else{
      this.router.navigate(['/inicio'])
    }
  }

  //Método para cadastrar usuário
  cadastrar() {
    this.user.tipoUsuario = this.auxTipoUsuario

    if(this.user.senha != this.auxSenha){
      this.alertasService.showAlertDanger('As senhas não correspodem. Tente novamente!')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        this.alertasService.showAlertSuccess('Usuário cadastrado com sucesso. Acesse o RemediOn!')
      })
    }
  }

}
