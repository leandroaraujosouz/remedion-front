import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.document.body.style.backgroundImage = "url('http://edivaldojunior.com.br/wp-content/uploads/2018/03/14-12.jpg')"
  }

}
