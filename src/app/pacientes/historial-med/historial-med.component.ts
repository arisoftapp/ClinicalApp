import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/PacienteModel';
import { CitasService } from 'src/app/services/citas.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { HistorialService } from 'src/app/services/historial.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-historial-med',
  templateUrl: './historial-med.component.html',
  styleUrls: ['./historial-med.component.css']
})
export class HistorialMedComponent implements OnInit {
  paciente: any;
  paciente_historia: any;
  success: any;
  displayedColumns: string[] = ['fecha', 'doctor', 'status', 'consulta'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  paciente_data: any;
  modificar: boolean = true;
  historial: any= {};
  af: any= [];


  constructor(private activatedRouter: ActivatedRoute, private citas_serv: CitasService,
  private _snackBar: MatSnackBar, private pac_service : PacienteService,
   private conslt_srv: ConsultaService,  public addDialog: MatDialog,private hist_serv: HistorialService,
   private router : Router) { }


  ngOnInit() {
   
    this.paciente = this.activatedRouter.snapshot.paramMap.get('clavePaciente');
    console.log(this.paciente);
    this.getCnsultas();
    this.getHistorial();
  }
  onChange(){
    if(this.modificar){
      this.modificar = false;
    }else{
      this.modificar = true;
    }
   
  }

  getHistorial(){
    this.hist_serv.getHistorialPaciente(this.paciente).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          this.SnackBarError(jey.message);
          this.historial = {};
        }else {
          this.historial = jey.data[0];
          this.af = jey.data;
          if(this.historial == undefined){
            this.historial = {};
            this.af = [];
          }
        
          
          
        }
      error => {
        console.log(<any>error);
      }
    });
  }

  openConsulta(){
    localStorage.setItem('paciente', this.paciente);
    this.router.navigate(['/citas/consultaMedica']); 
  }

  getCitas(){
    this.citas_serv.getCitasPaciente(this.paciente).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          this.SnackBarError(jey.message);
          this.paciente_data = new Paciente();
        }else {
          this.paciente_data = jey.data;
          this.paciente_historia = this.paciente_data[0].paciente+" "+this.paciente_data[0].ap_paciente
          for(let item  of this.paciente_data){
            if(item.status == 1){
              item.estado = "Pendiente"
            } else if (item.status == 2){
              item.estado = "Cancelada"
            } else{
              item.estado = "Concluida"
            }
            
          }

          this.dataSource = new MatTableDataSource<any>(this.paciente_data);
          this.dataSource.paginator = this.paginator;
        }
      error => {
        console.log(<any>error);
      }
    });
  }
  
  getCnsultas(){
    this.conslt_srv.getConsultaPaciente(this.paciente).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          this.SnackBarError(jey.message);
          this.paciente_data = new Paciente();
        }else {
          this.paciente_data = jey.data;
          this.paciente_historia = this.paciente_data[0].paciente+" "+this.paciente_data[0].ap_paciente
         
          for(let item  of this.paciente_data){
            if(item.status == 1){
              item.estado = "Pendiente"
            } else if (item.status == 2){
              item.estado = "Cancelada"
            } else{
              item.estado = "Concluida"
            }
            
          }
          this.dataSource = new MatTableDataSource<any>(this.paciente_data);
          this.dataSource.paginator = this.paginator;
        }
      error => {
        console.log(<any>error);
      }
    });
  }

  OpenDetalles(id: any){
    console.log(id);
    
  }

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }

  OpenDialog(consulta: any) {
    const dialogRef = this.addDialog.open(ConsultaDetalle, {
      width: '1000px',
      data:{consulta}
    });
    
  }
  
  
}

@Component({
  selector: 'dialog-detalle-consulta',
  templateUrl: '../dialogs/detalleConsulta.html',
  styleUrls: ['./historial-med.component.css']
})
export class ConsultaDetalle implements OnInit{
  displayedColumns: string[] = ['medicamento', 'docis', 'via', 'frecuencia', 'duracion'];
  dataSource = new MatTableDataSource;
  dtl_consulta: any;
  dtl_status: boolean;
  success: any;
  tipo: boolean;
  examenes: any[] = [];
  tratamiento: any = [];
  constructor(private _snackBar: MatSnackBar, private router : Router,
    private conslt_srv: ConsultaService, public ConsultaDialog: MatDialogRef<ConsultaDetalle>,
    @Inject (MAT_DIALOG_DATA) public data: any) {
      this.dtl_consulta= this.data.consulta
      console.log(this.dtl_consulta)
     
    }
  //consulta de los examenes solicitados en la consulta y su tratamiento
  getExtra(){

  }

  ngOnInit(): void { 
    this.getExamenes();
    this.getTratamiento();
  }

  getTratamiento(){
    this.conslt_srv.getDetallesConsulta(this.dtl_consulta.id_consulta,1).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          this.SnackBarError(jey.message);
        }else {
          this.tratamiento= jey.data;
          console.log(jey.data);  
          this.dataSource = new MatTableDataSource(this.tratamiento);
        }
      error => {
        console.log(<any>error);
      }
    });
  }

  getExamenes(){
    this.conslt_srv.getDetallesConsulta(this.dtl_consulta.id_consulta,2).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          this.SnackBarError(jey.message);
        }else {
          this.examenes= jey.data;
          console.log(jey.data);  
        }
      error => {
        console.log(<any>error);
      }
    });
  }

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }
}