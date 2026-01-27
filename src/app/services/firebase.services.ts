import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { User } from '../models/user.model';

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
}