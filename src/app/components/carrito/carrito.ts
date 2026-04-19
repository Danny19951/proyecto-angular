import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarritoComponent {
  public carrito = inject(CarritoService);
  public modalVisible = signal(false);

  comprar(): void {
    if (this.carrito.items().length === 0) {
      alert('El carrito está vacío. Agrega productos antes de comprar.');
      return;
    }
    this.modalVisible.set(true);
    this.carrito.vaciarCarrito();
  }

  vaciarCarrito(): void {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      this.carrito.vaciarCarrito();
    }
  }

  cerrarModal(): void {
    this.modalVisible.set(false);
  }
}
