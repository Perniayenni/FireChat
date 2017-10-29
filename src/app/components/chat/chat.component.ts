import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  elemento:any;
  mensaje:string= '';
  constructor(public chatSer: ChatService) {
    this.chatSer.cargarMensajes()
      .subscribe(() => {
        setTimeout(() =>  {
            this.elemento.scrollTo = this.elemento.scrollHeight;
          },20);
      });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje(){
    console.log(this.mensaje);
    if(this.mensaje.length === 0) {
      return
    }else{
      this.chatSer.agregarMensaje(this.mensaje)
        .then(() => this.mensaje = '')
          .catch((err) => console.error('Error al enviar', err)
    );
    }
  }

}
