import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AlertasService } from '../service/alertas.service';

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

  usuario: string
  indice: number


  constructor(
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    this.listaReservas = JSON.parse(localStorage.getItem('listaReservas') || '[]')
  }

  pesquisa() {

  }

  selecionaUsuario(id: number) {
   for(let i=0; i < this.listaReservas.length; i++) {
      if (this.listaReservas[i].id == id) {
        this.usuario = this.listaReservas[i].usuarioCad.nomeCompleto
        this.indice = i
        this.listaPedidos = this.listaReservas[i].listaPedidos
        i = this.listaReservas.length
      }
   }
  }

  finalizar(id:number) {
    let lista = this.listaPedidos
    this.listaPedidos = []
    lista.forEach((item) => {
      if (item.id != id) {
        this.listaPedidos.push(item)
      }
    })
    console.log(this.indice)
    this.listaReservas[this.indice].listaPedidos = []
         
      this.listaPedidos.forEach((item) => {
      this.listaReservas[this.indice].listaPedidos.push(item)
    })
    if (this.listaPedidos.length == 0) {
      let listaR = this.listaReservas
      this.listaReservas = []
      listaR.forEach((item) => {
        if (item.id != listaR[this.indice].id) {
          this.listaReservas.push(item)
        }
      })
    }
    localStorage.setItem('listaReservas', JSON.stringify(this.listaReservas))
  
  }

delete (id: number) {

}
}
