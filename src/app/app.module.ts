import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { CitasComponent } from './citas/citas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { MedicosComponent } from './medicos/medicos.component';
import { ConsultoriosComponent } from './consultorios/consultorios.component';
import { EspecialidadesComponent, AddEspDialog, EditEspDialog } from './especialidades/especialidades.component';
import { MainComponent } from './main/main.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent, 
    CitasComponent, 
    CalendarioComponent, 
    PacientesComponent, 
    MedicosComponent, 
    ConsultoriosComponent, 
    EspecialidadesComponent, 
    MainComponent,
    AddEspDialog,
    EditEspDialog
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddEspDialog,
    EditEspDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
