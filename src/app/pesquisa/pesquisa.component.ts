import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.document.body.style.backgroundImage = "url('https://i.imgur.com/TLGOmuJ.jpg')"
  }


}
