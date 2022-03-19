import {Component, OnInit} from '@angular/core';
import {TipoEnvio} from "../../core/modelos/tipo-envio";
import {TipoProducto} from "../../core/modelos/tipo-producto";
import {Cliente} from "../../core/modelos/cliente";
import {ProductoService} from "../../core/servicios/producto/producto.service";
import {ClienteService} from "../../core/servicios/cliente/cliente.service";
import {DespachoService} from "../../core/servicios/despacho/despacho.service";
import {Router} from "@angular/router";
import {Despacho} from "../../core/modelos/despacho";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-despacho',
  templateUrl: './nuevo-despacho.component.html',
  styleUrls: ['./nuevo-despacho.component.css']
})
export class NuevoDespachoComponent implements OnInit {

  listaTipoEnvio: TipoEnvio [] = [];
  listaTipoProducto: TipoProducto [] = [];
  listadoCliente: Cliente [] = [];

  tipoEnvio = '';
  tipoProducto!: TipoProducto;
  cantidad = 0;
  fechaEntrega = new Date;
  lugarEntrega = '';
  precio = 0;
  placa = '';
  numeroGuia = '';
  descuento = 0;
  cliente!: Cliente;
  mensaje = 'Debe seleccionar un tipo de envio';
  control = false;

  constructor(
    private router: Router,
    private servicioProducto: ProductoService,
    private servicioCliente: ClienteService,
    private servicioDespacho: DespachoService
  ) {
  }

  ngOnInit(): void {
    this.listaTipoEnvio.push(new TipoEnvio("TERRESTRE", "Terrestre"));
    this.listaTipoEnvio.push(new TipoEnvio("MARITIMO", "Maritimo"));
    this.cargarCliente();
    this.cargarProducto();
  }

  ocultar(event: any): void {
    this.control = false;
  }

  cargarCliente(): void {
    this.servicioCliente.listar().subscribe(
      dato => {
        this.listadoCliente = dato;
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar clientes!',
          footer: err.error.mensaje
        });
      });
  }

  cargarProducto(): void {
    this.servicioProducto.listar().subscribe(
      dato => {
        this.listaTipoProducto = dato;
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar tipo producto!',
          footer: err.error.mensaje
        });
      });
  }

  calcular(event: any): void {
    this.cantidad = 1;
    this.precio = this.cantidad * this.tipoProducto.precio;

  }

  multiplicar(event: any): void {
    if (this.tipoEnvio === "") {
      this.control = true;
    }
    this.precio = this.cantidad * this.tipoProducto.precio;
    if (this.cantidad >= 10 && this.tipoEnvio === "TERRESTRE") {
      this.descuento = (this.precio * 5) / 100;
      this.precio -= this.descuento;
    }
    if (this.cantidad >= 10 && this.tipoEnvio === "MARITIMO") {
      this.descuento = (this.precio * 3) / 100;
      this.precio -= this.descuento;
    }
  }

  onCreate(): void {
    const despacho = new Despacho(
      this.tipoEnvio,
      this.tipoProducto,
      this.cantidad,
      new Date(),
      this.fechaEntrega,
      this.lugarEntrega,
      this.precio,
      this.placa,
      this.numeroGuia,
      this.descuento,
      this.cliente
    );
    this.servicioDespacho.guardar(despacho).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Despacho guardado con exito!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/despacho/listar']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar despacho!',
          footer: err.error.mensaje
        });
      }
    );
  }
}
