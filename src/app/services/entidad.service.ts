import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { Global }  from '../models/global';
import { UserService } from '../services/user.service';
import { Entidad } from '../models/EntidadModel';
import { Municipio } from '../models/MunicipioModel';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {
  private token;
  public global : Global;
  
  constructor(private _http : Http, private Uservice : UserService) {
    this.global = new Global;
  }

  getEntidades(){
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'entidad/';
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

  getMunicipios(id_estado : number){
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'municipios/' + id_estado;
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
}
