import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './components/login/login';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion';
import { CatalogoComponent } from './components/catalogo/catalogo';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: LoginComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'bienvenida', component: BienvenidaComponent },
];
