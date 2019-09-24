import { Injectable } from '@angular/core';
import { Global } from '../models/global';
import { Historial } from '../models/HistorialModel';
import { UserService } from './user.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private token;
  public global : Global;
  constructor(private _http : Http,private Uservice : UserService) {
   }


   postHistorial(historial: any)  {
    console.log("entro");
    this.token = this.Uservice.getToken();
    let URL = 'localhost:3005/' + 'historial';
    console.log(URL);
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

putHistorial(historial: any) {
  console.log("entro");
  
  this.token = this.Uservice.getToken();
  let URL = 'localhost:3005/' + 'historialPaciente';
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
