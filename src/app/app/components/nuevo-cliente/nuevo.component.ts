import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Cliente} from "../../core/modelos/cliente";
import {ClienteService} from "../../core/servicios/cliente/cliente.service";
import {TipoDocumento} from "../../core/modelos/tipo-documento";

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
    private toastr: ToastrService,
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
        this.toastr.success('Cliente Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/cliente/listar']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
