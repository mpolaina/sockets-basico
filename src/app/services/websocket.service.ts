import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { io, Socket } from 'socket.io-client/build/index';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false
  private socket: Socket;
  public usuario: Usuario

  constructor( ) {
    this.socket = io( environment.wsUrl )
    this.cargarStorage()
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

  loginWS( nombre: string ){

    return new Promise( (resolve, reject) => {
      // usamos el emit de arriba
      this.emit('configurar-usuario', { nombre }, resp => {

        this.usuario = new Usuario( nombre )
        this.guardarStorage()
        resolve(resp)
      })

    })
  }

  getUsuario() {
    return this.usuario
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify( this.usuario ))
  }

  cargarStorage() {
    if ( localStorage.getItem('usuario') ){
      this.usuario = JSON.parse( localStorage.getItem('usuario') )
      // reconectar y actualizar usuario en el socket server
      this.loginWS( this.usuario.nombre )
    }
  }
}

