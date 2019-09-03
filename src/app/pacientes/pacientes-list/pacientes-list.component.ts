import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import localeMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/PacienteModel';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';




export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    //const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && control.touched);
  }
}

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.css']
})
export class PacientesListComponent implements OnInit {
  myControl = new FormControl();
  pacientes : Paciente [] = [];
  busqueda : any [] = [];
  paciente : Paciente;
  unico: any;
  options : string[] = ["One", "Dos", "Tres"]
  displayedColumns = ['identifier', 'name', 'phone', 'email', 'options'];
  success;
  filteredOptions: Observable<Paciente[]>;


  constructor(private pac_service : PacienteService, private _snackBar: MatSnackBar,
    private router : Router) {
      registerLocaleData(localeMX);
    }

   

    ngOnInit() {
      this.getPacientes();
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }
  
    private _filter(value: string): Paciente[] {
      let filterValue = value;
      if (value == ""){
        console.log("esta vacio");
        this.getPacientes();
      }else{ 
        return  this.pacientes.filter(option => option.completo.toLowerCase().includes(filterValue) );}
     
    }
 
  getPacientes(){
    
    this.pac_service.getPacientes().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          this.SnackBarError(jey.message);
        }else {
          this.pacientes =  jey.data;
          for(let data of this.pacientes){
          data.completo = data.nombre +" " + data.ap_paterno;
          }
        }
      error => {
        console.log(<any>error);
      }
      });
  }

  prueba(paciente: any){
    this.unico = paciente.completo;
    this.List(paciente)
  }

  List(data: any){
    this.pacientes = this.pacientes.filter(option => option.id_paciente == data.id_paciente);
  }

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }

  openAddDialog(id_pac) {
    this.router.navigate(['pacientes/registrarPaciente/' + id_pac]);
  }

}
