import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, DoCheck} from '@angular/core';
import { Ruta } from './models/RutasModel';
import localeMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from './models/UserModel';
import { UserService } from './services/user.service';
import {AuthService} from './services/auth.service'
import { isObject } from '@syncfusion/ej2-base';
import { MedicoService } from './services/medico.service';
import { MatSnackBar } from '@angular/material';
import { Medico } from './models/MedicoModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ClinicalApp';
  public token;
  public into;
  public user : Usuario;
  public empresa : string;
  public usuario : string;
  mobileQuery: MediaQueryList;
  existoken: boolean;
  permisos: any;
  
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  Rutas : Ruta [] = [
    new Ruta("inicio", "Inicio", "dashboard", true, true),
    new Ruta("citas", "Citas", "alarm", true, true),
    new Ruta("calendario", "Calendario", "calendar_today", true, true),
    new Ruta("pacientes", "Pacientes", "people", true, true),
    new Ruta("medicos", "Médicos", "", false, true),
    new Ruta("consultorios", "Consultorios", "", false, true),
    new Ruta("especialidades", "Especialidades", "local_hospital", true, true),
    new Ruta("chat", "Chat", "forum", true, true)
  ]

  
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private medic_service : MedicoService,  private _snackBar: MatSnackBar,
    private router : Router, private service : UserService ) {
    
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    registerLocaleData(localeMX);
    this.token =JSON.parse(localStorage.getItem("tok"));
    this.permisos =JSON.parse(localStorage.getItem("permisos"));
    this.setPermisos()
  }
 
  setPermisos(){
    
    let Ruts: Ruta [] = [];
    let permiso: any [];
    
    Ruts = this.Rutas;

    permiso = this.permisos.split(",");
    
    this.Rutas = [];
    for(let i in permiso){
      console.log(permiso[i])
      if(permiso[i] == 1){
          this.Rutas.push(Ruts[i])
       }
    }
    console.log(this.Rutas);

  }
  ngOnInit() {
    
    this.into = this.service.getLogin();
    if (!this.into){
      this.router.navigate(['/login']);
    }
    this.user = this.service.getIdentity();
  }
  
  ngDoCheck(){
    this.into = this.service.getLogin();
  }

  getStatus(){
    this.user.Status = 'Disponible'
    switch (this.user.Status) {
      case 'Disponible':
        return '#1DE9B6';
      case 'No disponible':
        return '#E91E63';
      case 'Ocupado':
        return '#FF9800';
    }
  }

  public logout(){
    localStorage.clear();
    this.into = null;
    this.token = null;
    this.router.navigate(['/login']);
  }
  
}
