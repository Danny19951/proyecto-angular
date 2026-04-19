import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  @Output() cerrarSesion = new EventEmitter<void>();

  usuario: any = null;

constructor() {
  const data = localStorage.getItem('usuarioActual');
  this.usuario = data ? JSON.parse(data) : null;
}
  menuAbierto = false;
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
  logout() {
    this.cerrarSesion.emit();
  }
}