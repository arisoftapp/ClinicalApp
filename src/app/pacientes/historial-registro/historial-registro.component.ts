import { Component, OnInit } from '@angular/core';
import { Historial } from 'src/app/models/HistorialModel';

@Component({
  selector: 'app-historial-registro',
  templateUrl: './historial-registro.component.html',
  styleUrls: ['./historial-registro.component.css']
})
export class HistorialRegistroComponent implements OnInit {
  historial: Historial
  enfermedad: any;
  parentesco: any;

  constructor() { }

  ngOnInit() {
    this.historial = new Historial();
  }

  addAntecedente(){
    this.historial.af.push(
    { parentesco: this.parentesco,
      enfermendad: this.enfermedad});
      console.log(this.historial.af);
      
      this.parentesco = "";
  }

}
