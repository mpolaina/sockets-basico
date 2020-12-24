import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMessage( mensaje: string ) {

      const payload = {
        de: this.wsService.usuario.nombre,
        cuerpo: mensaje
      }

      this.wsService.emit( 'mensaje', payload )
  }

  getMessages() {
    return this.wsService.listen( 'mensaje-nuevo' )
  }

  getPrivateMessages() {
    return this.wsService.listen( 'mensaje-privado' )
  }

}
