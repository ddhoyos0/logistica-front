import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../core/modelos/cliente";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ClienteService} from "../../core/servicios/cliente/cliente.service";
import {TipoDocumento} from "../../core/modelos/tipo-documento";

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente!: Cliente;
  listaTipoIdentificacion: TipoDocumento [] = [];

  constructor(
    private servicioCliente: ClienteService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.listaTipoIdentificacion.push(new TipoDocumento("CC","Cedula de Ciudadania"))
    this.listaTipoIdentificacion.push(new TipoDocumento("TI","Tarjeta de identidad"))
    this.listaTipoIdentificacion.push(new TipoDocumento("NIT","Nit"))

    let id = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    this.servicioCliente.getCliente(id).subscribe(
      data => {
        this.cliente = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    let id: any;
    ({id} = this.activatedRoute.snapshot.params);
    this.servicioCliente.actualizar(id, this.cliente).subscribe(
      data => {
        this.toastr.success('Cliente Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/cliente/listar']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
}
