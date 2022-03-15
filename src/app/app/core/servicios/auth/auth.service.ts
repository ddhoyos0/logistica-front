import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment.prod";
import {Usuario} from "../../modelos/usuario";
import {Login} from "../../modelos/login";
import {JwtDTO} from "../../modelos/jwt-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL: string = `${environment.API_URL}/auth/`;
  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(this.URL + 'registrar', nuevoUsuario);
  }

  public login(loginUsuario: Login): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.URL + 'login', loginUsuario);
  }
}
