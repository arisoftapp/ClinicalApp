import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
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
import { AsistenteService } from '../services/asistente.service';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})


export class CitasComponent implements OnInit {
  Medicos : Medico [];
  selec : boolean = false;
  id : any;
  id_medic : any= '0';
  medico : Medico;
  mas_citas: Date;
  private success : boolean;
  dia = '1';
  displayedColumns = ['time', 'pacient', 'consul', 'status', 'options'];
  citas : Cita [] = [];
  citas_hoy: any [] = [];
  respaldo_citas: any [] =[];
  cita: Cita;
  tipo_usuario: any;

  constructor(private asis_serv: AsistenteService, private medic_service : MedicoService, public citas_serv : CitasService, private _snackBar: MatSnackBar,
    private router : Router, public addDialog: MatDialog) {       
    }

  ngOnInit() {
    this.tipo_usuario =JSON.parse(localStorage.getItem("puesto"));
    this.id=JSON.parse(localStorage.getItem('id'))
    if( this.tipo_usuario == "Médico"){
      this.id_medic = this.id
      this.getMedicos();
      this.getCitas();
      this.selec = false;
    }else{
      this.getCitas();
      this.getMedicos();
      this.selec = true;
    }
  }
//Asignar los medicos que le corresponden al asistente
  getAsisMedic(){
    let med_asis: any[] = [];
    this.asis_serv.getAsistenteMedico(this.id).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          this.SnackBarError(jey.message);

        }else {
          let data: any = jey.data;
          
          for(let dato of data){
            for(let med of this.Medicos){
              if(dato.id_medico == med.id_medico){
                med_asis.push(med)
              }
            }
          }
          this.Medicos = med_asis
          //cargar las citas del asistente
          this.getCitasAsistente(data);
        }
        error => {
        console.log(<any>error);
      }
      });
  }


//cargar las citas que solo le corresponden a los medicos del asistnte
  getCitasAsistente(data: any[]){
    let new_cita: any[]= [];
    let result: any = [];
    
    for(let dato of data){
      for(let cita of this.respaldo_citas){
        if(dato.id_medico == cita.id_medico){
          new_cita.push(cita)

        }
      }
    }
    this.citas = new_cita;
    this.respaldo_citas = this.citas
    var hoy = new Date();
    this.CitasDia(hoy, 0)
    
  }
//obtener las citas de la base de datos
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
            return 0;
          }); 
            this.respaldo_citas = this.citas;
            //cargar las citas del dia de hoy
            this.getCitasDia(this.dia);
          if( this.tipo_usuario == "Médico"){
            //filtrar solo las cintas del medico logueado **en caso de ser medico**
            this.getCitasMedico(this.id);
          }
        }
      error => {
        console.log(<any>error);
      }
      });
  }
//obtener los medicos de la base de datos
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
          return 0;
        });
        //asignar los medicos correspondientes al asistente
        if( this.tipo_usuario != "Médico"){
          this.getAsisMedic();
        }
      }
      
    error => {
      console.log(<any>error);
    }
    });
  }

  //filtrado de citas por medico
  getCitasMedico(id_medico: any){
    this.respaldo_citas = this.respaldo_citas.filter(cita => cita.id_medico == id_medico);
  }

  //citas de una fecha distinta
  getMedicoCitas(id_medico: any){
    if(this.dia < '3'){
      //citas por hoy y por mañana
      this.getCitasDia(this.dia)
    }else{
      //cita de una fecha seleccionada
      this.CitasDia(this.mas_citas, this.id_medic)
    }
    
  }

  getCitasDia(dia){
    if(this.dia == '1'){
      var hoy = new Date();
      this.CitasDia(hoy, this.id)
    }else if(this.dia == '2'){
      var hoy = new Date();
      hoy.setDate(hoy.getDate() + 1);
      this.CitasDia(hoy, this.id);
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
      if(this.id_medic == cita.id_medico){
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
    this.CitasDia(this.mas_citas, this.id_medic)
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

    putStatus(id: number){
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
             if(id != 2){
              this.router.navigate(['citas']);
             }
           }
       });
     } 

     reagendar(){
      if(this.dtl_status == true){
        this.putStatus(2);
      }
        localStorage.setItem("reagendar",  JSON.stringify(this.dtl_cita))
        this.router.navigate(['/citas/registrarCita']); 
     }

     SnackBarError(message: string) {
      this._snackBar.open(message, "Aceptar", {
        duration: 5000,
      });
    }

  onNoClick(): void {
  
  }
}