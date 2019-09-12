import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { Global }  from '../models/global';
import { UserService } from '../services/user.service';
import { Consulta } from 'src/app/models/ConsultaModel';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private token;
  public global : Global;
  constructor(private _http : Http, private Uservice : UserService) { 
    this.global = new Global;
  }


  postConsulta(consulta: Consulta)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'consulta';
    const newpres = JSON.stringify(consulta);
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
