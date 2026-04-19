import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CatalogoComponent } from '../../components/catalogo/catalogo';

@Component({
  selector: 'app-servicio',
  standalone: true,
  imports: [CatalogoComponent],
  templateUrl: './servicio.html',
  styleUrls: ['./servicio.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicioComponent {}
