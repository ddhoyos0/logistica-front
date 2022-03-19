import { Component, OnInit } from '@angular/core';
import {Despacho} from "../../core/modelos/despacho";
import {TipoEnvio} from "../../core/modelos/tipo-envio";
import {TipoProducto} from "../../core/modelos/tipo-producto";
import {Cliente} from "../../core/modelos/cliente";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductoService} from "../../core/servicios/producto/producto.service";
import {ClienteService} from "../../core/servicios/cliente/cliente.service";
import {DespachoService} from "../../core/servicios/despacho/despacho.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-editar-despacho',
  templateUrl: './editar-despacho.component.html',
  styleUrls: ['./editar-despacho.component.css']
})
export class EditarDespachoComponent implements OnInit {

  despacho!: Despacho;
  listaTipoEnvio: TipoEnvio [] = [];
  listaTipoProducto: TipoProducto [] = [];
  listadoCliente: Cliente [] = [];
  mensaje = 'Debe seleccionar un tipo de envio';
  control = false;



  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private servicioProducto: ProductoService,
    private servicioCliente: ClienteService,
    private servicioDespacho: DespachoService
  ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.listaTipoEnvio.push(new TipoEnvio("TERRESTRE", "Terrestre"));
    this.listaTipoEnvio.push(new TipoEnvio("MARITIMO", "Maritimo"));
    this.cargarCliente();
    this.cargarProducto();
    this.servicioDespacho.getDespacho(id).subscribe(
      data => {
        this.despacho = data;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al consultar despacho!',
          footer: err.error.mensaje
        });
        this.router.navigate(['/']);
      }
    );
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
    this.despacho.cantidad = 1;
    this.despacho.precio = this.despacho.cantidad * this.despacho.tipoProducto.precio;

  }

  multiplicar(event: any): void {
    if (this.despacho.tipoEnvio === "") {
      this.control = true;
    }
    this.despacho.precio = this.despacho.cantidad * this.despacho.tipoProducto.precio;
    if (this.despacho.cantidad >= 10 && this.despacho.tipoEnvio === "TERRESTRE") {
      this.despacho.descuento = (this.despacho.precio * 5) / 100;
      this.despacho.precio -= this.despacho.descuento;
    }
    if (this.despacho.cantidad >= 10 && this.despacho.tipoEnvio === "MARITIMO") {
      this.despacho.descuento = (this.despacho.precio * 3) / 100;
      this.despacho.precio -= this.despacho.descuento;
    }
  }
  onUpdate(): void {
    let id: any;
    ({id} = this.activatedRoute.snapshot.params);
    this.servicioDespacho.actualizar(id, this.despacho).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto actualizado con exito!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/producto/listar']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar producto!',
          footer: err.error.mensaje
        });
      }
    );
  }
}
