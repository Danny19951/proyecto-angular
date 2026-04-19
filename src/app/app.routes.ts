import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RegistroComponent } from './pages/registro/registro';
import { ServicioComponent } from './pages/servicio/servicio'; // Importa el nuevo componente

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'servicio', component: ServicioComponent } // Añade la nueva ruta
];
