import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService, Producto } from '../../services/producto';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  cargando = true;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        console.log('DATOS:', data);
        this.productos = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }
  obtenerCategorias(): string[] {
    const categorias = this.productos.map(p => p.category);
    return [...new Set(categorias)];
  }
  filtrarPorCategoria(categoria: string): Producto[] {
    return this.productos.filter(p => p.category === categoria);
  }
  agregarAlCarrito(producto: Producto) {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const existe = carrito.find((item: any) => item.id === producto.id);

    if (existe) {
      existe.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    window.dispatchEvent(new Event('carritoActualizado'));
  }
}
