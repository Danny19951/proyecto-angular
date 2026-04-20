import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bienvenida.html',
  styleUrl: './bienvenida.css'
})
export class BienvenidaComponent {

  constructor(private router: Router) {}

  irACatalogo(categoria: string) {
    localStorage.setItem('categoriaInicial', categoria);
    this.router.navigate(['/catalogo']);
  }
}