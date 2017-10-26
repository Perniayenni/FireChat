import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje:string= '';
  constructor(public chatSer: ChatService) {
    this.chatSer.cargarMensajes()
      .subscribe((mensajes:any []) => {
        console.log(mensajes);
      });
  }

  ngOnInit() {
  }

  enviar_mensaje(){
    console.log(this.mensaje);
  }

}
