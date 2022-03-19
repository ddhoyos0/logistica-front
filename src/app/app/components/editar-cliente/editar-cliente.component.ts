import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../core/modelos/cliente";
import {ActivatedRoute, Router} from "@angular/router";
import {ClienteService} from "../../core/servicios/cliente/cliente.service";
import {TipoDocumento} from "../../core/modelos/tipo-documento";
import Swal from 'sweetalert2';

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
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.listaTipoIdentificacion.push(new TipoDocumento("CC", "Cedula de Ciudadania"))
    this.listaTipoIdentificacion.push(new TipoDocumento("TI", "Tarjeta de identidad"))
    this.listaTipoIdentificacion.push(new TipoDocumento("NIT", "Nit"))

    let id = this.activatedRoute.snapshot.params['id'];
    this.servicioCliente.getCliente(id).subscribe(
      data => {
        this.cliente = data;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al consultar cliente!',
          footer: err.error.mensaje
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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente actualizado con exito!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/cliente/listar']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar cliente!',
          footer: err.error.mensaje
        });
      }
    );
  }
}
