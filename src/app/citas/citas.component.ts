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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


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
  citas : Cita [];
  cita: Cita;

  constructor(private medic_service : MedicoService, private _snackBar: MatSnackBar,
    private router : Router, public addDialog: MatDialog) { }

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

  openAddDialog(): void {
    this.router.navigate(['citas/registrarCita/']);
  }

}
