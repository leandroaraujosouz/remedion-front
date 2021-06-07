import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})

export class PesquisaComponent implements OnInit {


  constructor() {

  }

  ngOnInit() {
    this.pesquisa()
    this.limpa()
  }

  service: google.maps.places.PlacesService;
  infowindow: google.maps.InfoWindow;
  request = {
    query:  "São Paulo",
    fields: ["name", "geometry"],
  };

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

  pesquisa() {

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


