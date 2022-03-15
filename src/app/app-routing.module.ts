import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./app/components/home/home.component";
import {LoginComponent} from "./app/components/login/login.component";
import {RegistrarComponent} from "./app/components/registrar/registrar.component";
import {NuevoComponent} from "./app/components/nuevo-cliente/nuevo.component";
import {ProdGuardService as guard} from "./app/guards/guard.service";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistrarComponent},
  {path: 'cliente/registrar', component: NuevoComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
