import { Injectable, signal, computed } from '@angular/core';
import { Producto } from '../models/producto.model';

export interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  public items = signal<CarritoItem[]>([]);
  public total = computed(() => {
    return this.items().reduce((total, item) => total + (item.producto.price * item.cantidad), 0);
  });
  public visible = signal(false);

  constructor() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.items.set(JSON.parse(carritoGuardado));
    }

    window.addEventListener('storage', (event) => {
      if (event.key === 'carrito') {
        this.items.set(JSON.parse(event.newValue || '[]'));
      }
    });
  }

  agregarAlCarrito(producto: Producto): void {
    const itemExistente = this.items().find(i => i.producto.id === producto.id);
    if (itemExistente) {
      this.aumentarCantidad(producto.id);
    } else {
      this.items.set([...this.items(), { producto, cantidad: 1 }]);
    }
    this.actualizarLocalStorage();
  }

  aumentarCantidad(productoId: number): void {
    this.items.set(this.items().map(i => {
      if (i.producto.id === productoId) {
        return { ...i, cantidad: i.cantidad + 1 };
      }
      return i;
    }));
    this.actualizarLocalStorage();
  }

  disminuirCantidad(productoId: number): void {
    const item = this.items().find(i => i.producto.id === productoId);
    if (item && item.cantidad > 1) {
      this.items.set(this.items().map(i => {
        if (i.producto.id === productoId) {
          return { ...i, cantidad: i.cantidad - 1 };
        }
        return i;
      }));
    } else {
      this.eliminarDelCarrito(productoId);
    }
    this.actualizarLocalStorage();
  }

  eliminarDelCarrito(productoId: number): void {
    this.items.set(this.items().filter(i => i.producto.id !== productoId));
    this.actualizarLocalStorage();
  }

  vaciarCarrito(): void {
    this.items.set([]);
    this.actualizarLocalStorage();
  }

  abrirCarrito(): void {
    this.visible.set(true);
  }

  cerrarCarrito(): void {
    this.visible.set(false);
  }

  private actualizarLocalStorage(): void {
    localStorage.setItem('carrito', JSON.stringify(this.items()));
    window.dispatchEvent(new CustomEvent('carritoActualizado'));
  }
}
