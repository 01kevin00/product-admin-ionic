import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServices {

  auth = inject(Auth);

  // ======================== authentication ========================

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
    const auth = getAuth();
    // Validación CLAVE: Si no hay usuario, no hacemos la petición
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, { displayName: displayName });
    } else {
      // Retornamos una promesa resuelta sin hacer nada, evitando el error de Bad Request
      console.warn('No hay usuario logueado para actualizar perfil');
      return Promise.resolve();
    }
  }
}