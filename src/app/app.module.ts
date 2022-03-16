import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './app/components/login/login.component';
import {NavBarComponent} from './app/components/nav-bar/nav-bar.component';
import {HomeComponent} from './app/components/home/home.component';
import {RegistrarComponent} from './app/components/registrar/registrar.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NuevoComponent} from './app/components/nuevo-cliente/nuevo.component';
import {interceptorProvider} from "./app/interceptor/interceptor.service";
import {ListarClienteComponent} from './app/components/listar-cliente/listar-cliente.component';
import {EditarClienteComponent} from './app/components/editar-cliente/editar-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    RegistrarComponent,
    NuevoComponent,
    ListarClienteComponent,
    EditarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
