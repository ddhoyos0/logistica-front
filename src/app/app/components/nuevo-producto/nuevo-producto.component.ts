import {Component, OnInit} from '@angular/core';
import {ProductoService} from "../../core/servicios/producto/producto.service";
import {Router} from "@angular/router";
import {TipoProducto} from "../../core/modelos/tipo-producto";
import Swal from 'sweetalert2';

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
    private router: Router,
  ) {
  }

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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto guardado con exito!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/producto/listar']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar producto!',
          footer: err.error.mensaje
        });
      }
    );
  }
}
