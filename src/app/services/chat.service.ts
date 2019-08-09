import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map, filter, catchError, mergeMap} from 'rxjs/operators';
import { WebsocketService } from "./websocket.service";



const CHAT_URL =  "ws://localhost:3005";



@Injectable()
export class ChatService {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect().pipe(map((response: any): any => {
        return response;
      }))
   }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg: any) {
    console.log(msg);
    this.messages.next(msg);
  }

  sendMsgprivate(msg) {
    this.messages.next(msg);
  }

}


