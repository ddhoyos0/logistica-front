import {Component, OnInit} from '@angular/core';
import {TipoProducto} from "../../core/modelos/tipo-producto";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "../../core/servicios/token/token.service";
import {ProductoService} from "../../core/servicios/producto/producto.service";

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
    private toastr: ToastrService,
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
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  borrar(id: number) {
    this.servicioProducto.eliminar(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProducto();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
