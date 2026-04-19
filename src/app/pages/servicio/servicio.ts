import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login';

@Component({
  selector: 'app-servicio',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './servicio.html',
  styleUrls: ['./servicio.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicioComponent {}
