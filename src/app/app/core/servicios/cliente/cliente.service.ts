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
    return this.httpClient.post(this.URL + 'registrar', cliente);
  }
}
