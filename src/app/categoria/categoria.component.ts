import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { AlertasService } from '../service/alertas.service';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  fundo: any
  categoria: Categoria = new Categoria ()
  listaCategoria: Categoria[]

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private alertasService: AlertasService
  ) { }

  ngOnInit(){
    if(environment.token==''){
      this.alertasService.showAlertInfo('Sua sessão expirou. Entre novamente!')
      this.router.navigate(['/entrar'])
    }
    window.scroll(0,0)
    this.findAllCategoria()
  }

  findAllCategoria(){
    this.categoriaService.getAllCategoria().subscribe((resp:Categoria[])=>{
      this.listaCategoria = resp
    })
  }

  cadastrar(){
    if(this.categoria.tipo == null || this.categoria.tipo == '') {
      this.alertasService.showAlertDanger('O campo deve ser preenchido!')
    } else {
    this.categoriaService.postCategoria(this.categoria).subscribe((resp:Categoria)=>{
      this.categoria = resp
      this.alertasService.showAlertSuccess('Categoria cadastrada com sucesso!')
      this.findAllCategoria()
      this.categoria = new Categoria()
    })}
  }


}
