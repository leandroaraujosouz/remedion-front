import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  listaReservas = JSON.parse(localStorage.getItem('listaReservas') || '[]')
  listaPedidos = [{
    ativo: true,
    categoria: { id: '', tipo: '' },
    classificacao: "",
    endereco: "",
    estoque: 1,
    id: 12,
    municipioCidade: "",
    nome: "",
    posto: "",
    zona: ""
  }]
  usuario: string
  idReservas: number


  constructor(
    private alertasService: AlertasService
  ) { }

  ngOnInit(): void {
  }

  pesquisa() {

  }

  selecionaUsuario(id: number) {
    console.log(id)
    console.log(this.listaReservas)
    this.usuario = this.listaReservas[id].usuarioCad.nomeCompleto
    this.idReservas = this.listaReservas[id].id
    this.listaPedidos = []
    for (let i = 0; i < this.listaReservas[id].listaPedido.length; i++) {
      this.listaPedidos.push(this.listaReservas[id].listaPedido[i])
    }
  }

  finalizar(id: number) {
    let lista = this.listaPedidos
    this.listaPedidos = []
    lista.forEach((item) => {
      if (item.id != id) {
        this.listaPedidos.push(item)
      }
    })
    this.listaReservas[this.idReservas].listaPedido = []
    this.listaReservas[this.idReservas].listaPedido = this.listaPedidos
    if (this.listaReservas[this.idReservas].listaPedido.length == 0) {
      let listaR = this.listaReservas
      this.listaReservas = []
      for (let i = 0; i < listaR.length; i++) {
        if (listaR[i].id != this.idReservas) {
          this.listaReservas.push(listaR[i])
        }
      }
    }
    localStorage.setItem('listaReservas', JSON.stringify(this.listaReservas))
    this.alertasService.showAlertSuccess('Pedido Finalizado com sucesso!')

  }

  delete(id: number) {

  }
}
