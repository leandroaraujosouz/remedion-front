import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  auxSenha: string
  auxTipoUsuario: string


  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmarSenha(event: any){
    this.auxSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.auxTipoUsuario = event.target.value
  }

  atualizarUser(){
    this.user.tipoUsuario = this.auxTipoUsuario

    if(this.user.senha != this.auxSenha){
      this.alertasService.showAlertDanger('As senhas não correspodem!')
    } else {
      this.authService.atualizarUsuario(this.user).subscribe((resp: User) => {
        this.user = resp
        this.alertasService.showAlertSuccess('Usuário atualizado com sucesso! Faça o login novamente.')
        environment.token = ''
        environment.nomeCompleto = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/entrar'])
      })
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }
}
