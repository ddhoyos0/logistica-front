import {TipoProducto} from "./tipo-producto";
import {Cliente} from "./cliente";

export class Despacho {

  id!: number;
  tipoEnvio: string;
  tipoProducto: TipoProducto;
  cantidad: number;
  fechaRegistro: Date;
  fechaEntrega: Date;
  lugarEntrega: string;
  precio: number;
  placa: string;
  numeroGuia: string;
  descuento: number;
  cliente: Cliente;

  constructor(tipoEnvio: string, tipoProducto: TipoProducto, cantidad: number, fechaRegistro: Date, fechaEntrega: Date, lugarEntrega: string, precio: number, placa: string, numeroGuia: string, descuento: number, cliente: Cliente) {
    this.tipoEnvio = tipoEnvio;
    this.tipoProducto = tipoProducto;
    this.cantidad = cantidad;
    this.fechaRegistro = fechaRegistro;
    this.fechaEntrega = fechaEntrega;
    this.lugarEntrega = lugarEntrega;
    this.precio = precio;
    this.placa = placa;
    this.numeroGuia = numeroGuia;
    this.descuento = descuento;
    this.cliente = cliente;
  }
}
