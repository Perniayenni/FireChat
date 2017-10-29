import { Component, OnInit } from '@angular/core';
import {consoleTestResultHandler} from "tslint/lib/test";
import {ChatService} from '../../providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public chatSer: ChatService) { }

  ngOnInit() {
  }

  Ingresar(proveedor) {
    this.chatSer.login(proveedor);
  }

}
