import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService, Producto } from '../../services/producto';
import { CarritoService } from '../../services/carrito.service';
import { CarritoComponent } from '../carrito/carrito';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, CarritoComponent],
  templateUrl: './catalogo.html',
 
  styleUrl: './catalogo.css'
})

export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categoriaActiva: string = 'todos';
  cargando = true;
  carrito = inject(CarritoService);



  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

   ngAfterViewInit() {
    const elementobotones = document.getElementsByClassName("navbar-user desktop-menu");

    if (elementobotones.length > 0) {
      elementobotones[0].innerHTML =
        '<div class="navbar-user desktop-menu" *ngIf="!usuario"><a href="/iniciar-sesion">Cerrar Sesión</a>';
    }
  }

  filtrarCategoria(categoria: string) {
    this.categoriaActiva = categoria;
    if (categoria === 'todos') {
      this.productosFiltrados = this.productos;
    } else {
      this.productosFiltrados = this.productos.filter(p => p.category === categoria);
    }
  }

  agregarAlCarrito(producto: Producto) {
    this.carrito.agregarAlCarrito(producto);
    this.carrito.abrirCarrito();
  }

  get totalItems(): number {
    return this.carrito.items().reduce((total, item) => total + item.cantidad, 0);
  }
}