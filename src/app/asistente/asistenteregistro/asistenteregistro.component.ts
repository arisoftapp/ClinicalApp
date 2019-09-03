import { Component, OnInit } from '@angular/core';
import {Asistente} from '../../models/AsistenteModel'
import { Validators, FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/login/login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenteService } from 'src/app/services/asistente.service';
import { MatSnackBar } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MedicoService } from 'src/app/services/medico.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';




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
  myControl = new FormControl();
  public funcion : string = "";
  matcher = new MyErrorStateMatcher();
  est_respaldo: any;
  mun_respaldo: any;
  id : any;
  filteredOptions: Observable<any[]>;
  medicos: any[];
  asistente: Asistente
  asistentes: Asistente[] =[]
  detalles: boolean;
  success: any;
  unico: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  asignar: any[] = [];

 

  constructor(private actiavatedRouter: ActivatedRoute, private router : Router,
     private asis_serv: AsistenteService,  private _snackBar: MatSnackBar, private medic_service: MedicoService) 
  { 

  }

  onSubmit(){
    console.log("exito");
    
  }

  ngOnInit() {
    this.medicos = [];
    this.getMedicos();
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterMedico(value))
    );
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

  private _filterMedico(value: string): any[] {
    let filterValue = value;
    if (value == ""){
      console.log("esta vacio");
      this.getMedicos();
    }else{ 
      filterValue = filterValue.toLowerCase();
      return  this.medicos.filter(option => option.completo.toLowerCase().includes(filterValue) );}   
  }

  prueba(medico: any){  
      this.unico = medico.nombre
      this.asignar.push({medico: medico.nombre,
      id_medic: medico.id_medico});
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

//add medico
    if ((value || '').trim()) {
      this.asignar.push({name: value.trim()});
    }

  //reset input
    if (input) {
      input.value = '';
    }
  }

  remove(medico: any): void {
    const index = this.asignar.indexOf(medico);

    if (index >= 0) {
      this.asignar.splice(index, 1);
    }
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
        for(let data of this.medicos){
          data.completo = data.nombre +" " + data.ap_paterno;
          }
      }
    error => {
      console.log(<any>error);
    }
    }); 
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
    this.asistente.asignar = this.asignar
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
