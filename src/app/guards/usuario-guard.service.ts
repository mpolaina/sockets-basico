import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(
    public wsService: WebsocketService,
    private router: Router
  ) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if ( this.wsService.getUsuario() ) {
      return true
    } else {
      this.router.navigateByUrl('/login')
      return false
    }
  }
}
