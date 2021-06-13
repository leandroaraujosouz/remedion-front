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
  fundo: any
  objFoto: any

  nomeCompleto: any
  labelNomeCompleto: any
  divNomeCompleto: any
  validNomeCompleto = true

  email: any
  labelEmail: any
  divEmail: any
  validEmail = true

  senha: any
  labelSenha: any
  divSenha: any
  validSenha = false

  confirmSenha: any
  labelConfirmSenha: any
  divConfirmSenha: any
  validConfirmSenha = false

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

    this.fundo = window.document.querySelector('#fundo')
    this.mudar()

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)

    this.nomeCompleto = document.querySelector('#nomeCompleto')
    this.labelNomeCompleto = document.querySelector('#labelNomeCompleto')
    this.divNomeCompleto = document.querySelector('#divNomeCompleto')

    this.email = document.querySelector('#email')
    this.labelEmail = document.querySelector('#labelEmail')
    this.divEmail = document.querySelector('#divEmail')

    this.senha = document.querySelector('#senha')
    this.labelSenha = document.querySelector('#labelSenha')
    this.divSenha = document.querySelector('#divSenha')

    this.confirmSenha = document.querySelector('#confirmSenha')
    this.labelConfirmSenha = document.querySelector('#labelConfirmSenha')
    this.divConfirmSenha = document.querySelector('#divConfirmSenha')

    this.objFoto = window.document.querySelector('#foto')
  }

  mudar(){
    this.fundo.style.backgroundImage = "url('https://i.imgur.com/btVhpX7.jpg')"
  }

  //Método para validar se o nome do usuário tem mais de três caracteres
  validaNomeCompleto(){

    if(this.nomeCompleto.value.length <=1) {
      this.labelNomeCompleto.setAttribute('style', 'color: red')
      this.divNomeCompleto.innerHTML = '<small style="color: red; margin-left: 15px;">Insira no mínimo dois caracteres!</small>'
      this.nomeCompleto.classList.remove('is-valid')
      this.nomeCompleto.classList.add('is-invalid')
      this.validNomeCompleto = false
    } else {
      this.labelNomeCompleto.setAttribute('style', 'color: green')
      this.divNomeCompleto.innerHTML = '<small style="color: green; margin-left: 15px;">Tudo certo!</small>'
      this.nomeCompleto.classList.remove('is-invalid')
      this.nomeCompleto.classList.add('is-valid')
      this.validNomeCompleto = true
    }
  }

  //Método para validar se o e-mail contem o @ e um ponto
  validaEmail(){
    if(this.email.value.indexOf('@') == -1 || this.email.value.indexOf('.') == -1 ){
      this.labelEmail.setAttribute('style', 'color: red')
      this.divEmail.innerHTML = '<small style="color: red; margin-left: 15px;">E-mail Inválido!</small>'
      this.email.classList.remove('is-valid')
      this.email.classList.add('is-invalid')
      this.validEmail = false
    }else{
      this.labelEmail.setAttribute('style', 'color: green')
      this.divEmail.innerHTML = '<small style="color: green; margin-left: 15px;">Tudo certo!</small>'
      this.email.classList.remove('is-invalid')
      this.email.classList.add('is-valid')
      this.validEmail = true
    }
  }

    //Método para validar se a senha tem mais de seis caracteres
  validaSenha(){
    if(this.senha.value.length <=5) {
      this.labelSenha.setAttribute('style', 'color: red')
      this.divSenha.innerHTML = '<small style="color: red; margin-left: 15px;">A senha deve ter no mínimo seis caracteres!</small>'
      this.senha.classList.remove('is-valid')
      this.senha.classList.add('is-invalid')
      this.validSenha = false
    } else {
      this.labelSenha.setAttribute('style', 'color: green')
      this.divSenha.innerHTML = '<small style="color: green; margin-left: 15px;">Tudo certo!</small>'
      this.senha.classList.remove('is-invalid')
      this.senha.classList.add('is-valid')
      this.validSenha = true
    }
  }

  //Método para validar se a Senha e o Confirmar Senha correspondem
  validaConfirmarSenha(){
    if(this.user.senha != this.auxSenha){
      this.labelConfirmSenha.setAttribute('style', 'color: red')
      this.divConfirmSenha.innerHTML = '<small style="color: red; margin-left: 15px;">As senhas não correspondem!</small>'
      this.confirmSenha.classList.remove('is-valid')
      this.confirmSenha.classList.add('is-invalid')
      this.validConfirmSenha = false
    }else{
      this.labelConfirmSenha.setAttribute('style', 'color: green')
      this.divConfirmSenha.innerHTML = '<small style="color: green; margin-left: 15px;">Tudo certo!</small>'
      this.confirmSenha.classList.remove('is-invalid')
      this.confirmSenha.classList.add('is-valid')
      this.validConfirmSenha = true
    }
  }

  confirmarSenha(event: any){
    this.auxSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.auxTipoUsuario = event.target.value
  }

  atualizarUser(){
    this.user.tipoUsuario = this.auxTipoUsuario

    if(this.user.senha == this.auxSenha && this.validNomeCompleto && this.validEmail && this.validSenha && this.validConfirmSenha){
      this.authService.atualizarUsuario(this.user).subscribe((resp: User) => {
        this.user = resp
        this.alertasService.showAlertSuccess('Usuário atualizado com sucesso! Faça o login novamente.')
        environment.token = ''
        environment.nomeCompleto = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/entrar'])
      })
    } else {
      this.alertasService.showAlertDanger('Não foi possível atualizar o usuário. Tente novamente!')
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }
}
