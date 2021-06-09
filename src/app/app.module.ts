import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppComponent } from './app.component';
import { RodapeComponent } from './rodape/rodape.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import {MenuComponent} from './menu/menu.component';
import { EntrarComponent } from './entrar/entrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { ConsultaProdutoComponent } from './consulta-produto/consulta-produto.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';




@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    CadastroUsuarioComponent,
    CadastroProdutoComponent,
    MenuComponent,
    EntrarComponent,
    InicioComponent,
    PesquisaComponent,
    CategoriaEditComponent,
    CategoriaComponent,
    CategoriaDeleteComponent,
    ConsultaProdutoComponent,
    ProdutoEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
