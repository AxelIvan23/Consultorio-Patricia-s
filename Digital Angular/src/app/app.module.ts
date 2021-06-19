import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { DrHistorialComponent } from './components/dr-historial/dr-historial.component';
import { DrNotificacionComponent } from './components/dr-notificacion/dr-notificacion.component';
import { VideollamadaComponent } from './components/videollamada/videollamada.component';

@NgModule({
  declarations: [
    AppComponent,
    AcercaComponent,
    ContactanosComponent,
    DrHistorialComponent,
    DrNotificacionComponent,
    VideollamadaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
