import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './iniciar-sesion.html',
  styleUrls: ['./iniciar-sesion.css'],
})
export class IniciarSesionComponent {
  public loginData: any = {
    username: '',
    password: '',
  };
  errorMsg = '';

  iniciarSesion() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: any) =>
      u.username === this.loginData.username && u.password === this.loginData.password
    );

    if (usuario) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
      window.dispatchEvent(new Event('loginExitoso'));
    } else {
      this.errorMsg = 'Usuario o contraseña incorrectos';
    }
  }
}