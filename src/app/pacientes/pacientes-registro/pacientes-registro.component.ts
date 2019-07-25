import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Paciente } from '../../models/PacienteModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PacienteService } from '../../services/paciente.service';
import { EntidadService } from '../../services/entidad.service';
import localeMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { Entidad } from '../../models/EntidadModel';
import { Municipio } from '../../models/MunicipioModel';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    //const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && control.touched);
  }
}

export class TelErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    //const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && control.touched && (control.value.length < 7) );
  }
}

@Component({
  selector: 'app-pacientes-registro',
  templateUrl: './pacientes-registro.component.html',
  styleUrls: ['./pacientes-registro.component.css']
})
export class PacientesRegistroComponent implements OnInit {
  paciente : Paciente;
  public message : string;
  Estados : Entidad [];
  Municipios : Municipio [];
  Fact_municipios : Municipio [];
  funcion : string;
  success;
  detalles: boolean;
  nombre_fc = new FormControl('', [
    Validators.required,
  ]);
  apaterno_fc = new FormControl('', [
    Validators.required
  ]);
  amaterno_fc = new FormControl('', [
    Validators.required
  ]);
  
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  fact_email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  
  telefono_fc = new FormControl('', [
    Validators.required,
    Validators.minLength(7),
    Validators.maxLength(10),
    Validators.pattern("^[0-9]*$")
  ]);
  celular_fc = new FormControl('', [
    Validators.required,
    Validators.minLength(7),
    Validators.maxLength(10),
    Validators.pattern("^[0-9]*$")
  ]);
  adicional_fc = new FormControl('', [
    Validators.pattern("^[0-9]*$")
  ]);

  matcher = new MyErrorStateMatcher();
  tel_matcher = new TelErrorStateMatcher();

  constructor(public entidad_serv : EntidadService, private activatedRouter: ActivatedRoute, private pac_service : PacienteService, 
    private _snackBar: MatSnackBar, private router : Router ) { 
    registerLocaleData(localeMX); 
  }

  ngOnInit() {
    this.paciente = new Paciente;
    this.paciente.id_paciente = this.activatedRouter.snapshot.paramMap.get('clavePaciente');
    console.log("Medico: " + this.paciente.id_paciente);
    if (this.paciente.id_paciente === "0"){
      this.detalles = false;
      this.funcion = "Registar paciente"
    } else {
      this.detalles = true;
      this.funcion = "Detalles de paciente"
      this.getPaciente();
      console.log("Medico: " + this.paciente);
    }
    console.log(this.paciente);

    this.getEstados();
  } 

  getPaciente(){
    this.pac_service.getPaciente(this.paciente.id_paciente).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          this.SnackBarError(jey.message);
          this.paciente = new Paciente();
        }else {
          this.paciente = jey.data[0];
          console.log(jey.data[0]);

        }
      error => {
        console.log(<any>error);
      }
    });
  }

  onSubmit(){
    if( this.paciente.id_paciente === "0" ) {
      this.postPaciente();
    } else {
      this.putPaciente();
    }
  }

  putPaciente(){
    this.pac_service.putPaciente(this.paciente).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.router.navigate(['pacientes']);
        }
    });

  }

  postPaciente(){
    this.pac_service.postPaciente(this.paciente).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.router.navigate(['pacientes']);
        }
    });
  }

  getEstados(){
    this.entidad_serv.getEntidades().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (jey.success){
          this.Estados = jey.data;
        }
      error => {
        console.log(<any>error);
      }
      });
  }

  getMunicipios(estado){
    this.entidad_serv.getMunicipios(estado).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (jey.success){
          this.Municipios = jey.data;
        }
      error => {
        console.log(<any>error);
      }
    });
  }

  getFactMunicipios(estado){
    this.entidad_serv.getMunicipios(estado).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (jey.success){
          this.Fact_municipios = jey.data;
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
