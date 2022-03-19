import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../core/modelos/cliente";
import {ClienteService} from "../../core/servicios/cliente/cliente.service";
import {TokenService} from "../../core/servicios/token/token.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  listaclientes: Cliente [] = [];
  roles: string[] = [];
  isUser = false;

  constructor(
    private servicioCliente: ClienteService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    this.cargarCliente();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_USUARIO') {
        this.isUser = true;
      }
    });
  }

  cargarCliente(): void {
    this.servicioCliente.listar().subscribe(
      data => {
        this.listaclientes = data
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar clientes!',
          footer: err.error.mensaje
        });
      }
    );
  }

  borrar(id: number) {
    this.servicioCliente.eliminar(id).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente eliminado con exito!',
          showConfirmButton: false,
          timer: 1500
        });
        this.cargarCliente();
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al eliminar cliente!',
          footer: err.error.mensaje
        });
      }
    );
  }
}
