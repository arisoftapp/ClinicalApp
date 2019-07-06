import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Medico } from '../models/MedicoModel';
import { MedicoService } from '../services/medico.service';
import localeMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { Cita } from '../models/CitaModel';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})


export class CitasComponent implements OnInit {
  Medicos : Medico [];
  medico : Medico;
  private success : boolean;
  dia = '1';
  displayedColumns = ['time', 'pacient', 'consul', 'status', 'options'];
  citas : Cita [] = [
    {id_cita: 1, id_tipo_cita : '1', tipo_cita: "Consulta", id_paciente : 1, nombre_pac: 'Jorge', apellido_pac : 'Gutierrez', id_medico : 1, fecha : '02/07/2019', status : "1"},
    {id_cita: 2, id_tipo_cita : '1', tipo_cita: "Consulta", id_paciente : 1, nombre_pac: 'Lidia', apellido_pac : 'Lau', id_medico : 1, fecha : '02/07/2019', status : "2"},
    {id_cita: 1, id_tipo_cita : '1', tipo_cita: "Consulta", id_paciente : 1, nombre_pac: 'Pablo', apellido_pac : 'Leyva', id_medico : 1, fecha : '02/07/2019', status : "1"},
    {id_cita: 2, id_tipo_cita : '1', tipo_cita: "Consulta", id_paciente : 1, nombre_pac: 'Azucena', apellido_pac : 'Reyes', id_medico : 1, fecha : '02/07/2019', status : "2"},
    {id_cita: 2, id_tipo_cita : '1', tipo_cita: "Consulta", id_paciente : 1, nombre_pac: 'María', apellido_pac : 'Contreras', id_medico : 1, fecha : '02/07/2019', status : "2"}
  ];

  constructor(private medic_service : MedicoService, private _snackBar: MatSnackBar,
    private router : Router) { }

  ngOnInit() {
    this.getMedicos();
  }

  getMedicos(){
    this.medic_service.getMedicos().subscribe(
    (response : any)  => {
      var Resp = response;
      var texto = Resp._body;
      var jey = JSON.parse(texto); 
      if (!jey.success){
        this.success = jey.success; 
        this.SnackBarError(jey.message);
      }else {
        this.Medicos = jey.data;
      }
    error => {
      console.log(<any>error);
    }
    });
  }

  getMedicoCitas(id_medico){

  }

  getCitasDia(dia){

  }

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }

}
