import { Component, OnInit } from '@angular/core';
import { Tratamiento } from 'src/app/models/TratamientoModel';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Consulta } from 'src/app/models/ConsultaModel';
import { ConsultaService } from 'src/app/services/consulta.service';
import { Router } from '@angular/router';
import { CitasService } from 'src/app/services/citas.service';

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
  success: any;
  constructor(private consul_serv: ConsultaService, private cita_serv: CitasService, private router : Router, private _snackBar: MatSnackBar,) {
    
   }

  ngOnInit() {
    this.tratamiento =  new Tratamiento();
    this.consulta =  new Consulta();
    this.consulta.id_medico = JSON.parse(localStorage.getItem("id")); 
    this.consulta.id_cita = JSON.parse(localStorage.getItem("cita"));
   
    this.consulta.id_paciente = JSON.parse(localStorage.getItem("paciente"))
  }

  addTratamiento(){
    this.arrayTratamiento.push(this.tratamiento)
    console.log(this.arrayTratamiento);
    this.dataSource = new MatTableDataSource(this.arrayTratamiento);
    this.tratamiento =  new Tratamiento();
  }

  calcularIMC(){
    let peso = Number(this.consulta.peso)
    let altura = Number(this.consulta.altura)
    
    if(this.consulta.peso != undefined && this.consulta.altura != undefined){
    if(Number.isNaN(peso) || Number.isNaN(altura)){
      console.log("algo esta mal");
    }else{
      this.consulta.imc = (peso/Math.pow(altura/100, 2)).toFixed(1)
      console.log(this.consulta.imc);
    }
  }
      
  }

  registrar(){
    this.consulta.tratamiento = this.arrayTratamiento;
    console.log(this.consulta); 
    this.postConsulta();
  }


  postConsulta(){ 
    this.consul_serv.postConsulta(this.consulta).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.putStatus();
        }
    });
  }

  putStatus(){
    let data = { 
      id_cita: this.consulta.id_cita,
      status: 2
    }
     this.cita_serv.putStatus(data).subscribe(
       (response : any)  => {
         var Resp = response;
         var texto = Resp._body;
         var jey = JSON.parse(texto);
         this.success = jey.success;
         this.SnackBarError(jey.message);
         if (jey.success){
            this.router.navigate(['citas']);
         }
     });
   } 

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }
  
}
