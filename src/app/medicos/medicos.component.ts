import { Component, OnInit, Inject } from '@angular/core';
import { ConsultorioService } from '../services/consultorio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Medico } from '../models/MedicoModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicoService } from '../services/medico.service';
import { EntidadService } from '../services/entidad.service';
import localeMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { Entidad } from '../models/EntidadModel';
import { Municipio } from '../models/MunicipioModel';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  medicos : Medico [];
  medico : Medico;
  private success : boolean;
  private message : string;
  private nombre_esp : string;
  displayedColumns = ['identifier', 'name', 'consul', 'phone', 'email', 'options'];
  public recetaPath;
  recetaURL: any;
  

  constructor(private medic_service : MedicoService, private _snackBar: MatSnackBar, public addDialog: MatDialog,
    public editDialog: MatDialog, public deleteDialog: MatDialog) {
      registerLocaleData(localeMX);
    }

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
  styleUrls: ['./medicos.component.css'],
})
export class AddMedicDialog implements OnInit{
  
  public recetaPath;
  public analisisPath;
  public constanciaPath;
  public certifPath;
  public facturaPath;
  public selloPath;
  recetaURL: any;
  analisisURL: any;
  constanciaURL: any;
  certifURL: any;
  facturaURL: any;
  selloURL: any;
  public message : string;
  Estados : Entidad [];
  Municipios : Municipio [];

  constructor(
    public dialogRef: MatDialogRef<AddMedicDialog>, public entidad_serv : EntidadService,
    @Inject (MAT_DIALOG_DATA) public data: Medico) { registerLocaleData(localeMX); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.getEstados();
  }

  getEstados(){
    this.entidad_serv.getEntidades().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (jey.success){
          this.Estados = jey.data;
        }
      error => {
        console.log(<any>error);
      }
      });
  }

  getMunicipios(estado){
    this.entidad_serv.getMunicipios(estado).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (jey.success){
          this.Municipios = jey.data;
        }
      error => {
        console.log(<any>error);
      }
    });
  }

  preview(files, doc : number) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Sólo se permiten archivos de imagen";
      return;
    }
    var reader = new FileReader();
    switch(doc) { 
      case 1: { 
        this.recetaPath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.recetaURL = reader.result; 
        }
        break; 
      } 
      case 2: { 
        this.analisisPath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.analisisURL = reader.result; 
        }
        break; 
      }
      case 3: { 
        this.constanciaPath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.constanciaURL = reader.result; 
        }
        break; 
      }
      case 4: { 
        this.certifPath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.certifURL = reader.result; 
        }
        break; 
      }
      case 5: { 
        this.facturaPath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.facturaURL = reader.result; 
        }
        break; 
      }  
      case 6: { 
        this.selloPath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.selloURL = reader.result; 
        }
        break; 
      }   
    }
  }

}
