import {Component, OnInit} from '@angular/core';
import {TipoProducto} from "../../core/modelos/tipo-producto";
import {TokenService} from "../../core/servicios/token/token.service";
import {ProductoService} from "../../core/servicios/producto/producto.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {

  listaProducto: TipoProducto [] = [];
  roles: string[] = [];
  isUser = false;

  constructor(
    private servicioProducto: ProductoService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.cargarProducto();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_USUARIO') {
        this.isUser = true;
      }
    });
  }

  cargarProducto(): void {
    this.servicioProducto.listar().subscribe(
      data => {
        this.listaProducto = data
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar producto!',
          footer: err.error.mensaje
        });
      }
    );
  }

  borrar(id: number) {
    this.servicioProducto.eliminar(id).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto eliminado con exito!',
          showConfirmButton: false,
          timer: 1500
        });
        this.cargarProducto();
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al eliminar producto!',
          footer: err.error.mensaje
        });
      }
    );
  }
}
