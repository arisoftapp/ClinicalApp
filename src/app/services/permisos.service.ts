import { Injectable } from '@angular/core';
import { Ruta } from '../models/RutasModel';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  permisos: any;
  Rutas : Ruta [] = [
    new Ruta("inicio", "Inicio", "dashboard", true, true),
    new Ruta("citas", "Citas", "alarm", true, true),
    new Ruta("calendario", "Calendario", "calendar_today", true, true),
    new Ruta("pacientes", "Pacientes", "people", true, true),
    new Ruta("medicos", "Médicos", "", false, true),
    new Ruta("consultorios", "Consultorios", "", false, true),
    new Ruta("especialidades", "Especialidades", "local_hospital", true, false),
    new Ruta("chat", "Chat", "forum", true, true)
  ]
  load: boolean = false;

  constructor() {
    this.permisos =JSON.parse(localStorage.getItem("permisos"));
    if (this.load == false){
      this.load = true;
      this.setPermisos();
    }else{console.log("ya cargados")}
    
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
}
