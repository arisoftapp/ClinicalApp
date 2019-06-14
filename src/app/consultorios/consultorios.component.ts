import { Component, OnInit, Inject } from '@angular/core';
import { ConsultorioService } from '../services/consultorio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Consultorio } from '../models/ConsultorioModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-consultorios',
  templateUrl: './consultorios.component.html',
  styleUrls: ['./consultorios.component.css']
})

export class ConsultoriosComponent implements OnInit {
  consultorios : Consultorio [];
  consultorio : Consultorio;
  private success : boolean;
  private message : String;
  private nombre_esp : String;
  displayedColumns = ['identifier', 'name', 'options'];

  constructor(private consul_service : ConsultorioService, private _snackBar: MatSnackBar, public addDialog: MatDialog,
    public editDialog: MatDialog, public deleteDialog: MatDialog) { }

  ngOnInit() {
    this.getConsultorios();
  }

  getConsultorios(){
    this.consul_service.getConsultorios().subscribe(
    (response : any)  => {
      var Resp = response;
      var texto = Resp._body;
      var jey = JSON.parse(texto);
      if (!jey.success){
        this.success = jey.success;
        this.SnackBarError(jey.message);
      }else {
        this.consultorios = jey.data;
      }
    error => {
      console.log(<any>error);
    }
    });
  }

  postConsultorio(consul: Consultorio){
    console.log(consul);
    this.consul_service.postConsultorio(consul).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.getConsultorios();
        }
    });
  }

  editConsultorio(consul: Consultorio){
    this.consul_service.putConsultorio(consul).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.getConsultorios();
        }
    });
  }

  dropConsultorio(consul: Consultorio){
    this.consul_service.deleteConsultorio(consul).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.getConsultorios();
        }
    });
  }

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }

  openAddDialog(): void {
    this.consultorio = new Consultorio;
    const dialogRef = this.addDialog.open(AddConsulDialog, {
      width: '500px',
      data: { nombre: this.consultorio.nombre_consultorio }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultorio.nombre_consultorio = result;
        this.postConsultorio(this.consultorio);
      }
    });
  }

  openEditDialog(consul : Consultorio) {
    this.consultorio = consul;
    const dialogRef = this.editDialog.open(EditConsulDialog, {
      width: '500px',
      data: {nombre: this.consultorio.nombre_consultorio}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.consultorio.nombre_consultorio = result;
        this.editConsultorio(this.consultorio);
      }
    });
  }

  openDropDialog(consul : Consultorio) {
    this.consultorio = consul;
    const dialogRef = this.editDialog.open(DeleteConsulDialog, {
      width: '500px',
      data: { nombre: this.consultorio.nombre_consultorio }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.dropConsultorio(this.consultorio);
      }
    });
  }
} 


@Component({
  selector: 'add-dialog',
  templateUrl: './dialogs/add.dialog.html',
  styleUrls: ['./consultorios.component.css']
})
export class AddConsulDialog {

  constructor(
    public dialogRef: MatDialogRef<AddConsulDialog>,
    @Inject (MAT_DIALOG_DATA) public data: Consultorio) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'edit-dialog',
  templateUrl: './dialogs/edit.dialog.html',
  styleUrls: ['./consultorios.component.css']
})
export class EditConsulDialog {

  constructor(
    public editDialog: MatDialogRef<EditConsulDialog>,
    @Inject (MAT_DIALOG_DATA) public data: Consultorio) {}

  onNoClick(): void {
    this.editDialog.close();
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: './dialogs/delete.dialog.html',
  styleUrls: ['./consultorios.component.css']
})
export class DeleteConsulDialog { 

  constructor(
    public editDialog: MatDialogRef<DeleteConsulDialog>,
    @Inject (MAT_DIALOG_DATA) public data: Consultorio) {}

  onNoClick(): void {
    this.editDialog.close();
  }

}
