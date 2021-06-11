import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ProdutoService } from './../service/produto.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from './../model/Produto';
import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../service/alertas.service';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { User } from '../model/user';



@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})

export class PesquisaComponent implements OnInit {
  fundo: any

  produto: Produto = new Produto()
  listaProdutos: Produto[]
  carrinho: Produto[] = []
  id: number

  listaPedidos = [{
    ativo: true,
    categoria: { id: 0, tipo: '' },
    classificacao: "",
    endereco: "",
    estoque: 1,
    id: 12,
    municipioCidade: "",
    nome: "",
    posto: "",
    zona: ""
  }]
  User ={
    nomeCompleto: '',
    email: '',
    id: 0
  }
  listaReservas =[{
    id: 0,
    usuarioCad: this.User,
    listaPedidos: this.listaPedidos
  }]

  

  usuario: User = new User()

  service: google.maps.places.PlacesService;
  infowindow: google.maps.InfoWindow;
  request = {
    query:  "",
    fields: ["name", "formatted_address", "place_id", "geometry"],
  };
  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == '') {
      this.alertasService.showAlertInfo('Sua sessão expirou. Entre novamente!')
      this.router.navigate(['/entrar'])
    }
    this.limpa()
    this.fundo = window.document.querySelector('#fundo')
    this.mudar()
    this.mapa("São paulo")
    
    this.listaReservas = JSON.parse(localStorage.getItem('listaReservas') || '[]')
  }
  mudar(){
    this.fundo.style.backgroundImage = "url('http://edivaldojunior.com.br/wp-content/uploads/2018/03/14-12.jpg')"
  }

  findAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findByNomeProduto() {
    this.produtoService.getByNomeProduto(this.produto.nome).subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findAllByNomePosto(){
    this.produtoService.getAllByNomePosto(this.produto.nome, this.produto.posto).subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findAllByNomeMunicipioZona(){
    this.produtoService.getAllByNomeMunicipioZona(this.produto.nome, this.produto.municipioCidade, this.produto.zona).subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  listaReserva(produto : Produto){
    let confirma = true
    produto.estoque = 1
    if(this.carrinho.find(element => element == produto) != undefined){
      alert('item ja cadastrado!')
    }
    else{
      this.carrinho.push(produto)
    }
  }
  removeCarrinho(produto: Produto){
    let lista: Produto[] = []
    for(let itens =0; itens < this.carrinho.length; itens++){
      if(this.carrinho[itens] != produto){
        lista.push(this.carrinho[itens])
      }
    }
    this.carrinho = lista
  }

  reservar(){
      this.usuario.email = environment.email
      this.usuario.nomeCompleto = environment.nomeCompleto
      this.usuario.id = environment.id
      if(this.listaReservas.length == 0){
        this.id = 1
      }
      else{
        this.id = this.listaReservas[this.listaReservas.length -1].id + 1
      }
      this.listaPedidos = []
      this.carrinho.forEach((item)=>{
        this.listaPedidos.push(item)
      })
      this.listaReservas.push(
        {
          id: this.id,
          usuarioCad: this.usuario,
          listaPedidos: this.listaPedidos
        })
        this.carrinho =[]
        localStorage.setItem('listaReservas',JSON.stringify(this.listaReservas))
        alert('cadastrado com sucesso!') 
        
  }

  habilitar(){
    if(this.carrinho.length != 0){
      return true
    }
    return false
  }

  pesquisa() {
    if(
    (this.produto.nome == null || this.produto.nome == "")&&
    (this.produto.posto == null || this.produto.posto == "") &&
    (this.produto.municipioCidade == null || this.produto.municipioCidade == "") &&
    (this.produto.zona == null || this.produto.zona == "")){
      this.findAllProdutos()
    }
    else if (this.produto.nome != "" &&
      (this.produto.posto == null || this.produto.posto == "") &&
      (this.produto.municipioCidade == null || this.produto.municipioCidade == "") &&
      (this.produto.zona == null || this.produto.zona == "")) {
      this.findByNomeProduto()
    }
    else if(this.produto.nome != "" && this.produto.posto != "" &&
    (this.produto.municipioCidade == null || this.produto.municipioCidade == "") &&
    (this.produto.zona == null || this.produto.zona == "")){
      this.findAllByNomePosto()
    }
    else if(
    (this.produto.posto == null || this.produto.posto == "") &&
    (this.produto.nome != "") &&
    (this.produto.municipioCidade != "") &&
    (this.produto.zona != "")){
      this.findAllByNomeMunicipioZona()
    }

  }


  limpa(){
    this.request.query=""
  }

  createMarker(place: google.maps.places.PlaceResult) {
    let infowindow: google.maps.InfoWindow;
    let map: google.maps.Map
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
     // map,
      position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(place.name || "");
      infowindow.open(map);
    });
  }


  mapa(endereco: string) {
    this.request.query = endereco

  let map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 18,
    });
    this.service = new google.maps.places.PlacesService(map);

    this.service.findPlaceFromQuery(
      this.request,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            this.createMarker(results[i]);
          }

          map.setCenter(results[0].geometry!.location!);
        }
      }
    );
  }
}


