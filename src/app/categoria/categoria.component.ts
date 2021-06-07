import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: Categoria = new Categoria ()
  listaCategoria: Categoria[]

  constructor(
    private router: Router,
    private temaService: CategoriaService
  ) { }

  ngOnInit(){
    if(environment.token==''){
      this.router.navigate(['/entrar'])
    }

    this.findAllCategoria()
  } 

  findAllCategoria(){
    this.temaService.getAllCategoria().subscribe((resp:Categoria[])=>{
      this.listaCategoria = resp 
    })
  }


  cadastrar(){
    this.categoriaService.postCategoria(this.categoria).subscribe((resp:Categoria)=>{
      this.categoria = resp
      alert('Categoria cadastrada com sucesso!')
      this.findAllCategoria()
      this.categoria = new Categoria()
    })
  }
  

}
