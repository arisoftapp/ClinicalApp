import { Injectable, OnInit } from '@angular/core';
import { Medico } from '../models/MedicoModel';
import { AsistenteService } from './asistente.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class MedicosXasistenteService implements OnInit {
  success: any;
  medicos : Medico [];
  respaldo : Medico [];
  medico : Medico;
  _snackBar: any;
  constructor(private asis_serv: AsistenteService,  private router : Router, public PermisosDialog: MatDialog) {
   
  }

 ngOnInit() { 

 }

 ejecutarServicio(){
  this.getAsistentes();
  this.getAsisMedic();
 }
 getAsisMedic(){
   this.asis_serv.getAsistenteMedico(1).subscribe(
     (response : any)  => {
       var Resp = response;
       var texto = Resp._body;
       var jey = JSON.parse(texto); 
       if (!jey.success){
         this.success = jey.success; 
         this.SnackBarError(jey.message);
       }else {
         let data: any = jey.data;
         this.medicos = data;
         console.log(data)
       }
       error => {
       console.log(<any>error);
     }
     });
 }
 
 getAsistentes(){
   this.asis_serv.getAsistentes().subscribe(
     (response : any)  => {
       var Resp = response;
       var texto = Resp._body;
       var jey = JSON.parse(texto); 
       if (!jey.success){
         this.success = jey.success; 
         this.SnackBarError(jey.message);
       }else {
         let data: any = jey.data;
         for(let i in data){
           data[i].tipo_usuario = 2;
         }
         console.log(data)
       }
       error => {
       console.log(<any>error);
     }
     });
 }
 
 SnackBarError(message: any) {
  throw new Error("Method not implemented.");
}
}
