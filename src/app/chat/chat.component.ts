import { Component, OnInit } from '@angular/core';
import {ChatService} from 'src/app/services/chat.service'
import {MedicoService} from 'src/app/services/medico.service'
import {WebsocketService} from 'src/app/services/websocket.service'
import {Mensaje} from 'src/app/models/MensajeModel'
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Medico } from '../models/MedicoModel';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [WebsocketService, ChatService]
})
export class ChatComponent implements OnInit {

  mensaje: Mensaje;
  mensajes: any[] =[]
  user: any;
  id_user: any;
  Medicos : Medico [];
  Chats;
  private success : boolean;
  constructor(private chat_serv: ChatService, private medico_serv: MedicoService
    ,private _snackBar: MatSnackBar,
    private router : Router, private service : UserService){
    this.mensaje = new Mensaje;
    this.getMedicos();
  if (typeof(Storage) !== "undefined") {  
      this.user =JSON.parse(localStorage.getItem("user"));
      this.id_user =JSON.parse(localStorage.getItem("id"));
      this.mensaje.emisor = this.user;
      this.mensaje.id = this.id_user;
  } else {
      console.log("Local Storage No Esta Disponible En Este Navegador")
      alert("Local Storage No Esta Disponible En Este Navegador")
  }
  }

  ngOnInit(){
    this.chat_serv.messages.subscribe(async msg => {
    if( msg.receptor == this.user ){
    this.getItem(msg.id, msg);
    
    }
    })
  }

  async sendMessage() {
    this.chat_serv.sendMsg(this.mensaje);
    this.setItem(this.mensaje.id_receptor, this.mensaje);
    this.getChat(this.mensaje.id_receptor);

    await new Promise((resolve, reject) => {
      setTimeout(function() {
        let objDiv = document.getElementById("contenedor");
        objDiv.scrollTop = objDiv.scrollHeight;
        resolve();
      }, 100);
    });
  }
 
  scrollEndChat(){
    let objDiv = document.getElementById("contenedor");
    objDiv.scrollTop = objDiv.scrollHeight;
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

  async prueba(nombre: any, apellido: any,id_receptor: any){
    this.mensaje.receptor = nombre+" "+apellido
    this.mensaje.id_receptor= id_receptor;
    this.getChat(id_receptor);
    
    await new Promise((resolve, reject) => {
      setTimeout(function() {
        let objDiv = document.getElementById("contenedor");
        objDiv.scrollTop = objDiv.scrollHeight;
        resolve();
      }, 100);
    });

  
  }

  async getItem(id_receptor: any, msg: any){
    console.log(id_receptor);
    
    let chat;
    if(this.id_user<id_receptor){
      if (localStorage.getItem(this.id_user+""+id_receptor) === null) { 
        console.log("no existe");
        this.mensajes = []
      } else{ 
        chat = JSON.parse(localStorage.getItem(this.id_user+""+id_receptor)) ;
        this.mensajes=chat;
      }
    }else{
      if (localStorage.getItem(id_receptor+""+this.id_user) === null) { 
        console.log("no existe");
        this.mensajes = []
      } else{
        chat = JSON.parse(localStorage.getItem(id_receptor+""+this.id_user)) ;
        this.mensajes=chat;    
      }
    }
    this.setItem(msg.id, msg);
    this.getChat(msg.id_receptor);

    await new Promise((resolve, reject) => {
      setTimeout(function() {
        let objDiv = document.getElementById("contenedor");
        objDiv.scrollTop = objDiv.scrollHeight;
        resolve();
      }, 100);
    });
  }

  setItem(id: any, mensaje: any){
    this.mensajes=[...this.mensajes, {
      'emisor': mensaje.emisor,
      'receptor': mensaje.receptor,
      'mensaje': mensaje.mensaje,
      'id': mensaje.id,
      'id_receptor': mensaje.id_receptor
    }];
    if(this.id_user<id){
      localStorage.setItem(this.id_user+""+id, JSON.stringify(this.mensajes));
    }else{
      localStorage.setItem(id+""+this.id_user, JSON.stringify(this.mensajes));
    }
  }

  getChat(id_receptor: any){
    console.log(id_receptor)
    this.mensajes= [];
    let chat;
    let existe: boolean = false;
    if(this.id_user<id_receptor){
      if (localStorage.getItem(this.id_user+""+id_receptor) === null) { 
        console.log("no existe");
      } else{ 
        existe= true;
        chat = JSON.parse(localStorage.getItem(this.id_user+""+id_receptor)) ; 
        this.mensajes=chat;
      }
    }else{
      if (localStorage.getItem(id_receptor+""+this.id_user) === null) { 
      }else{
        existe= true;
        chat = JSON.parse(localStorage.getItem(id_receptor+""+this.id_user)) ;
        this.mensajes=chat;      
      }
    }
    if(existe == true){
      this.Chats = chat;
      return 0;
      //for(let chats of chat){
      //output.innerHTML += `<span style='font-size: 11pt;' > <strong>${chats.emisor}</strong> . ${chats.mensaje} </span><br>` 
      //} 
    }else{
      this.Chats = [];
    }
  }
}
