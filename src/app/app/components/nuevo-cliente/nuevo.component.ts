import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Cliente} from "../../core/modelos/cliente";
import {ClienteService} from "../../core/servicios/cliente/cliente.service";
import {TipoDocumento} from "../../core/modelos/tipo-documento";
import Swal from "sweetalert2";

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  tipoIdentificacion = '';
  numeroIdentificacion = '';
  nombre = '';
  direccion = '';
  telefono = '';
  celular = '';
  correo = '';

  listaTipoIdentificacion: TipoDocumento [] = [];


  constructor(
    private router: Router,
    private servicioCliente: ClienteService
  ) {
  }

  ngOnInit(): void {
    this.listaTipoIdentificacion.push(new TipoDocumento("CC", "Cedula de Ciudadania"))
    this.listaTipoIdentificacion.push(new TipoDocumento("TI", "Tarjeta de identidad"))
    this.listaTipoIdentificacion.push(new TipoDocumento("NIT", "Nit"))
  }

  onCreate(): void {
    const cliente = new Cliente(
      this.tipoIdentificacion,
      this.numeroIdentificacion,
      this.nombre,
      this.direccion,
      this.telefono,
      this.celular,
      this.correo
    );

    this.servicioCliente.guardar(cliente).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente guardado con exito!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/cliente/listar']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar cliente!',
          footer: err.error.mensaje
        });
      }
    );
  }
}
