import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { Global }  from '../models/global';
import { UserService } from '../services/user.service';
import { Especialidad } from '../models/EspecialidadModel';


@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private token;

  public global : Global;
  constructor(private _http : Http, private Uservice : UserService) {
    this.global = new Global;
  }

  getEspecialidades(){
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'especialidades/';
    const headers = new Headers(
      {
        'Content-Type' : 'application/json',
        'x-access-token' : this.token,
      }
    );
    let options = new RequestOptions({headers : headers});

    return this._http.get(
      URL, {headers}).pipe(
        res => {
          res => res.json();
          return res;
        }
      )
  }

  postEspecialidad(esp: Especialidad)  {
    console.log(esp);
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'especialidad';
    const newpres = JSON.stringify(esp);
    const headers = new Headers(
      {
        'Content-Type' : 'application/json',
        'x-access-token' : this.token,
      }
    );
    let options = new RequestOptions({headers : headers});

    return this._http.post(
      URL, newpres, {headers}).pipe(
        res => {
          res => res.json();
          return res;
        }
      )
  }

}
