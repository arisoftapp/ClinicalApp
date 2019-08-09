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
import { CitasService } from '../services/citas.service';
import { MatDatepickerInputEvent } from '@angular/material';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})


export class CitasComponent implements OnInit {
  Medicos : Medico [];
  id_medico : any;
  medico : Medico;
  mas_citas: Date;
  private success : boolean;
  dia = '1';
  displayedColumns = ['time', 'pacient', 'consul', 'status', 'options'];
  citas : Cita [] = [];
  citas_hoy: any [] = [];
  respaldo_citas: any [] =[];
  cita: Cita;

  constructor(private medic_service : MedicoService, public citas_serv : CitasService, private _snackBar: MatSnackBar,
    private router : Router, public addDialog: MatDialog) { }

  ngOnInit() {
    this.getMedicos();
    this.getCitas();  
    
  }

  getCitas(){
    this.citas_serv.getCita().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          this.SnackBarError(jey.message);
        }else {
          this.citas = jey.data;
          this.citas.sort(function (a, b) {
            if (a.hora > b.hora) {
              return 1;
            }
            if (a.hora < b.hora) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          this.respaldo_citas = this.citas;
          this.getCitasDia(this.dia);
        }
      error => {
        console.log(<any>error);
      }
      });
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
        this.Medicos.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
    error => {
      console.log(<any>error);
    }
    });
  }

  getMedicoCitas(id_medico){
    if(this.dia < '3'){
      this.getCitasDia(this.dia)
    }else{
      this.CitasDia(this.mas_citas, this.id_medico)
    }
    
  }

  getCitasDia(dia){
    if(this.dia == '1'){
      var hoy = new Date();
      this.CitasDia(hoy, this.id_medico)
    }else if(this.dia == '2'){
      var hoy = new Date();
      hoy.setDate(hoy.getDate() + 1);
      this.CitasDia(hoy, this.id_medico);
    }

  }

  CitasDia(hoy: Date, med: any){
    this.citas_hoy = [];
    let dd: any = hoy.getDate();
      if(dd < 10){
        dd = "0" + dd
      }

      let mm: any = hoy.getMonth() + 1;
      if(mm < 10){
        mm = "0" + mm
      }

      let yy = hoy.getFullYear();
      let fecha_hoy = yy +"-"+mm+"-"+dd
      let fecha_cita;

      for(let cita of this.respaldo_citas){
        fecha_cita = cita.fecha.substring(0,10);
        if(fecha_hoy == fecha_cita){
         
          this.citas_hoy.push(cita) 
        }
      }
      if(med == undefined || med == 0){
        this.citas = this.citas_hoy;
      }else{
        this.CitasxMed() 
      }
      
  }

  CitasxMed(){
    this.citas = [];
    for(let cita of this.citas_hoy){
      if(this.id_medico == cita.id_medico){
        this.citas.push(cita) 
      }
    }
  } 

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }

  openAddDialog(): void {
    this.router.navigate(['citas/registrarCita/']);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.CitasDia(this.mas_citas, this.id_medico)
  }

  openDialog(cita: any) {
    const dialogRef = this.addDialog.open(CitaDetalle, {
      data:{cita}
    });
  }
}

@Component({
  selector: 'dialog-detalle-cita',
  templateUrl: './dialogs/detalles_cita.html',
  styleUrls: ['./citas.component.css']
})
export class CitaDetalle{
  dtl_cita: any;
  dtl_status: boolean;
  success: any;
  constructor( public citas_serv : CitasService, private _snackBar: MatSnackBar, private router : Router,
    public CitaDialog: MatDialogRef<CitaDetalle>,
    @Inject (MAT_DIALOG_DATA) public data: any) {
      this.dtl_cita = data.cita;
      if(this.dtl_cita.status == 1){
        this.dtl_status = true;
      }else{
        this.dtl_status = false;
      };
    }

    putStatus(){
      if(this.dtl_status == false){
        this.dtl_cita.status = 1;
      }else if(this.dtl_status == true){
        this.dtl_cita.status = 2;
      }
       this.citas_serv.putStatus(this.dtl_cita).subscribe(
         (response : any)  => {
           var Resp = response;
           var texto = Resp._body;
           var jey = JSON.parse(texto);
           this.success = jey.success;
           this.SnackBarError(jey.message);
           if (jey.success){
             this.router.navigate(['citas']);
           }
       });
     } 

     SnackBarError(message: string) {
      this._snackBar.open(message, "Aceptar", {
        duration: 5000,
      });
    }

  onNoClick(): void {
  
  }
}