import { Component, OnInit } from '@angular/core';
import { Tratamiento } from 'src/app/models/TratamientoModel';
import { MatTableDataSource } from '@angular/material';
import { Consulta } from 'src/app/models/ConsultaModel';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  consulta: Consulta
  tratamiento: Tratamiento
  arrayTratamiento: Tratamiento[] = [];
  displayedColumns: string[] = ['medicamento', 'docis', 'via', 'frecuencia', 'duracion', 'opcion'];
  dataSource = new MatTableDataSource;
  id_medico: any;
  constructor() {
    
   }

  ngOnInit() {
    this.tratamiento =  new Tratamiento();
    this.consulta =  new Consulta();
    this.consulta.id_medico = JSON.parse(localStorage.getItem("id")); 
  }

  addTratamiento(){
    this.arrayTratamiento.push(this.tratamiento)
    console.log(this.arrayTratamiento);
    this.dataSource = new MatTableDataSource(this.arrayTratamiento);
    this.tratamiento =  new Tratamiento();
  }

  registrar(){
    this.consulta.tratamiento = this.arrayTratamiento;
  
    console.log(this.consulta); 
  }
}
