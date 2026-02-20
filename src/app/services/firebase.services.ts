import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { User } from '../models/user.model';
import { Firestore, setDoc, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServices {

  auth = inject(Auth);
  firestore = inject(Firestore);

  // =================================================================================== AUTENTICACION 

  // ========================    acceder     ======================== 
  signIn(user: User) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  // ========================    registrar     ========================
  signUp(user: User) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  // ======================== Actualizar Usuario ========================
  updateUser(displayName: string) {
    const currentUser = this.auth.currentUser;
    // Validación CLAVE: Si no hay usuario, no hacemos la petición
    if (currentUser) {
      return updateProfile(currentUser, { displayName: displayName });
    } else {
      // Retornamos una promesa resuelta sin hacer nada, evitando el error de Bad Request
      console.warn('No hay usuario logueado para actualizar perfil');
      return Promise.resolve();
    }
  }

  // =================================================================================== BASE DE DATOS (FIRESTORE)

  //setear un documento (crear o actualizar)
  setDocument(path: string, data: any) {
    return setDoc(doc(this.firestore, path), data);
  }

  // obtener un documento
  async getDocument(path: string) {
    return (await getDoc(doc(this.firestore, path))).data();
  }
}