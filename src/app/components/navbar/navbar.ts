import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  usuario: any = null;
  menuAbierto = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    const data = localStorage.getItem('usuarioActual');
    this.usuario = data ? JSON.parse(data) : null;

    window.addEventListener('loginExitoso', () => {
      const data = localStorage.getItem('usuarioActual');
      this.usuario = data ? JSON.parse(data) : null;
      this.cdr.detectChanges();
      this.router.navigate(['/bienvenida']);
    });
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  logout() {
    localStorage.removeItem('usuarioActual');
    this.usuario = null;
    this.router.navigate(['/home']);
  }

  irACatalogo(categoria: string) {
    localStorage.setItem('categoriaInicial', categoria);
    this.router.navigate(['/catalogo']);
  }
}