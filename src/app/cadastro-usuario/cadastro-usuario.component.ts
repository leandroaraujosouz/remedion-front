import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    environment.fundo = 'https://i.imgur.com/CnzlKp0.jpg'
  }

}
