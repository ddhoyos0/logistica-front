import {Component, OnInit} from '@angular/core';
import {Despacho} from "../../core/modelos/despacho";
import {TokenService} from "../../core/servicios/token/token.service";
import {DespachoService} from "../../core/servicios/despacho/despacho.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-despacho',
  templateUrl: './listar-despacho.component.html',
  styleUrls: ['./listar-despacho.component.css']
})
export class ListarDespachoComponent implements OnInit {
  filterpost = '';
  listaDespacho: Despacho [] = [];
  roles: string[] = [];
  isUser = false;

  constructor(
    private servicioDespacho: DespachoService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    this.cargarDespacho();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_USUARIO') {
        this.isUser = true;
      }
    });
  }

  cargarDespacho(): void {
    this.servicioDespacho.listar().subscribe(
      data => {
        this.listaDespacho = data
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar despacho!',
          footer: err.error.mensaje
        });
      }
    );
  }

  borrar(id: number) {
    this.servicioDespacho.eliminar(id).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Despacho eliminado con exito!',
          showConfirmButton: false,
          timer: 1500
        });
        this.cargarDespacho();
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al eliminar despacho!',
          footer: err.error.mensaje
        });
      }
    );
  }
}
