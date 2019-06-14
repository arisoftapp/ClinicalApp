import { Component, OnInit, Inject } from '@angular/core';
import { EspecialidadService } from '../services/especialidad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Especialidad } from '../models/EspecialidadModel';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})


export class EspecialidadesComponent implements OnInit {
  especialidades : Especialidad [];
  especialidad : Especialidad;
  private success : boolean;
  private message : String;
  private nombre_esp : String;


  constructor(private EspService : EspecialidadService, private _snackBar: MatSnackBar, public addDialog: MatDialog,
    public editDialog: MatDialog, public deleteDialog: MatDialog) { }

  displayedColumns = ['identifier', 'name', 'options'];

  ngOnInit() {
    this.getEspecidades();
  }

  getEspecidades(){
    this.EspService.getEspecialidades().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        if (!jey.success){
          this.success = jey.success;
          this.SnackBarError(jey.message);
        }else {
          this.especialidades = jey.data;
        }
      error => {
        console.log(<any>error);
      }
    });
  }

  postEspecialidad(especialidad: Especialidad){
    this.EspService.postEspecialidad(especialidad).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.getEspecidades();
        }
    });
  }

  editEspecialidad(especialidad: Especialidad){
    this.EspService.putEspecialidad(especialidad).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.getEspecidades();
        }
    });
  }

  dropEspecialidad(especialidad: Especialidad){
    this.EspService.deleteEspecialidad(especialidad).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.getEspecidades();
        }
    });
  }

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }

  openAddDialog(): void {
    this.especialidad = new Especialidad;
    const dialogRef = this.addDialog.open(AddEspDialog, {
      width: '500px',
      data: { nombre: this.especialidad.nombre_especialidad }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.especialidad.nombre_especialidad = result;
        this.postEspecialidad(this.especialidad);
      }
    });
  }

  openEditDialog(esp : Especialidad) {
    this.especialidad = esp;
    const dialogRef = this.editDialog.open(EditEspDialog, {
      width: '500px',
      data: {nombre: this.especialidad.nombre_especialidad}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.especialidad.nombre_especialidad = result;
        this.editEspecialidad(this.especialidad);
      }
    });
  }

  openDropDialog(esp : Especialidad) {
    this.especialidad = esp;
    const dialogRef = this.editDialog.open(DeleteEspDialog, {
      width: '500px',
      data: { nombre: this.especialidad.nombre_especialidad }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.dropEspecialidad(this.especialidad);
      }
    });
  }

}

@Component({
  selector: 'add-dialog',
  templateUrl: './dialogs/add.dialog.html',
  styleUrls: ['./especialidades.component.css']
})
export class AddEspDialog {

  constructor(
    public dialogRef: MatDialogRef<AddEspDialog>,
    @Inject (MAT_DIALOG_DATA) public data: Especialidad) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'edit-dialog',
  templateUrl: './dialogs/edit.dialog.html',
  styleUrls: ['./especialidades.component.css']
})
export class EditEspDialog {

  constructor(
    public editDialog: MatDialogRef<EditEspDialog>,
    @Inject (MAT_DIALOG_DATA) public data: Especialidad) {}

  onNoClick(): void {
    this.editDialog.close();
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: './dialogs/delete.dialog.html',
  styleUrls: ['./especialidades.component.css']
})
export class DeleteEspDialog { 

  constructor(
    public editDialog: MatDialogRef<DeleteEspDialog>,
    @Inject (MAT_DIALOG_DATA) public data: Especialidad) {}

  onNoClick(): void {
    this.editDialog.close();
  }

}
