import { environment } from 'src/environments/environment.prod';

import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  //Variáveis
  user: User = new User
  auxSenha: string
  auxTipoUsuario: string
  constructor() { }

  ngOnInit() {
    environment.fundo = 'https://i.imgur.com/CnzlKp0.jpg'
    window.scroll(0,0)
  }

  //Método para confirmar a senha do cadastro do usuário
  confirmarSenha(event: any){
    this.auxSenha = event.target.value
  }

  //Método para capturar o tipo de usuário
  tipoUsuario(event: any) {

  }

}
