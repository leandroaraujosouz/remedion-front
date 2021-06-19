import { chainedInstruction } from '@angular/compiler/src/render3/view/util';
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

  key = 'nome'
  reverse = false
  objDescricao = ''
  objEstoque = ''
  objClassificacao = ''
  objCategoria = ''
  objPosto = ''
  objEndereco = ''
  objMunicipio = ''
  objZona = ''
  objAtivo = ''

  chDescricao = true
  chEstoque = true
  chClassificacao = true
  chCategoria = true
  chPosto = true
  chEndereco = true
  chMunicipio = true
  chZona = true
  chAtivo = true
  chAll = true
  produto: Produto = new Produto()
  listaProdutos: Produto[]

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private alertasService: AlertasService,

  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.alertasService.showAlertInfo('Sua sessão expirou. Entre novamente!')
      this.router.navigate(['/entrar'])
    }
  
    window.scroll(0, 0)
      this.findAllCategorias()
      this.findAllProdutos()
  }

  desabilitar(num: number) {
    if (num == 1)
      this.objDescricao = 'd-none'
    else if (num == 2)
      this.objEstoque = 'd-none'
    else if (num == 3)
      this.objClassificacao = 'd-none'
    else if (num == 4)
      this.objCategoria = 'd-none'
    else if (num == 5)
      this.objPosto = 'd-none'
    else if (num == 6)
      this.objEndereco = 'd-none'
    else if (num == 7)
      this.objMunicipio = 'd-none'
    else if (num == 8)
      this.objZona = 'd-none'
    else if (num == 9)
      this.objAtivo = 'd-none'

    this.chAll = false
  }

  habilitar() {
    if (this.chAll) {
      this.objDescricao = ''
      this.objEstoque = ''
      this.objClassificacao = ''
      this.objCategoria = ''
      this.objPosto = ''
      this.objEndereco = ''
      this.objMunicipio = ''
      this.objZona = ''
      this.objAtivo = ''
      this.chDescricao = true
      this.chEstoque = true
      this.chClassificacao = true
      this.chCategoria = true
      this.chPosto = true
      this.chEndereco = true
      this.chMunicipio = true
      this.chZona = true
      this.chAtivo = true
      this.chAll = true
    }
    else {
      this.objDescricao = 'd-none'
      this.objEstoque = 'd-none'
      this.objClassificacao = 'd-none'
      this.objCategoria = 'd-none'
      this.objPosto = 'd-none'
      this.objEndereco = 'd-none'
      this.objMunicipio = 'd-none'
      this.objZona = 'd-none'
      this.objAtivo = 'd-none'
      
      this.chAll = false
    }
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

  findAllByNomePosto() {
    this.produtoService.getAllByNomePosto(this.produto.nome, this.produto.posto).subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findAllByNomeMunicipioZona() {
    this.produtoService.getAllByNomeMunicipioZona(this.produto.nome, this.produto.municipioCidade, this.produto.zona).subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findAllByNomeMunicipioZonaPosto() {
    this.produtoService.getAllByNomeMunicipioZona(this.produto.nome, this.produto.municipioCidade, this.produto.zona).subscribe((resp: Produto[]) => {
      let lista = []
      lista = resp
      this.listaProdutos = []
      lista.forEach((item) => {
        if (item.posto.search( this.produto.posto) != -1) {
          this.listaProdutos.push(item)
        }
      })
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
    if (
      (this.produto.nome == null || this.produto.nome == "") &&
      (this.produto.posto == null || this.produto.posto == "") &&
      (this.produto.municipioCidade == null || this.produto.municipioCidade == "") &&
      (this.produto.zona == null || this.produto.zona == "")) {
      this.findAllProdutos()
    }
    else if (this.produto.nome != "" &&
      (this.produto.posto == null || this.produto.posto == "") &&
      (this.produto.municipioCidade == null || this.produto.municipioCidade == "") &&
      (this.produto.zona == null || this.produto.zona == "")) {
      this.findByNomeProduto()
    }
    else if (this.produto.nome != "" && this.produto.posto != "" &&
      (this.produto.municipioCidade == null || this.produto.municipioCidade == "") &&
      (this.produto.zona == null || this.produto.zona == "")) {
      this.findAllByNomePosto()
    }
    else if (
      (this.produto.posto == null || this.produto.posto == "") &&
      (this.produto.nome != "") &&
      (this.produto.municipioCidade != "") &&
      (this.produto.zona != "")) {
      this.findAllByNomeMunicipioZona()
    }else if (
      (this.produto.posto != "") &&
      (this.produto.nome != "") &&
      (this.produto.municipioCidade != "") &&
      (this.produto.zona != "")) {
      this.findAllByNomeMunicipioZonaPosto()
      setTimeout(() => {
        if(this.listaProdutos.length == 0){
          this.alertasService.showAlertInfo('Resultado da consulta não encontrado!')
        }
      }, 500);
    }else{
      setTimeout(() => {
          this.alertasService.showAlertInfo('Resultado da consulta não encontrado!')
      }, 500)
    }
  }
}
