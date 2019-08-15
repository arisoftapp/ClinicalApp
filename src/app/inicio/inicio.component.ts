import { Component, OnInit } from '@angular/core';
import {ChatService} from 'src/app/services/chat.service'
import {MedicoService} from 'src/app/services/medico.service'
import {WebsocketService} from 'src/app/services/websocket.service'
import {Mensaje} from 'src/app/models/MensajeModel'
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Medico } from '../models/MedicoModel';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [WebsocketService, ChatService]
})
export class InicioComponent implements OnInit {
  mensaje: Mensaje;
  user: any;
  id_user: any;
  Medicos : Medico [];
  permisos: any;
  private success : boolean;

  constructor(private chat: ChatService,private medico_serv: MedicoService
    ,private _snackBar: MatSnackBar, private router : Router, private service : UserService,
    private auth_serv: AuthService){ 
    this.mensaje = new Mensaje;
    this.getMedicos();

  if (typeof(Storage) !== "undefined") {
      this.user =JSON.parse(localStorage.getItem("user"));
      this.id_user =JSON.parse(localStorage.getItem("id"));
      this.mensaje.emisor = this.user;
      
  } else {
      console.log("Local Storage No Esta Disponible En Este Navegador")
      alert("Local Storage No Esta Disponible En Este Navegador")
  }
    this.router.navigate(['/citas']); 
  }

  ngOnInit() {
   
  }

  getMedicos(){
    this.medico_serv.getMedicos().subscribe(
    (response : any)  => {
      var Resp = response;
      var texto = Resp._body;
      var jey = JSON.parse(texto); 
      if (!jey.success){
        this.success = jey.success; 
        this.SnackBarError(jey.message);
      }else {
        this.Medicos = jey.data;
        this.Medicos.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
    error => {
      console.log(<any>error);
    }
    });
  }

  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }

}
