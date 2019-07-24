import { Component, OnInit, Inject } from '@angular/core';
import { ConsultorioService } from '../../services/consultorio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Medico } from '../../models/MedicoModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicoService } from '../../services/medico.service';
import { EntidadService } from '../../services/entidad.service';
import localeMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { Entidad } from '../../models/EntidadModel';
import { Municipio } from '../../models/MunicipioModel';
import { Especialidad } from '../../models/EspecialidadModel';
import { EspecialidadService } from '../../services/especialidad.service'; 

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && control.touched);
  }
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistrarMedicoComponent implements OnInit {
  public funcion : string = "";
  public recetaPath;
  public analisisPath;
  public constanciaPath;
  public certifPath;
  public facturaPath;
  public selloPath;
  medico : Medico;
  recetaURL: any;
  analisisURL: any;
  constanciaURL: any;
  certifURL: any;
  facturaURL: any;
  selloURL: any;
  detalles: boolean;
  public message : string;
  Estados : Entidad [];
  Municipios : Municipio [];
  Especialidades : Especialidad [];
  Especialidades2 : Especialidad [];
  success;
  
  nombre_fc = new FormControl('', [
    Validators.required,
  ]);
  apaterno_fc = new FormControl('', [
    Validators.required
  ]);
  amaterno_fc = new FormControl('', [
    Validators.required
  ]);
  noext_fc = new FormControl('', [
    Validators.pattern("^[0-9]*$")
  ]);
  noint_fc = new FormControl('', [
    Validators.pattern("^[0-9]*$")
  ]);
  email = new FormControl('', [
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
  est_respaldo: any;
  mun_respaldo: any;

  constructor( public entidad_serv : EntidadService, public especialidad_serv : EspecialidadService, private router : Router,
    private actiavatedRouter: ActivatedRoute, private medic_service : MedicoService, private _snackBar: MatSnackBar ) { 
    registerLocaleData(localeMX); 
    
  }

  ngOnInit(){
    this.medico = new Medico;
    this.medico.id_medico = this.actiavatedRouter.snapshot.paramMap.get('claveMedico');
    if (this.medico.id_medico === "0"){
      this.detalles = false;
      this.funcion = "Registar médico"
    } else {
      this.detalles = true;
      this.funcion = "Detalles de médico"
      this.getMedico();

    }

    this.getEstados();
    this.getEspecialidades();
    this.getEspecialidadesDos();
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

  getMedico(){
    this.medic_service.getMedico(this.medico.id_medico).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          this.SnackBarError(jey.message);
          this.medico = new Medico();
        }else {
          this.medico = jey.data[0];
          console.log(jey.data[0]);
          this.est_respaldo = jey.data[0].id_estado;
          this.mun_respaldo = jey.data[0].id_municipio;
        }
      error => {
        console.log(<any>error);
      }
    });
  }

  putMedico(){
   if(!this.medico.estado_id){
     this.medico.estado_id = this.est_respaldo;
     this.medico.municipio_id = this.mun_respaldo;
   }
    this.medic_service.putMedico(this.medico).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.router.navigate(['medicos']);
        }
    });
  } 
   
  postMedico(){ 
    this.medic_service.postMedico(this.medico).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.router.navigate(['medicos']);
        }
    });
  }

  onSubmit(){
    this.SnackBarError("OnSubmit");
    if( this.medico.id_medico === "0" ) {
      this.postMedico();
    } else {
      this.putMedico();
    }
  }

  getEspecialidades(){
    this.especialidad_serv.getEspecialidades().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        if (jey.success){
          this.Especialidades = jey.data;
        }
      error => {
        console.log(<any>error);
      }
    });
  }

  getEspecialidadesDos(){
    this.especialidad_serv.getEspecialidades().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        if (jey.success){
          this.Especialidades2 = jey.data;
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

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }

  preview(files, doc : number) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Sólo se permiten archivos de imagen";
      return;
    }
    var reader = new FileReader();
    switch(doc) { 
      case 1: { 
        this.recetaPath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.recetaURL = reader.result; 
        }
        break; 
      } 
      case 2: { 
        this.analisisPath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.analisisURL = reader.result; 
        }
        break; 
      }
      case 3: { 
        this.constanciaPath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.constanciaURL = reader.result; 
        }
        break; 
      }
      case 4: { 
        this.certifPath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.certifURL = reader.result; 
        }
        break; 
      }
      case 5: { 
        this.facturaPath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.facturaURL = reader.result; 
        }
        break; 
      }  
      case 6: { 
        this.selloPath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.selloURL = reader.result; 
        }
        break; 
      }   
    }
  }

}

