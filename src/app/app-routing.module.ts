import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { CitasComponent } from './citas/citas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacientesListComponent } from './pacientes/pacientes-list/pacientes-list.component';
import { PacientesRegistroComponent } from './pacientes/pacientes-registro/pacientes-registro.component';
import { MedicosComponent } from './medicos/medicos.component';
import { RegistrarMedicoComponent } from './medicos/registro/registro.component';
import { MedicosListComponent } from './medicos/medicos-list/medicos-list.component';
import { ConsultoriosComponent } from './consultorios/consultorios.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { RegistroCitaComponent } from './citas/modulos/registro-cita/registro-cita.component';
import { CitasListComponent } from './citas/citas-list/citas-list.component';
import{ChatComponent} from './chat/chat.component'

const routes: Routes = [
  { path : 'chat', component : ChatComponent },
  { path : 'inicio', component : InicioComponent },
  { path : 'citas', component : CitasListComponent, children: [
    {path : '', component : CitasComponent},
    {path : "registrarCita", component : RegistroCitaComponent}
  ] },
  { path : 'calendario', component : CalendarioComponent },
  { path : 'pacientes', component : PacientesComponent, children : [
    { path : '', component : PacientesListComponent },
    { path : 'registrarPaciente/:clavePaciente', component : PacientesRegistroComponent }
  ]},
  { path : 'medicos', component : MedicosComponent, children : [
    { path : '', component : MedicosListComponent },
    { path : 'registrarMedico/:claveMedico', component : RegistrarMedicoComponent }
  ]},
  { path : 'consultorios', component : ConsultoriosComponent },
  { path : 'especialidades', component : EspecialidadesComponent },
  { path : 'login', component : LoginComponent },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
