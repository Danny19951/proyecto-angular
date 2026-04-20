import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class LoginComponent implements OnInit {
  modoRegistro = false;
  @Input() iniciarEnRegistro = false;

  ngOnInit() {
    if (this.iniciarEnRegistro) {
      this.modoRegistro = true;
    }
  }

  errorMsg = '';
  successMsg = '';

  loginData = { username: '', password: '' };
  registerData = { nombre: '', username: '', email: '', password: '', passwordConfirm: '', genero: '' };

  toggleFormulario() {
    this.modoRegistro = !this.modoRegistro;
    this.errorMsg = '';
    this.successMsg = '';
  }

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

  registrarUsuario() {
    this.errorMsg = '';
    if (this.registerData.password !== this.registerData.passwordConfirm) {
      this.errorMsg = 'Las contraseñas no coinciden';
      return;
    }
    if (this.registerData.password.length < 6) {
      this.errorMsg = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const existe = usuarios.some((u: any) => u.username === this.registerData.username);
    if (existe) {
      this.errorMsg = 'El nombre de usuario ya está en uso';
      return;
    }

    const nuevoUsuario = {
      username: this.registerData.username,
      password: this.registerData.password,
      firstName: this.registerData.nombre.split(' ')[0],
      lastName: this.registerData.nombre.split(' ')[1] || '',
      email: this.registerData.email,
      genero: this.registerData.genero
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    this.successMsg = '¡Registro exitoso! Ya puedes iniciar sesión';

    setTimeout(() => {
      this.toggleFormulario();
      this.successMsg = '';
    }, 2000);
  }
}