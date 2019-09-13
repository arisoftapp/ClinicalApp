import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { Global }  from '../models/global';
import { UserService } from '../services/user.service';
import { Cita } from 'src/app/models/CitaModel';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  putStatus(cita: any) {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'status';
    const newpres = JSON.stringify(cita);
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
  private token;
  public global : Global;
  
  constructor(private _http : Http, private Uservice : UserService) {
    this.global = new Global;
  }

  getPrioridad(){
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'prioridad/';
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

  getCitasPaciente(user){
    console.log(user)
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'citas/' + user;
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
          console.log(res);
          return res;
        }
      )
  }

  getTipo(){
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'tipo/';
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

  getCita(){
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'citas/';
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

  postCita(cita: Cita)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'citas';
    const newpres = JSON.stringify(cita);
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
}