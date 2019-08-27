import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/PacienteModel';
import { EntidadService } from 'src/app/services/entidad.service';
import { Entidad } from 'src/app/models/EntidadModel';
import { Cita } from 'src/app/models/CitaModel';
import { MedicoService } from 'src/app/services/medico.service';
import { CitasService } from 'src/app/services/citas.service';
import { MatSnackBar } from '@angular/material';
import { Medico } from 'src/app/models/MedicoModel';
import { Router, ActivatedRoute } from '@angular/router';
import { isDate } from 'util';
import { AsistenteService } from 'src/app/services/asistente.service';

@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.css']
})
export class RegistroCitaComponent implements OnInit {
  Pacientes: Paciente [];
  Tipos: any [];
  Estados : Entidad [];
  paciente : Paciente;
  cita : Cita;
  medicos: Medico[];
  success: any;
  data : boolean = false;
  data_paciente: Paciente;
  prioridades: any;
  horas: any = [];
  horas_f: any = [];
  minutos: any = [];
  min_f: any;
  min: any;
  id: any = 2;
  tipo_usuario: any;

  constructor(private citas_serv: CitasService,private _snackBar: MatSnackBar, private paciente_serv: PacienteService,
    private medic_service: MedicoService, private  entidad_serv: EntidadService,  private router : Router,
    private asis_serv: AsistenteService) {
      for(let i = 1; i<=24; i++){
        if(i<10){
          let num ="0"+ i;
          this.horas.push(num)
        }else{
          this.horas.push(i)
        }
      }
      for(let i = 0; i<60; i++){
        if(i<10){
          let num ="0"+ i;
          this.minutos.push(num)
        }else{
          this.minutos.push(i)
        }
      }
     
    
    }

  ngOnInit() {
    this.tipo_usuario =JSON.parse(localStorage.getItem("puesto"));
    this.data_paciente = new Paciente;
    this.cita = new Cita;
    this.cita.duracion = 30;
    this.getPacientes();
    this.getMedicos();
    this.getPrioriadad();
    this.getTipo();
  
    if (localStorage.getItem("reagendar") === null) { 
      console.log("no existe");
    } else{ 
      let data: any =  JSON.parse(localStorage.getItem("reagendar"));
      this.cita = data;
      this.cita.status = true;
      this.cita.duracion = 30;
      this.cita.fecha = ""
      localStorage.removeItem("reagendar")
    }

  }

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
            for(let med of this.medicos){
              if(dato.id_medico == med.id_medico){
                med_asis.push(med)
              }
            }
          }
          this.medicos = med_asis
          //cargar las citas del asistente
         
        }
        error => {
        console.log(<any>error);
      }
      });
  }
  reagendar(){
   
  }
  setHora(inicio: number){
    this.cita.hora_f = null;
    inicio = +inicio;
    this.horas_f = []
    for(let i = inicio; i<=24; i++){
      if(i<10){
        let num ="0"+ i;
        this.horas_f.push(num)
      }else{
        this.horas_f.push(i)
      }
    }
    this.actualizarHora();
    this.actualizarDuracion();
  }

  onSubmit(){
  }

  loadPaciente(paciente: any){
    let pas = paciente;
    let data_pac = this.Pacientes.filter(paciente => paciente.id_paciente == pas);
    this.data_paciente = data_pac[0];
    this.data = true  
  }
  getPacientes(){
    this.paciente_serv.getPacientes().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (jey.success){
          this.Pacientes = jey.data;
        }
      error => {
        console.log(<any>error);
      }
      });
  }
  
  getPrioriadad(){
    this.cita.status = 1;
    this.citas_serv.getPrioridad().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (jey.success){
          this.prioridades = jey.data;
          this.prioridades.sort(function (a, b) {
            if (a.prioridad > b.prioridad) {
              return 1;
            }
            if (a.prioridad < b.prioridadd) {
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

  getTipo(){
    this.citas_serv.getTipo().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (jey.success){
          this.Tipos = jey.data;
          this.Tipos.sort(function (a, b) {
            if (a.id_tipo > b.id_tipo) {
              return 1;
            }
            if (a.id_tipo < b.id_tipo) {
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

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
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
        if( this.tipo_usuario != "Médico"){
          this.getAsisMedic();
        }
      }
    error => {
      console.log(<any>error);
    }
    }); 
  }

  postCita(){ 
    if(isDate(this.cita.fecha)){
    this.citas_serv.postCita(this.cita).subscribe(
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
  }else{
    console.log("no es una fecha aceptable");
  }
  }

  registrar(){
    if (this.min_f < this.min && this.cita.hora == this.cita.hora_f || this.cita.hora_f == 0){
      alert("la ducración de la cita es erronea");
    }else{
      this.cita.hora = this.cita.hora +":"+this.min;
      this.cita.hora_f = this.cita.hora_f +":"+this.min_f;
      this.postCita();
    }

  }

  actualizarDuracion(){

    if(this.cita.hora > "0" && this.cita.hora_f > "0" && this.min > "0" && this.min_f > "0"){
      let minutos_in = +this.cita.hora*60 + +this.min;
      let minutos_fin = +this.cita.hora_f*60 + +this.min_f;
 
      this.cita.duracion = minutos_fin - minutos_in;   
    }else{
      this.actualizarHora();
    }

  }

  actualizarHora(){ 

    if(this.cita.hora > "0" && this.min > "0"){
      let minutos_in = +this.cita.hora*60 + +this.min + +this.cita.duracion;
      let hr = Math.trunc(minutos_in/60);
      let minf = +minutos_in - +(hr*60);
      if(hr < 10){
        this.cita.hora_f = "0" + hr
      }else{
        this.cita.hora_f = hr
      }

      if(minf < 10){
        
        this.min_f = "0" + +minf
      }else{
        this.min_f = minf
      }
    
    }


  }

  cancelar(){
    this.router.navigate(['/citas']); 
  }
  prueba(){
    console.log(this.cita.fecha);
  }
}
