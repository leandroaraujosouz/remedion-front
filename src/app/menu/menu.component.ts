import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';
declare var $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome=environment.nomeCompleto
  foto=environment.foto
  id = environment.id

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(){
    window.onscroll = function () {
      if (window.pageYOffset > 140) {
        $("#header").addClass("active");
        $("#header").addClass("fixed-top");
      } else {
        $("#header").removeClass("active");
      }
    }
  }

  sair(){    
    environment.foto=''
    environment.id=0
    environment.nomeCompleto=''
    environment.token=''
    this.router.navigate(['/inicio'])
  }
  
}
