import { Injectable, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from '../app.component';
import { AppRoutingModule } from '../app-routing.module';

// # Agregados para la inicialización de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc } from '@angular/fire/firestore';

@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth())
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

@Injectable({
  providedIn: 'root',
})
export class FirebaseServices {

  auth = inject(Auth);
  firestore = inject(AngularFirestore);

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
    return setDoc(doc(getFirestore(), path), data);
  }
}