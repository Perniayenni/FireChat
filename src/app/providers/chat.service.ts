import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Mensaje } from '../interfaces/mensaje.interface';
@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public  chats: Mensaje[]= [];
  public usuario:any = {};
  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      console.log('Estado del usuario:', user);
      if (!user){
        return
      }else{
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
      }
    })
  }

  login(proveedor) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc')
                                                                                          .limit(5));
    return this.itemsCollection.valueChanges()
      .map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats = [];
        for (let mensaje of mensajes){
          this.chats.unshift(mensaje);
        }
      });
  }

  agregarMensaje(texto) {

    let mensaje: Mensaje = {
      nombre : 'YenniDemo',
      mensaje : texto,
      fecha: new Date().getTime()
    };
   return this.itemsCollection.add(mensaje);
  }

}
