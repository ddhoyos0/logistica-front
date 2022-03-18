export class TipoProducto {
  id!: number;
  codigo: string;
  nombre: string;
  precio: number;


  constructor(codigo: string, nombre: string, precio: number) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
  }
}
