import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { AlertasService } from '../service/alertas.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

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
    if (environment.token == '') {
      this.alertasService.showAlertInfo('Sua sessão expirou. Entre novamente!')
      this.router.navigate(['/entrar'])
    }

    window.scroll(0, 0)
    this.fundo = window.document.querySelector('#fundo')
   
    this.findAllCategorias()
    this.findAllProdutos()
  }
  

  findAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
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

  cadastrarProduto() {
    this.produto.categoria = this.categoria
    this.produto.ativo = true
    if ((this.produto.nome == null || this.produto.nome == '') ||
      (this.produto.classificacao == null || this.produto.classificacao == '') ||
      (this.produto.categoria.id == null) ||
      (this.produto.posto == null || this.produto.posto == '') ||
      (this.produto.municipioCidade == null || this.produto.municipioCidade == '') ||
      (this.produto.zona == null || this.produto.zona == '') ||
      (this.produto.endereco == null || this.produto.endereco == '')) {
      this.alertasService.showAlertDanger('Todos os campos devem ser preenchidos')
    } else if (this.produto.estoque < 0) {
      this.alertasService.showAlertInfo('O produto não pode ser cadastrado com estoque negativo')
    } else if(this.validaNumero(this.produto.estoque.toString()) == false) {
      this.alertasService.showAlertInfo('O valor do estoque precisa ser um numero inteiro!')
    }
    else if(this.verificaProduto()){
      this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
        this.produto = resp
        this.alertasService.showAlertSuccess('Produto cadastrado com sucesso!')
        this.produto = new Produto()
        this.findAllProdutos()
      })
    }
    else{
      this.alertasService.showAlertInfo('Produto ja cadastrado!')
    }
  }

  validaNumero(numero: string)
  {
    let confirma = false
    for(let i=0; i < numero.length; i++)
    {
        if(Number.isInteger(parseInt(numero.charAt(i),10)))
        {
          confirma = true
        }else{
          return false
        }
    }
    return confirma
  }

  verificaProduto(){
    let confirma = true
    this.findAllProdutos()
    for(let i= 0; i < this.listaProdutos.length; i++){
      if((this.listaProdutos[i].nome == this.produto.nome)&&(this.listaProdutos[i].endereco == this.produto.endereco)){
        return false
      }
    }
    return confirma
  }
}
