import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  fundo: any
  constructor() { }

  ngOnInit(){
    window.scroll(0,0)
    this.fundo = window.document.querySelector('#fundo')
    this.mudar()
    window.onscroll = function () {
      if (window.pageYOffset > 140) {
        $("#header").addClass("active");
      } else {
        $("#header").removeClass("active");
      }
    }
  }
  mudar(){
    this.fundo.style.backgroundImage = "url('https://imgur.com/i3WmNDn.jpg')"
  }
}
