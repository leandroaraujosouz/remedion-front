import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { User } from '../model/user';
import { AlertasService } from '../service/alertas.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {


  listaPedidos = [{
    ativo: true,
    categoria: { id: 0, tipo: '' },
    classificacao: "",
    endereco: "",
    estoque: 1,
    id: 12,
    municipioCidade: "",
    nome: "",
    posto: "",
    zona: ""
  }]
  User = {
    nomeCompleto: '',
    email: '',
    id: 0
  }
  listaReservas = [{
    id: 0,
    usuarioCad: this.User,
    listaPedidos: this.listaPedidos
  }]
  listaConsulta = [{
    id: 0,
    usuarioCad: this.User,
    listaPedidos: this.listaPedidos
  }]

  usuario: string
  idReserva: number

  produto: Produto

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.alertasService.showAlertInfo('Sua sessão expirou. Entre novamente!')
      this.router.navigate(['/entrar'])
    }
    this.listaReservas = JSON.parse(localStorage.getItem('listaReservas') || '[]')
    this.listaConsulta = JSON.parse(localStorage.getItem('listaReservas') || '[]')
    this.listaPedidos = []
  }

  pesquisa() {
    this.listaPedidos = []
    if (this.usuario == undefined || this.usuario == "") {
      this.listaReservas = this.listaConsulta
    }
    else {
      this.listaReservas = []
      this.listaConsulta.forEach((item) => {
        if (item.usuarioCad.nomeCompleto.search(this.usuario) != -1) {
          this.listaReservas.push(item)
        }
      })
    }
  }

  selectIdReserva(id: number) {
    this.idReserva = id
  }

  selecionaReserva(id: number) {
    for (let i = 0; i < this.listaReservas.length; i++) {
      if (this.listaReservas[i].id == id) {
        this.usuario = this.listaReservas[i].usuarioCad.nomeCompleto
        this.listaPedidos = this.listaReservas[i].listaPedidos
        i = this.listaReservas.length
      }
    }

    setTimeout(() => {
      window.document.body.style.padding = "0px"
    }, 400);
  }

  finalizar(id: number) {
    let lista = this.listaPedidos
    this.listaPedidos = []
    lista.forEach((item) => {
      if (item.id != id) {
        this.listaPedidos.push(item)
      }
    })
    for(let i=0; i< this.listaReservas.length; i++){
      if(this.listaReservas[i].id == this.idReserva){
        this.listaReservas[i].listaPedidos = []
        this.listaPedidos.forEach((item) => {
          this.listaReservas[i].listaPedidos.push(item)
        })
        i = this.listaReservas.length
      }
    }
    for(let i=0; i< this.listaConsulta.length; i++){
      if(this.listaConsulta[i].id == this.idReserva){
        this.listaConsulta[i].listaPedidos = []
        this.listaPedidos.forEach((item) => {
          this.listaConsulta[i].listaPedidos.push(item)
        })
       
        i = this.listaConsulta.length
      }
    }
    
    if (this.listaPedidos.length == 0) {
        let listaR = this.listaConsulta
        this.listaConsulta = []
        listaR.forEach((item) => {
          if (item.id != this.idReserva) {
            this.listaConsulta.push(item)
          }
        })
        this.usuario=""
        this.pesquisa()
    }
    localStorage.setItem('listaReservas', JSON.stringify(this.listaConsulta))
    
   
  }

  delete(id: number) {
    this.listaPedidos.forEach((item) => {
      if (item.id == id) {
        this.produtoService.getByIdProduto(item.id).subscribe((resp: Produto) => {
          this.produto = resp
          this.produto.estoque += item.estoque
          this.produtoService.putProduto(this.produto).subscribe((resp: Produto) => {
            this.produto = resp
          })
        })
      }
    })
    this.finalizar(id)
  }

  deleteAll() {
    this.selecionaReserva(this.idReserva)
    this.listaPedidos.forEach((item => {
      this.delete(item.id)
    }))
    this.usuario =""
    this.pesquisa()
    this.alertasService.showAlertSuccess('Cancelamento realizado com sucesso!')
  }
}
