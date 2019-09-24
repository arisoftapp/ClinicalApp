import { Component, OnInit, Inject } from '@angular/core';
import { Tratamiento } from 'src/app/models/TratamientoModel';
import { MatTableDataSource, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Consulta } from 'src/app/models/ConsultaModel';
import { ConsultaService } from 'src/app/services/consulta.service';
import { Router } from '@angular/router';
import { CitasService } from 'src/app/services/citas.service';
import { Paciente } from 'src/app/models/PacienteModel';
import { PacienteService } from 'src/app/services/paciente.service';
import { HistorialService } from 'src/app/services/historial.service';
import { Historial } from 'src/app/models/HistorialModel';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  consulta: Consulta
  tratamiento: Tratamiento
  examen: any;
  data_paciente: any;
  arrayTratamiento: Tratamiento[] = [];
  displayedColumns: string[] = ['medicamento', 'docis', 'via', 'frecuencia', 'duracion', 'opcion'];
  dataSource = new MatTableDataSource;
  success: any;
  constructor(private consul_serv: ConsultaService, private cita_serv: CitasService,
    private router : Router, private _snackBar: MatSnackBar,
    private paciente_serv: PacienteService,public addDialog: MatDialog) {
    
   }

  ngOnInit() {
    this.data_paciente = new Paciente;
    this.tratamiento =  new Tratamiento();
    this.consulta =  new Consulta();
    this.consulta.id_medico = JSON.parse(localStorage.getItem("id")); 
    this.consulta.id_cita = JSON.parse(localStorage.getItem("cita"));
   
    this.consulta.id_paciente = JSON.parse(localStorage.getItem("paciente"))
    this.getPacientes();
  }

  addExamen(){
    this.consulta.examenes.push(this.examen)
    console.log(this.consulta.examenes)
  }

  addTratamiento(){
    this.arrayTratamiento.push(this.tratamiento)
    console.log(this.arrayTratamiento);
    this.dataSource = new MatTableDataSource(this.arrayTratamiento);
    this.tratamiento =  new Tratamiento();
  }

  calcularIMC(){
    let peso = Number(this.consulta.peso)
    let altura = Number(this.consulta.altura)
    
    if(this.consulta.peso != undefined && this.consulta.altura != undefined){
    if(Number.isNaN(peso) || Number.isNaN(altura)){
      console.log("algo esta mal");
    }else{
      this.consulta.imc = (peso/Math.pow(altura/100, 2)).toFixed(1)
      console.log(this.consulta.imc);
    }
  }
      
  }

  registrar(){
    this.consulta.tratamiento = this.arrayTratamiento;
    console.log(this.consulta); 
    this.postConsulta();
  }

  getPacientes(){
    console.log(this.consulta.id_paciente);
    
    this.paciente_serv.getPaciente(this.consulta.id_paciente).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (jey.success){
        
          this.data_paciente = jey.data[0];
          for(let data of this.data_paciente){
            data.completo = data.nombre +" " + data.ap_paterno;
            }
          console.log(this.data_paciente.historial);
          if(this.data_paciente.historial==1){
            console.log("es primeriso");
            this.openDialog(this.data_paciente)
          }
         
        }
      error => {
        console.log(<any>error);
      }
      });
  }


  openHistorial() {
    this.router.navigate(['pacientes/historialMed/' + this.consulta.id_paciente]);
  }

  postConsulta(){ 
    this.consul_serv.postConsulta(this.consulta).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.putStatus();
        }
    });
  }

  putStatus(){
    let data = { 
      id_cita: this.consulta.id_cita,
      status: 2
    }
     this.cita_serv.putStatus(data).subscribe(
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

  openDialog(paciente: any) {
    const dialogRef = this.addDialog.open(HistorialDialog, {
      data:{paciente}
    });
  }
  
}
//Dialog para Agregar Historial Por Primera Vez
@Component({
  selector: 'dialog-detalle-cita',
  templateUrl: '../dialogs/historial_paciente.html',
  styleUrls: ['./consulta.component.css']
})
export class HistorialDialog implements OnInit{
  
  historial: Historial
  enfermedad: any;
  parentesco: any;
  success: any;
  tipo: boolean;
  constructor( public hist_serv : HistorialService, private _snackBar: MatSnackBar, private router : Router,
    public HistoryDialog: MatDialogRef<HistorialDialog>,
    @Inject (MAT_DIALOG_DATA) public data: any) {
      console.log(this.data.paciente);
      
      
    }

    ngOnInit(): void { 
      this.historial = new Historial()
      this.historial.id_paciente = this.data.paciente.id_paciente;
    }

    addAntecedente(){

      this.historial.af.push(
      {
        id_paciente: this.data.paciente.id_paciente,
        parentesco: this.parentesco,
        enfermendad: this.enfermedad});
        console.log(this.historial.af);
        
        this.parentesco = "";
    }

     SnackBarError(message: string) {
      this._snackBar.open(message, "Aceptar", {
        duration: 5000,
      });
    }

    onNoClick(): void {
      this.hist_serv.postHistorial(this.historial);
      this.hist_serv.putHistorial(this.historial);
    }
}

