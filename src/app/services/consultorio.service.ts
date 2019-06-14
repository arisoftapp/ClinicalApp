import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { Global }  from '../models/global';
import { UserService } from '../services/user.service';
import { Consultorio } from '../models/ConsultorioModel';


@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {
  private token;
  public global : Global;
  
  constructor(private _http : Http, private Uservice : UserService) {
    this.global = new Global;
  }

  getConsultorios(){
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'consultorios/';
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

  postConsultorio(consul: Consultorio)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'consultorio';
    const newpres = JSON.stringify(consul);
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

  putConsultorio(consul: Consultorio)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'consultorio';
    const newpres = JSON.stringify(consul);
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

  deleteConsultorio(consul: Consultorio)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'especialidad/' + consul.id_consultorio;
    const headers = new Headers(
      {
        'Content-Type' : 'application/json',
        'x-access-token' : this.token,
      }
    );
    
    return this._http.delete(
      URL, {headers}).pipe(
        res => {
          res => res.json();
          return res;
        }
      )
  }

}