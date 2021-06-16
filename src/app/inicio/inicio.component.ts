import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  fundo: any
  constructor() { }

  ngOnInit() {
    environment.token = ''
    environment.tipoUsuario = ''
    
    window.scroll(0, 0)
    window.onscroll = function () {
      if (window.pageYOffset > 140) {
        $("#header").addClass("active");
      } else {
        $("#header").removeClass("active");
      }
    }

    this.fundo = window.document.querySelector('#fundo')
    this.mudar()
  }

  mudar() {
    this.fundo.style.backgroundImage = "url('https://imgur.com/i3WmNDn.jpg')"
    this.fundo.style.opacity= 0.4

  }
}
