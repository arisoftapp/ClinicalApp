import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MedicoService } from '../services/medico.service';
import { Medico } from '../models/MedicoModel';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {Permisos} from '../models/permisos'
  import { from } from 'rxjs';
import { AsistenteService } from '../services/asistente.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})

export class PermisosComponent implements OnInit {
  dialogRef;
  success: any;
  medicos : Medico [];
  asistentes :any [];
  respaldo : Medico [];
  medico : Medico;
  data: any = [ {identifier: 'Edgar', name: 'Hydrogen',consul: 'Sin Asignar', phone: 6681241183, email: 'edgarembao@hotmail.com'},] ;
  ocultar : boolean = true;
  _snackBar: any;
  displayedColumns  = ['identifier', 'name', 'options'];
  dataSource = new MatTableDataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource2 = new MatTableDataSource;
  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild(MatPaginator) paginator2: MatPaginator
  addDialog: any;

  constructor(private medic_service: MedicoService,private asis_serv : AsistenteService, private router : Router, public PermisosDialog: MatDialog) {
   
   }

  ngOnInit() { 
    this.getMedicos();
    this.getAsistentes();
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
          this.asistentes = jey.data
          for(let i in this.asistentes){
            this.asistentes[i].tipo_usuario = 2;
          }
          this.dataSource2 = new MatTableDataSource(this.asistentes);
          this.dataSource2.paginator = this.paginator2;
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
        this.medicos = jey.data;
        for(let i in this.medicos){
          this.medicos[i].tipo_usuario = 1;
        }    
        this.dataSource = new MatTableDataSource(this.medicos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      error => {
      console.log(<any>error);
    }
    });
  }

  SnackBarError(message: any) {
    throw new Error("Method not implemented.");
  }
 


  openDetalles(user: any, tipo: any){
    let medic: any = this.medicos;
    let asistent: any = this.asistentes;
    const dialogRef = this.PermisosDialog.open(PermisosDetalle, {
      data:{user, medic, asistent}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMedicos()
    });
  }

  prueba(tipo: any){
    if( tipo == 'maestro'){
      this.getMedicos()
    }else{
      this.getAsistentes()
    }
  }
  
}




//COMPONENTE DETALLLES

@Component({
  selector: 'dialog-detalle-permisos',
  templateUrl: './dialog/detalle_permisos.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosDetalle implements OnInit{

  permisos : Permisos;
  arrayPermisos: any = [];
  username: any;
  password: any;
  success: any;
  user: any;
  asistents: any;
  medics: any;
  user_extist: boolean = false;
  constructor( public asis_serv: AsistenteService, public permisosDialog: MatDialogRef<PermisosDetalle>,
    private _snackBar: MatSnackBar,private medic_service: MedicoService, private router : Router,
    @Inject (MAT_DIALOG_DATA) public data: any) {
      this.permisos = new Permisos;
    }

    ngOnInit() {
      this.user = this.data.user;
      this.medics = this.data.medic;
      this.asistents = this.data.asistent;
      this.username = (this.user.username == "" || this.user.username == "null") ?  "": this.user.username;
      this.password = (this.user.username == "" || this.user.username == "null") ?  "": this.user.password;
      this.arrayPermisos = this.user.permisos.split(",");
      this.permisos.inicio = this.arrayPermisos[0]>0?  true: false;
      this.permisos.citas = this.arrayPermisos[1]>0?  true: false;
      this.permisos.calendario = this.arrayPermisos[2]>0?  true: false;
      this.permisos.pacientes = this.arrayPermisos[3]>0?  true: false;
      this.permisos.medico = this.arrayPermisos[4]>0?  true: false;
      this.permisos.consultorio = this.arrayPermisos[5]>0?  true: false;
      this.permisos.especialidades= this.arrayPermisos[6]>0?  true: false;
      this.permisos.chat = this.arrayPermisos[7]>0?  true: false;
      this.permisos.permisos = this.arrayPermisos[8]>0?  true: false;
    }

    asignarPermisos(){
      let cadena = null
      for(let i in this.permisos){
        console.log(this.permisos[i])
        if(cadena == null && this.permisos[i] == true){
           cadena = "1"
        }else if(cadena == null && this.permisos[i] == false){
          cadena = "0"
        }else if(cadena != null && this.permisos[i] == true){
          cadena += ",1"
        }else{
          cadena += ",0"
        }
      }
      if (this.username=="" || this.username == undefined){
        if(this.user.tipo_usuario == 1){
          this.putMedico();
          this.permisosDialog.close();
        }else{
          this.putAsistentes();
          this.permisosDialog.close();
        }

      }else{   
        this.user.permisos = cadena;
        this.user.username = this.username;
        this.user.password = this.password;
        let user_name = this.username
        
        if(this.user.tipo_usuario == 1){
          let id_user = this.user.id_medico
          let exist = this.medics.find(function(element){ 
            if(element.username == user_name && element.id_medico != id_user){
              return true;
            }else{
              return false;
            }
          });

          if (exist == undefined || exist == null){
            this.putMedico();
            this.permisosDialog.close();
          }else{
            this.user_extist= true;
          }
        }else{
          let id_user = this.user.id_asistente
          let exist = this.asistents.find(function(element){ 
            if(element.username == user_name && element.id_asistente != id_user){
              return true;
            }else{
              return false;
            }
          });
          
          if (exist == undefined || exist == null){
            this.putAsistentes();
            this.permisosDialog.close();
          }else{
            this.user_extist= true;
          }
        }
      }
     
      
    }

    putAsistentes(){
      this.asis_serv.putAsistente(this.user).subscribe(
        (response : any)  => {
          var Resp = response;
          var texto = Resp._body;
          var jey = JSON.parse(texto);
          this.success = jey.success;
          this.SnackBarError(jey.message);
          if (jey.success){
             this.router.navigate(['permisos']);
          }
      });
    } 

    putMedico(){
       this.medic_service.putMedico(this.user).subscribe(
         (response : any)  => {
           var Resp = response;
           var texto = Resp._body;
           var jey = JSON.parse(texto);
           this.success = jey.success;
           this.SnackBarError(jey.message);
           if (jey.success){
              this.router.navigate(['permisos']);
           }
       });
     } 
  
     SnackBarError(message: string) {
      this._snackBar.open(message, "Aceptar", {
        duration: 5000,
      });
    }
}

  
