import { Component, OnInit, Inject } from '@angular/core';
import { ConsultorioService } from '../services/consultorio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
//import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Medico } from '../models/MedicoModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicoService } from '../services/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  medicos : Medico [];
  medico : Medico;
  private success : boolean;
  private message : String;
  private nombre_esp : String;
  displayedColumns = ['identifier', 'name', 'consul', 'phone', 'email', 'options'];

  constructor(private medic_service : MedicoService, private _snackBar: MatSnackBar, public addDialog: MatDialog,
    public editDialog: MatDialog, public deleteDialog: MatDialog) { }

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
        this.medicos = jey.data;
      }
    error => {
      console.log(<any>error);
    }
    });
  }

  postMedico(medico: Medico){
    console.log(medico);
    this.medic_service.postMedico(medico).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.getMedicos();
        }
    });
  }

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }

  openAddDialog(): void {
    this.medico = new Medico;
    const dialogRef = this.addDialog.open(AddMedicDialog, {
      width: '80%',
      data: { medico : this.medico }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medico = result;
        this.postMedico(this.medico);
      }
    });
  }

}

@Component({
  selector: 'add-dialog',
  templateUrl: './dialogs/add.dialog.html',
  styleUrls: ['./medicos.component.css']
})
export class AddMedicDialog {

  constructor(
    public dialogRef: MatDialogRef<AddMedicDialog>,
    @Inject (MAT_DIALOG_DATA) public data: Medico) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
