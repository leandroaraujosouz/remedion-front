import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from 'src/app/model/Produto';
import { AlertasService } from 'src/app/service/alertas.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {

  fundo: any

  produto: Produto = new Produto()
  listaProdutos: Produto[]
  idProduto: number

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.alertasService.showAlertInfo('Sua sessão expirou. Entre novamente!')
      this.router.navigate(['/entrar'])
    }

    this.fundo = window.document.querySelector('#fundo')
    this.mudar()
    this.findAllCategorias()
    this.findAllProdutos()
    this.idProduto = this.route.snapshot.params['id']
    this.findByIdProduto(this.idProduto)

  }

  mudar() {
    this.fundo.style.backgroundImage = "url('https://i.imgur.com/wgCvfF7.jpg')"
  }

  findAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
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

  atualizarProduto() {
    this.produto.categoria = this.categoria

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
    } else if(this.validaNumero(this.produto.estoque.toString())) {
      this.produtoService.putProduto(this.produto).subscribe((resp: Produto) => {
        this.produto = resp
        this.alertasService.showAlertSuccess('Produto atualizado com sucesso!')
        this.produto = new Produto()
        this.router.navigate(['/consultar-produto'])
      })
    }
    else{
      this.alertasService.showAlertInfo('O valor do estoque precisa ser um numero inteiro!')
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

}
