import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../core/modelos/cliente";
import {ClienteService} from "../../core/servicios/cliente/cliente.service";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "../../core/servicios/token/token.service";

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
    private toastr: ToastrService,
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
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  borrar(id: number) {
    this.servicioCliente.eliminar(id).subscribe(
      data => {
        this.toastr.success('Cliente Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarCliente();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
