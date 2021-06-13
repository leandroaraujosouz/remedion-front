import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Categoria } from 'src/app/model/Categoria'
import { AlertasService } from 'src/app/service/alertas.service';
import { CategoriaService } from 'src/app/service/categoria.service'
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {

  categoria: Categoria = new Categoria()
  fundo: any

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == '') {
      this.alertasService.showAlertInfo('Sua sessão expirou. Entre novamente!')
      this.router.navigate(['/entrar'])
    }
    this.fundo = window.document.querySelector('#fundo')
    this.mudar()
    let id = this.route.snapshot.params['id']
    this.findByIdCategoria(id)
  }

  mudar(){
    this.fundo.style.backgroundImage = "url('https://i.imgur.com/dveYVAl.jpg')"
  }

  findByIdCategoria(id: number) {
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  editar() {
    console.log(this.categoria)
    if(this.categoria.tipo == null || this.categoria.tipo == "") {
      this.alertasService.showAlertDanger('O campo deve ser preenchido!')
    } else {
      this.categoria.produto = []
      this.categoriaService.putCategoria(this.categoria).subscribe((resp: Categoria) => {
      this.categoria = resp
      this.alertasService.showAlertSuccess('Categoria atualizada com sucesso! ')
      this.router.navigate(['/categoria'])
    })}
  }

}
