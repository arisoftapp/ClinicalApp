import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Ruta } from '../RutasModel';
import localeMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router : Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    registerLocaleData(localeMX);
  }

  ngOnInit() {
  }

}
