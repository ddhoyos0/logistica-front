import {Component, OnInit} from '@angular/core';
import {Login} from "../../core/modelos/login";
import {TokenService} from "../../core/servicios/token/token.service";
import {AuthService} from "../../core/servicios/auth/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario!: Login;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new Login(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido ' + data.nombreUsuario,
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/']);
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.message;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al iniciar sesión!',
          footer: err.error.mensaje
        });
      }
    );
  }
}
