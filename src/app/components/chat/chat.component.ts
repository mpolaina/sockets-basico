import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { mensaje } from '../../../../../01-server/sockets/sockets';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = ''
  mensajeSubs: Subscription
  elemento: HTMLElement
  mensajes: any[] = []

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit(): void {

      this.elemento = document.getElementById('chat-mensajes')

      this.mensajeSubs = this.chatService.getMessages()
          .subscribe( msg =>  {
            this.mensajes.push(msg)
            setTimeout(() => {
              this.elemento.scrollTop = this.elemento.scrollHeight
            }, 50);
          })

  }

  ngOnDestroy(): void {
     this.mensajeSubs.unsubscribe()
  }

  enviar(){
      if ( this.texto.trim().length === 0 ) { return }
      this.chatService.sendMessage( this.texto )
      this.texto = ''
  }

}
