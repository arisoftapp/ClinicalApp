import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { SchedulerModule } from './scheduler.module';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { CitasComponent} from './citas/citas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacientesListComponent } from './pacientes/pacientes-list/pacientes-list.component';
import { PacientesRegistroComponent } from './pacientes/pacientes-registro/pacientes-registro.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicosListComponent } from './medicos/medicos-list/medicos-list.component';
import { RegistrarMedicoComponent } from './medicos/registro/registro.component';
import { ConsultoriosComponent, AddConsulDialog, EditConsulDialog, DeleteConsulDialog } from './consultorios/consultorios.component';
import { EspecialidadesComponent, AddEspDialog, EditEspDialog, DeleteEspDialog } from './especialidades/especialidades.component';
import { CitasListComponent } from './citas/citas-list/citas-list.component';
import {RegistroCitaComponent} from './citas/modulos/registro-cita/registro-cita.component'




@NgModule({
  declarations: [ 
    AppComponent,
    LoginComponent,
    InicioComponent, 
    CitasComponent, 
    CalendarioComponent, 
    PacientesComponent, 
    PacientesListComponent, 
    PacientesRegistroComponent,
    MedicosComponent, 
    MedicosListComponent,
    RegistrarMedicoComponent,
    ConsultoriosComponent, 
    EspecialidadesComponent,
    AddEspDialog,
    EditEspDialog,
    DeleteEspDialog,
    AddConsulDialog,
    EditConsulDialog,
    DeleteConsulDialog,
    CitasListComponent,
    RegistroCitaComponent
  
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SchedulerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddEspDialog,
    EditEspDialog,
    DeleteEspDialog,
    AddConsulDialog,
    EditConsulDialog,
    DeleteConsulDialog

  ],
  
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
