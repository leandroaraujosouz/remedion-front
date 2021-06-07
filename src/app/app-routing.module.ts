import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { EntrarComponent } from './entrar/entrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';

const routes: Routes = [

  {path: '', redirectTo: 'inicio', pathMatch: 'full'},

  {path: 'inicio', component: InicioComponent},
  {path: 'entrar', component: EntrarComponent},
  {path: 'cadastrar-usuario', component: CadastroUsuarioComponent},
  {path: 'cadastrar-produto', component: CadastroProdutoComponent},
  {path: 'pesquisa', component: PesquisaComponent},
  {path: 'categoria-delete', component: CategoriaDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
