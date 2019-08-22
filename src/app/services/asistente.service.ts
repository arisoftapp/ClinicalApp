import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { Global }  from '../models/global';
import { UserService } from '../services/user.service';
import { Medico } from '../models/MedicoModel';

@Injectable({
  providedIn: 'root'
})
export class AsistenteService {
  private token;
  public global : Global;
  
  constructor(private _http : Http, private Uservice : UserService) {
    this.global = new Global;
  }
  
  getAsistentes(){
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'asistente/';
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

  getAsistente(id_asistente: any){
    console.log(id_asistente)
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'asistente/' + id_asistente;
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

  getAsistenteMedico(id_asistente: any){
    console.log(id_asistente)
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'asismedicos/' + id_asistente;
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

  getAsistenteUser(user){
    console.log(user)
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'asistenteUser/' + user;
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

  postAsistente(asistente: any)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'asistente';
    const newpres = JSON.stringify(asistente);
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

  putAsistente(asistente: any)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'asistente';
    const newpres = JSON.stringify(asistente);
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

  deleteAsistente(asistente: any)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'asitente/' + asistente.id_asistente;
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
