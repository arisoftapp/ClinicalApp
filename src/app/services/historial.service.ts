import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { Global }  from '../models/global';
import { UserService } from '../services/user.service';
import { Cita } from 'src/app/models/CitaModel';
import { Historial } from '../models/HistorialModel';
@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private token;
  public global : Global;
  constructor(private _http : Http,private Uservice : UserService) {
    this.global = new Global;
    console.log(this.global.URL);
    
  }

  postHistorial(historial: Historial)  {
    this.token = this.Uservice.getToken();
    let URL = this.global.URL + 'historial';
    const newpres = JSON.stringify(historial);
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

getHistorialPaciente(user: any){
  console.log(user)
  this.token = this.Uservice.getToken();
  let URL = this.global.URL + 'historial/' + user;
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

putHistorial(historial: any) {
  this.token = this.Uservice.getToken();
  let URL = this.global.URL + 'historialPaciente';
  const newpres = JSON.stringify(historial);
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
}
