import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { DrHistorialComponent } from './components/dr-historial/dr-historial.component';
import { DrNotificacionComponent } from './components/dr-notificacion/dr-notificacion.component';
import { VideollamadaComponent } from './components/videollamada/videollamada.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { IniciosesionComponent } from './components/iniciosesion/iniciosesion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CookieService } from 'ngx-cookie-service';
import { ConsultaHistPacienteComponent } from './components/consulta-hist-paciente/consulta-hist-paciente.component';
import { FuncionesEnfermeraComponent } from './components/funciones-enfermera/funciones-enfermera.component';

@NgModule({
  declarations: [
    AppComponent,
    AcercaComponent,
    ContactanosComponent,
    DrHistorialComponent,
    DrNotificacionComponent,
    VideollamadaComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    ConsultaComponent,
    IniciosesionComponent,
    RegistroComponent,
    ConsultaHistPacienteComponent,
    FuncionesEnfermeraComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: InicioComponent},
      {path: 'Inicio', component: InicioComponent},
      {path: 'Acerca', component: AcercaComponent},
      {path: 'Contactanos', component: ContactanosComponent},
      {path: 'Iniciosesion', component: IniciosesionComponent},
      {path: 'ConsultaHistPaciente', component: ConsultaHistPacienteComponent},
      {path: 'FuncionesEnfermera', component: FuncionesEnfermeraComponent},
      {path: 'Registro', component: RegistroComponent},
      {path: 'Consulta/:id', component: ConsultaComponent},
      {path: 'DrHistorial/:id', component: ContactanosComponent},
      {path: 'Videollamada', component: VideollamadaComponent},
      {path: '**', pathMatch: 'full', component: InicioComponent} 
    ])
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
