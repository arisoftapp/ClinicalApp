import { Component, OnInit } from '@angular/core';
import {Asistente} from '../../models/AsistenteModel'
import { Validators, FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/login/login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenteService } from 'src/app/services/asistente.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-asistenteregistro',
  templateUrl: './asistenteregistro.component.html',
  styleUrls: ['./asistenteregistro.component.css']
})
export class AsistenteregistroComponent implements OnInit {
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

  public funcion : string = "";
  matcher = new MyErrorStateMatcher();
  est_respaldo: any;
  mun_respaldo: any;
  id : any;
  
  asistente: Asistente
  asistentes: Asistente[] =[]
  detalles: boolean;
  success: any;
  constructor(private actiavatedRouter: ActivatedRoute, private router : Router,
     private asis_serv: AsistenteService,  private _snackBar: MatSnackBar) 
  { 

  }

  onSubmit(){
    console.log("exito");
    
  }

  ngOnInit() {
    this.asistente = new Asistente
    this.id = this.actiavatedRouter.snapshot.paramMap.get('clave');
    if (this.id === "0"){
      this.detalles = false;
      this.funcion = "Registar Asistente"
    
    } else {
      this.detalles = true;
      this.funcion = "Detalles de Asistente"
      this.getAsistente()
    }
  }


  getAsistente(){
    this.asis_serv.getAsistente(this.id).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          this.SnackBarError(jey.message);
          this.asistente = new Asistente;
        }else {
          this.asistente = jey.data[0];
          console.log(jey.data[0]);
        }
      error => {
        console.log(<any>error);
      }
    });
  }

  registrarAsistente(){
    console.log("registro")
    if(this.id==0){
      this.postAsistente();
    }else{
      this.putAsistente();
    }
  }

  putAsistente(){
    console.log(this.asistente);
    this.asis_serv.putAsistente(this.asistente).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.router.navigate(['asistente']);
        }
    });
  }

  postAsistente(){
    this.asistente.permisos = '0,0,0,0,0,0,0,0,0,0'
    console.log(this.asistente);
    this.asis_serv.postAsistente(this.asistente).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.router.navigate(['asistente']);
        }
    });
  }

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }
}
