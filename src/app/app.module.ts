import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RodapeComponent } from './rodape/rodape.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import {MenuComponent} from './menu/menu.component';
import { EntrarComponent } from './entrar/entrar.component';


@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    CadastroUsuarioComponent,
    CadastroProdutoComponent,
    MenuComponent,
    EntrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
