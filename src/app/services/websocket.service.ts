import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { io, Socket } from 'socket.io-client/build/index';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false
  private socket: Socket;

  constructor( ) {
    this.socket = io( environment.wsUrl )
    this.checkStatus()
  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor')
      this.socketStatus = true
    })
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor')
      this.socketStatus = false
    })
  }
  // evento(que emitimos) payload(info) callback(ejecutar después)
  emit( evento: string, payload?: any, callback?: Function ) {

      this.socket.emit( evento, payload, callback )
      // console.log('Emitiendo', evento)
  }

  listen( evento: string ){

      return new Observable<string>( (subscriber) => {
        this.socket.on( evento, (data: string) => {
          subscriber.next( data )
        })
      })

  }
}

