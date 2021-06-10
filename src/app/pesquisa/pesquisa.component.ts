import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ProdutoService } from './../service/produto.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from './../model/Produto';
import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../service/alertas.service';



@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})

export class PesquisaComponent implements OnInit {
  fundo: any

  produto: Produto = new Produto()
  listaProdutos: Produto[]

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number

  service: google.maps.places.PlacesService;
  infowindow: google.maps.InfoWindow;
  request = {
    query:  "",
    fields: ["name", "formatted_address", "place_id", "geometry"],
  };
  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    /* if(environment.token == '') {
      this.alertasService.showAlertInfo('Sua sessão expirou. Entre novamente!')
      this.router.navigate(['/entrar'])
    } */
    this.limpa()
    this.fundo = window.document.querySelector('#fundo')
    this.mudar()
    this.findAllCategorias()
    this.findAllProdutos()

  }
  mudar(){
    this.fundo.style.backgroundImage = "url('http://edivaldojunior.com.br/wp-content/uploads/2018/03/14-12.jpg')"
  }

  findAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProdutos = resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria)=>{
      this.categoria = resp
    })
  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategorias = resp
    })
  }

  cadastrarProduto(){
    this.produto.categoria = this.categoria
    this.produto.ativo = true
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto)=>{
      this.produto = resp
      alert('Produto cadastrado com sucesso!')
      this.produto = new Produto()
      this.findAllProdutos()
    })
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


  pesquisa(endereco: string) {
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


