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

  usuario: any = JSON.parse(localStorage.getItem('usuarioActual') || '{}');

  logout() {
    this.cerrarSesion.emit();
  }
}