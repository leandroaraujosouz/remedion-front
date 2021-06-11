import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { AlertasService } from 'src/app/service/alertas.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {

  fundo: any

  produto: Produto = new Produto()
  idProduto: number

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {

    if(environment.token == ''){
      this.alertasService.showAlertInfo('Sua sessão expirou. Entre novamente!')
      this.router.navigate(['/entrar'])
    }

    window.scroll(0,0)
    this.fundo = window.document.querySelector('#fundo')
    this.mudar()

    this.idProduto = this.route.snapshot.params['id']
    this.findByIdProduto(this.idProduto)
  }

  mudar(){
    this.fundo.style.backgroundImage = "url('') "
  }

  findByIdProduto(id: number){
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto)=>{
      this.produto = resp
    })
  }

  apagar(){
    this.produtoService.deleteProduto(this.idProduto).subscribe(()=>{
      this.alertasService.showAlertSuccess('Produto apagado com sucesso!')
      this.router.navigate(['/consultar-produto'])
    })
  }

}
