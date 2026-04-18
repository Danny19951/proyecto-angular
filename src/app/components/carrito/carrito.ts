import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent implements OnInit {
  items: any[] = [];
  modalVisible = false;

  ngOnInit() {
    this.cargarCarrito();
    window.addEventListener('carritoActualizado', () => {
      this.cargarCarrito();
    });
  }

  cargarCarrito() {
    this.items = JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  calcularTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.cantidad), 0);
  }

  vaciarCarrito() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      this.items = [];
      localStorage.setItem('carrito', '[]');
    }
  }

  comprar() {
    if (this.items.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de comprar.');
      return;
    }
    this.modalVisible = true;
    this.items = [];
    localStorage.setItem('carrito', '[]');
  }

  cerrarModal() {
    this.modalVisible = false;
  }
}