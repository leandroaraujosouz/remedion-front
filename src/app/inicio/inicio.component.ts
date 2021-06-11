import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  email: string = ''
  txtEmail = document.querySelector('#txtEmail')

  fundo: any
  constructor() { }

  ngOnInit() {
    environment.token = ''
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
  }

  pegaEmail(event: any) {
    this.email = event.target.value
  }

  validaEmail() {
    if (this.email.indexOf('@') == -1 || this.email.indexOf('.') == -1) {
      /* this.txtEmail.innerHTML = 'E-mail inválido' */
      /* txtEmail.style.color = 'red' */
      $("#email_input").addClass("is-invalid")
      $("#email_input").remove("is-valid")
    }
    else {
      /* txtEmail.innerHTML = 'E-mail Válido' */
      /* txtEmail.style.color = 'green' */
      $("#email_input").addClass("is-valid")
      $("#email_input").removeClass("is-invalid")
    }
  }
}
