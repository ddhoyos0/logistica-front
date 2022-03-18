import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Despacho} from "../../modelos/despacho";

@Injectable({
  providedIn: 'root'
})
export class DespachoService {

  private URL: string = `${environment.API_URL}/despacho/`;

  constructor(private httpClient: HttpClient) {
  }


  public guardar(despacho: Despacho): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'registrar', despacho);
  }

  public listar(): Observable<Despacho[]> {
    return this.httpClient.get<Despacho[]>(this.URL + 'listar')
  }

  public eliminar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `eliminar/${id}`);
  }

  public actualizar(id: number, despacho: Despacho): Observable<Despacho> {
    return this.httpClient.put<Despacho>(this.URL + `actualizar/${id}`, despacho);
  }

  public getDespacho(id: number): Observable<Despacho> {
    return this.httpClient.get<Despacho>(this.URL + `get/${id}`);
  }
}
