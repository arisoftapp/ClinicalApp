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
  prioridades: any;
  horas: any = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30']

  constructor(private citas_serv: CitasService,private _snackBar: MatSnackBar, private paciente_serv: PacienteService,
    private medic_service: MedicoService, private  entidad_serv: EntidadService,  private router : Router) { }

  ngOnInit() {
    this.cita = new Cita;
    this.getPacientes();
    this.getMedicos();
    this.getPrioriadad();
    this.getTipo();
  }


  onSubmit(){
  }

  getPacientes(){
    this.paciente_serv.getPacientes().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (jey.success){
          this.Pacientes = jey.data;
          console.log(this.Pacientes);
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
          console.log(this.prioridades)
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
          console.log(this.Tipos)
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
      console.log(response)
      var Resp = response;
      var texto = Resp._body;
      var jey = JSON.parse(texto); 
      if (!jey.success){
        this.success = jey.success; 
        this.SnackBarError(jey.message);
      }else {
        this.medicos = jey.data;
        console.log(this.medicos)
      }
    error => {
      console.log(<any>error);
    }
    }); 
  }

  postCita(){ 
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
  }

  registrar(){
    console.log(this.cita)
  }

  prueba(){
    console.log(this.cita.fecha);
    
  }
}
