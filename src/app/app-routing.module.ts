import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { EntrarComponent } from './entrar/entrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { ConsultaProdutoComponent } from './consulta-produto/consulta-produto.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';

const routes: Routes = [

  {path: '', redirectTo: 'inicio', pathMatch: 'full'},

  {path: 'inicio', component: InicioComponent},
  {path: 'entrar', component: EntrarComponent},
  {path: 'cadastrar-usuario', component: CadastroUsuarioComponent},
  {path: 'cadastrar-produto', component: CadastroProdutoComponent},
  {path: 'pesquisa', component: PesquisaComponent},
  {path: 'categoria-edit/:id', component: CategoriaEditComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'categoria-delete/:id', component: CategoriaDeleteComponent},
  {path: 'consultar-produto', component: ConsultaProdutoComponent},
  {path: 'produto-edit/:id', component: ProdutoEditComponent},
  {path: 'produto-delete/:id', component: ProdutoDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
