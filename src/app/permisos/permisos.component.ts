import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MedicoService } from '../services/medico.service';
import { Medico } from '../models/MedicoModel';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {Permisos} from '../models/permisos'
  import { from } from 'rxjs';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})

export class PermisosComponent implements OnInit {
  success: any;
  medicos : Medico [];
  respaldo : Medico [];
  medico : Medico;
  data: any = [ {identifier: 'Edgar', name: 'Hydrogen',consul: 'Sin Asignar', phone: 6681241183, email: 'edgarembao@hotmail.com'},] ;
  ocultar : boolean = true;
  _snackBar: any;
  displayedColumns  = ['identifier', 'name', 'options'];
  dataSource = new MatTableDataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator
  addDialog: any;

  constructor(private medic_service: MedicoService, private router : Router, public PermisosDialog: MatDialog) {
   
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
        for(let i in this.medicos){
          this.medicos[i].tipo_usuario = 1;
        }
        
        this.dataSource = new MatTableDataSource(this.medicos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.medicos)
      }
      error => {
      console.log(<any>error);
    }
    });
  }
  SnackBarError(message: any) {
    throw new Error("Method not implemented.");
  }
 


  openDetalles(user: any){

    const dialogRef = this.PermisosDialog.open(PermisosDetalle, {
      data:{user}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMedicos()
    });
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

  constructor( public permisosDialog: MatDialogRef<PermisosDetalle>,private _snackBar: MatSnackBar,private medic_service: MedicoService, private router : Router,
    @Inject (MAT_DIALOG_DATA) public data: any) {
      this.permisos = new Permisos;
    }

    ngOnInit() {
      this.data = this.data.user
      this.arrayPermisos = this.data.permisos.split(",");
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

      this.data.permisos = cadena;
      this.data.username = this.username;
      this.data.password = this.password;
      console.log(this.data);
      this.putMedico();
    }

   
    putMedico(){
       this.medic_service.putMedico(this.data).subscribe(
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

  
