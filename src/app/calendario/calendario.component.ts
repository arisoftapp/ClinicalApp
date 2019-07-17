import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeMX from '@angular/common/locales/es-MX';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  

  constructor() {  
    registerLocaleData(localeMX); 
  }

  ngOnInit() {
  }

}
