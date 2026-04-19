import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet, FooterComponent],
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