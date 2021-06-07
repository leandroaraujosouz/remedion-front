import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {
  categoria: Categoria = new Categoria() 
  idCategoria: number
  fundo: any

  constructor(
    private categoriaService: CategoriaService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.fundo = window.document.querySelector('#fundo')
    this.mudar()
    if(environment.token == ''){
      alert('Sua sessão expirou. Faça o login novamente')
      this.router.navigate(['/entrar'])
    } 
    this.idCategoria = this.route.snapshot.params['id']
    this.findByIdCategoria(this.idCategoria)
  }

  findByIdCategoria(id: number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  } 

  apagar(){
    this.categoriaService.deleteCategoria(this.idCategoria).subscribe(() => {
      alert('Categoria apagada com sucesso !')
      this.router.navigate(['/categoria'])
    })
  }

  mudar(){
    this.fundo.style.backgroundImage = "url('https://imgur.com/ks39nQS.jpg') ",
    this.fundo.style.opacity = "0.8"
  }

}
