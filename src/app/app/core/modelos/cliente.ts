export class Cliente {
  id!: number;
  tipoIdentificacion!: string;
  numeroIdentificacion!: string;
  nombre!: string;
  direccion!: string;
  telefono!: string;
  celular!: string;
  correo!: string;


  constructor(tipoIdentificacion: string, numeroIdentificacion: string, nombre: string, direccion: string, telefono: string, celular: string, correo: string) {
    this.tipoIdentificacion = tipoIdentificacion;
    this.numeroIdentificacion = numeroIdentificacion;
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
    this.celular = celular;
    this.correo = correo;
  }

}
