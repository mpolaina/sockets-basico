import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  nombre = ''

  constructor(
    private wsService:WebsocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ingresar() {
    this.wsService.loginWS( this.nombre )
        .then( () => {
          this.router.navigateByUrl('/mensajes')
        })
    this.nombre = ''
  }

}
