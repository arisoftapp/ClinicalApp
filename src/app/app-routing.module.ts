import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { InicioComponent } from './inicio/inicio.component';
import { CitasComponent } from './citas/citas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { MedicosComponent } from './medicos/medicos.component';
import { ConsultoriosComponent } from './consultorios/consultorios.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';

const routes: Routes = [
  { path : '', component : MainComponent,
    children : [
      { path : '', component : InicioComponent },
      { path : 'citas', component : CitasComponent },
      { path : 'calendario', component : CalendarioComponent },
      { path : 'pacientes', component : PacientesComponent },
      { path : 'medicos', component : MedicosComponent },
      { path : 'consultorios', component : ConsultoriosComponent },
      { path : 'especialidades', component : EspecialidadesComponent }
    ]
  },
  { path : 'login', component : LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
