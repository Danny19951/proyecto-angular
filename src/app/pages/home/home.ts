import { Component } from '@angular/core';
import { CatalogoComponent } from '../../components/catalogo/catalogo';

@Component({
  selector: 'app-home',
  imports: [CatalogoComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
