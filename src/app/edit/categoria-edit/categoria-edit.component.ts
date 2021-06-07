import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Categoria } from 'src/app/model/Categoria'
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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == '') {
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
    this.categoriaService.putCategoria(this.categoria).subscribe((resp: Categoria) => {
      this.categoria = resp
      alert('Categoria editada com sucesso! ')
      this.router.navigate(['/categoria'])
    })
  }

}
