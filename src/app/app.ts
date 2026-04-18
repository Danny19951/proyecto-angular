import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login';
import { NavbarComponent } from './components/navbar/navbar';
import { CatalogoComponent } from './components/catalogo/catalogo';
import { CarritoComponent } from './components/carrito/carrito';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, NavbarComponent, CatalogoComponent, CarritoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  sesionActiva = false;

  constructor() {
    window.addEventListener('loginExitoso', () => {
      this.sesionActiva = true;
    });
  }

  cerrarSesion() {
    this.sesionActiva = false;
    localStorage.removeItem('usuarioActual');
  }
}