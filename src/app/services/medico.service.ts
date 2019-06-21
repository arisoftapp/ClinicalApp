import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { Global }  from '../models/global';
import { UserService } from '../services/user.service';
import { Medico } from '../models/MedicoModel';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private token;
  public global : Global;
  
  constructor(private _http : Http, private Uservice : UserService) {
    this.global = new Global;
  }

  getMedicos(){
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'medicos/';
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

  getMedico(id_med){
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'medico/' + id_med;
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

  postMedico(med: Medico)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'medico';
    const newpres = JSON.stringify(med);
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

  putMedico(med: Medico)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'medico';
    const newpres = JSON.stringify(med);
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

  deleteMedico(med: Medico)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'medico/' + med.id_medico;
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
