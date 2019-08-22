import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/MedicoModel';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {Permisos} from '../../models/permisos'
  import { from } from 'rxjs';
import { AsistenteService } from 'src/app/services/asistente.service';

@Component({
  selector: 'app-asistentelist',
  templateUrl: './asistentelist.component.html',
  styleUrls: ['./asistentelist.component.css']
})
export class AsistentelistComponent implements OnInit {
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

  constructor(private asis_serv: AsistenteService,  private router : Router, public PermisosDialog: MatDialog) {
   
   }

  ngOnInit() { 
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
          
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(data)
        }
        error => {
        console.log(<any>error);
      }
      });
  }
  
  openAddDialog(id: any): void {
    console.log(id)
    this.router.navigate(['asistente/registrarAsistente/'+id]);
  }

  SnackBarError(message: any) {
    throw new Error("Method not implemented.");
  }
 

}
