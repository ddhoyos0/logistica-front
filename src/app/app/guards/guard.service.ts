import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {TokenService} from "../core/servicios/token/token.service";


@Injectable({
  providedIn: 'root'
})
export class ProdGuardService implements CanActivate {

  realRol = '';

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let expectedRol: any;
    ({expectedRol} = route.data);
    const roles = this.tokenService.getAuthorities();
    this.realRol = 'user';
    roles.forEach((rol: any) => {
      if (rol === 'ROLE_ADMINISTRADOR') {
        this.realRol = 'admin';
      }
    });
    if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
