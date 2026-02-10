import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilsServices {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  // ======================== LOADING ========================
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  // ======================== TOAST ========================
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // ======================== Enrruta cualquier paginas disponibles ==============S==========
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // ============== Guardar datos en localStorage ========================
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // ============== Obtener elemento del localStorage ========================
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
