import {Component, OnInit} from '@angular/core';
import {TipoProducto} from "../../core/modelos/tipo-producto";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductoService} from "../../core/servicios/producto/producto.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto!: TipoProducto;

  constructor(
    private servicioProducto: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.servicioProducto.getProducto(id).subscribe(
      data => {
        this.producto = data;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al consultar producto!',
          footer: err.error.mensaje
        });
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    let id: any;
    ({id} = this.activatedRoute.snapshot.params);
    this.servicioProducto.actualizar(id, this.producto).subscribe(
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
