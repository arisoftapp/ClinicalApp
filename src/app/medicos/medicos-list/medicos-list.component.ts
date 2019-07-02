import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Medico } from '../../models/MedicoModel';
import { MedicoService } from '../../services/medico.service';
import localeMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (isSubmitted));
  }
}

@Component({
  selector: 'app-medicos-list',
  templateUrl: './medicos-list.component.html',
  styleUrls: ['./medicos-list.component.css']
})
export class MedicosListComponent implements OnInit  {
  medicos : Medico [];
  medico : Medico;
  private success : boolean;
  private message : string;
  private nombre_esp : string;
  displayedColumns = ['identifier', 'name', 'consul', 'phone', 'email', 'options'];
  public recetaPath;
  recetaURL: any;
  

  constructor(private medic_service : MedicoService, private _snackBar: MatSnackBar,
    private router : Router) {
      registerLocaleData(localeMX);
    }

  ngOnInit() {
    this.getMedicos();
  }

  getMedicos(){
    this.medic_service.getMedicos().subscribe(
    (response : any)  => {
      var Resp = response;
      var texto = Resp._body;
      var jey = JSON.parse(texto); 
      if (!jey.success){
        this.success = jey.success; 
        this.SnackBarError(jey.message);
      }else {
        this.medicos = jey.data;
      }
    error => {
      console.log(<any>error);
    }
    }); 
  }

  postMedico(medico: Medico){
    console.log(medico);
    this.medic_service.postMedico(medico).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto);
        this.success = jey.success;
        this.SnackBarError(jey.message);
        if (jey.success){
          this.getMedicos();
        }
    });
  }

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }

  openAddDialog(id_medico): void {
    this.router.navigate(['medicos/registrarMedico/' + id_medico]);
  }


}

