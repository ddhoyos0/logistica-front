import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Cliente} from "../../modelos/cliente";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private URL: string = `${environment.API_URL}/cliente/`;

  constructor(private httpClient: HttpClient) {
  }

  public guardar(cliente: Cliente): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'registrar', cliente);
  }

  public listar(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.URL + 'listar')
  }

  public eliminar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `eliminar/${id}`);
  }

  public actualizar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(this.URL + `actualizar/${id}`, cliente);
  }

  public getCliente(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.URL + `get/${id}`);
  }
}
