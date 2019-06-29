import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { Global }  from '../models/global';
import { UserService } from '../services/user.service';
import { Paciente } from '../models/PacienteModel';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private token;
  public global : Global;
  
  constructor(private _http : Http, private Uservice : UserService) {
    this.global = new Global;
  }

  getPacientes(){
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'pacientes/';
    const headers = new Headers(
      {
        'Content-Type' : 'application/json',
        'x-access-token' : this.token,
      }
    );

    return this._http.get(
      URL, {headers}).pipe(
        res => {
          res => res.json();
          return res;
        }
      )
  }

  getPaciente(id_pac){
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'paciente/' + id_pac;
    const headers = new Headers(
      {
        'Content-Type' : 'application/json',
        'x-access-token' : this.token,
      }
    );

    return this._http.get(
      URL, {headers}).pipe(
        res => {
          res => res.json();
          return res;
        }
      )
  }

  postPaciente(pac: Paciente)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'paciente';
    const newpres = JSON.stringify(pac);
    const headers = new Headers(
      {
        'Content-Type' : 'application/json',
        'x-access-token' : this.token,
      }
    );

    return this._http.post(
      URL, newpres, {headers}).pipe(
        res => {
          res => res.json();
          return res;
        }
      )
  }

  putPaciente(pac: Paciente)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'paciente';
    const newpres = JSON.stringify(pac);
    const headers = new Headers(
      {
        'Content-Type' : 'application/json',
        'x-access-token' : this.token,
      }
    );

    return this._http.put(
      URL, newpres, {headers}).pipe(
        res => {
          res => res.json();
          return res;
        }
      )
  }

  deletePaciente(pac: Paciente)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'paciente/' + pac.id_paciente;
    const headers = new Headers({
      'Content-Type' : 'application/json',
      'x-access-token' : this.token
    });
    
    return this._http.delete(
      URL, {headers}).pipe(
        res => {
          res => res.json();
          return res;
        }
      )
  }


}
