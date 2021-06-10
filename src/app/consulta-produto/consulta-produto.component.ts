import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { AlertasService } from '../service/alertas.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-consulta-produto',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.css']
})
export class ConsultaProdutoComponent implements OnInit {
  fundo: any

  produto: Produto = new Produto()
  listaProdutos: Produto[]

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      this.alertasService.showAlertInfo('Sua sessão expirou. Entre novamente!')
      this.router.navigate(['/entrar'])
    }

    window.scroll(0,0)
    this.fundo = window.document.querySelector('#fundo')
    this.mudar()
    this.findAllCategorias()
    this.findAllProdutos()
  }
  mudar() {
    this.fundo.style.backgroundImage = "url('https://imgur.com/7sY6rq0.jpg')"
  }

  findAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findByNomeProduto() {
    this.produtoService.getByNomeProduto(this.produto.nome).subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findAllByNomePosto(){
    this.produtoService.getAllByNomePosto(this.produto.nome, this.produto.posto).subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findAllByNomeMunicipioZona(){
    this.produtoService.getAllByNomeMunicipioZona(this.produto.nome, this.produto.municipioCidade, this.produto.zona).subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  findAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp
    })
  }

  pesquisa() {
    if(
    (this.produto.nome == null || this.produto.nome == "")&&
    (this.produto.posto == null || this.produto.posto == "") &&
    (this.produto.municipioCidade == null || this.produto.municipioCidade == "") &&
    (this.produto.zona == null || this.produto.zona == "")){
      this.findAllProdutos()
    }
    else if (this.produto.nome != "" &&
      (this.produto.posto == null || this.produto.posto == "") &&
      (this.produto.municipioCidade == null || this.produto.municipioCidade == "") &&
      (this.produto.zona == null || this.produto.zona == "")) {
      this.findByNomeProduto()
    }
    else if(this.produto.nome != "" && this.produto.posto != "" &&
    (this.produto.municipioCidade == null || this.produto.municipioCidade == "") &&
    (this.produto.zona == null || this.produto.zona == "")){
      this.findAllByNomePosto()
    }
    else if(
    (this.produto.posto == null || this.produto.posto == "") &&
    (this.produto.nome != "") &&
    (this.produto.municipioCidade != "") &&
    (this.produto.zona != "")){
      this.findAllByNomeMunicipioZona()
    }

  }
}
