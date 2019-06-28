import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import localeMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/PacienteModel';


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
  pacientes : Paciente [];
  paciente : Paciente
  displayedColumns = ['identifier', 'name', 'phone', 'email', 'options'];
  success;


  constructor(private pac_service : PacienteService, private _snackBar: MatSnackBar,
    private router : Router) {
      registerLocaleData(localeMX);
    }

  ngOnInit() {
    this.getPacientes();
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
          this.pacientes = jey.data;
        }
      error => {
        console.log(<any>error);
      }
      });
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
