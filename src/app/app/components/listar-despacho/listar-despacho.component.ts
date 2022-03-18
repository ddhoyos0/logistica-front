import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../core/modelos/cliente";
import {Despacho} from "../../core/modelos/despacho";
import {ClienteService} from "../../core/servicios/cliente/cliente.service";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "../../core/servicios/token/token.service";
import {DespachoService} from "../../core/servicios/despacho/despacho.service";

@Component({
  selector: 'app-listar-despacho',
  templateUrl: './listar-despacho.component.html',
  styleUrls: ['./listar-despacho.component.css']
})
export class ListarDespachoComponent implements OnInit {

  listaDespacho: Despacho [] = [];
  roles: string[] = [];
  isUser = false;

  constructor(
    private servicioDespacho: DespachoService,
    private toastr: ToastrService,
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
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  borrar(id: number) {
    this.servicioDespacho.eliminar(id).subscribe(
      data => {
        this.toastr.success('Despacho Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarDespacho();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
