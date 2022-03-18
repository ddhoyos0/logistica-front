import { Component, OnInit } from '@angular/core';
import {ProductoService} from "../../core/servicios/producto/producto.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Despacho} from "../../core/modelos/despacho";
import {TipoProducto} from "../../core/modelos/tipo-producto";

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  codigo = '';
  nombre = '';
  precio = 0;

  constructor(
    private servicioProducto: ProductoService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const producto = new TipoProducto(
      this.codigo,
      this.nombre,
      this.precio,
    );
    this.servicioProducto.guardar(producto).subscribe(
      data => {
        this.toastr.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/producto/listar']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
