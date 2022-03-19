import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../core/servicios/token/token.service";
import {AuthService} from "../../core/servicios/auth/auth.service";
import {Router} from "@angular/router";
import {Usuario} from "../../core/modelos/usuario";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  nuevoUsuario!: Usuario;
  nombre!: string;
  nombreUsuario!: string;
  email!: string;
  password!: string;
  errMsj!: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.nuevoUsuario = new Usuario(this.nombre, this.nombreUsuario, this.email, this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario registrado con exito!',
          showConfirmButton: false,
          timer: 1500
        });

        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar usuario!',
          footer: err.error.mensaje
        });
      }
    );
  }

}
