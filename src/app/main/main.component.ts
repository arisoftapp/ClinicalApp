import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, DoCheck} from '@angular/core';
import { Ruta } from '../models/RutasModel';
import localeMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/UserModel';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, DoCheck {
  public token;
  public into;
  public user : Usuario;
  public empresa : string;
  public usuario : string;
  mobileQuery: MediaQueryList;
  
  

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  Rutas : Ruta [] = [
    new Ruta("inicio", "Inicio", "dashboard", true),
    new Ruta("citas", "Citas", "alarm", true),
    new Ruta("calendario", "Calendario", "calendar_today", true),
    new Ruta("pacientes", "Pacientes", "people", true),
    new Ruta("medicos", "Médicos", "", false),
    new Ruta("consultorios", "Consultorios", "", false),
    new Ruta("especialidades", "Especialidades", "local_hospital", true)
  ]

  
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router : Router, private service : UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    registerLocaleData(localeMX);
  }

  ngOnInit() {
    this.into = this.service.getLogin();
    if (!this.into){
      this.router.navigate(['login']);
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
    this.router.navigate(['login']);
  }

}
