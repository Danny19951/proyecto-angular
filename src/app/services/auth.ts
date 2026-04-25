import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: any = null;

  login(username: string, password: string) {
    // 🔥 SIMULACIÓN (sin base de datos)
    const userFake = {
      username: username,
      firstName: username,
      genero: 'masculino'
    };

    this.usuario = userFake;
    localStorage.setItem('usuario', JSON.stringify(userFake));
  }

  logout() {
    this.usuario = null;
    localStorage.removeItem('usuario');
  }

  getUsuario() {
    if (!this.usuario) {
      const data = localStorage.getItem('usuario');
      if (data) {
        this.usuario = JSON.parse(data);
      }
    }
    return this.usuario;
  }

  isLoggedIn(): boolean {
    return this.getUsuario() != null;
  }
}