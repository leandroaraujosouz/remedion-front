import { AuthService } from './../service/auth.service';
import { environment } from 'src/environments/environment.prod';

import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.document.body.style.backgroundImage = "url('https://i.imgur.com/CnzlKp0.jpg')"
    window.scroll(0,0)
  }

  //Método para confirmar a senha do cadastro do usuário
  confirmarSenha(event: any){
    this.auxSenha = event.target.value
  }

  //Método para capturar o tipo de usuário
  tipoUsuario(event: any) {
    this.auxTipoUsuario = event.target.value
  }

  //Método para cadastrar usuário
  cadastrar() {
    this.user.tipoUsuario = this.auxTipoUsuario

    if(this.user.senha != this.auxSenha){
      alert('As senhas não correspodem!')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso')
      })
    }
  }

}
