import { environment } from 'src/environments/environment.prod';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remedion-front';
  fundo = environment.fundo;
}

