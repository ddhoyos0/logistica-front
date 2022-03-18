import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TipoProducto} from "../../modelos/tipo-producto";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private URL: string = `${environment.API_URL}/tipo-producto/`;

  constructor(private httpClient: HttpClient) { }


  public guardar(producto: TipoProducto): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'registrar', producto);
  }

  public listar(): Observable<TipoProducto[]> {
    return this.httpClient.get<TipoProducto[]>(this.URL + 'listar')
  }

  public eliminar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `eliminar/${id}`);
  }

  public actualizar(id: number, producto: TipoProducto): Observable<TipoProducto> {
    return this.httpClient.put<TipoProducto>(this.URL + `actualizar/${id}`, producto);
  }

  public getProducto(id: number): Observable<TipoProducto> {
    return this.httpClient.get<TipoProducto>(this.URL + `get/${id}`);
  }
}
