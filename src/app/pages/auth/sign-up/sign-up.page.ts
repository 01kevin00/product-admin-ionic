import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CustomInputComponent } from 'src/app/shared/components/custom-input/custom-input.component';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { FirebaseServices } from 'src/app/services/firebase.services';
import { User } from 'src/app/models/user.model';
import { UtilsServices } from 'src/app/services/utils.services';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, CustomInputComponent, LogoComponent],
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  firebaseSvc = inject(FirebaseServices);
  utilsSvc = inject(UtilsServices);


  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as User).then(async res => {

        await this.firebaseSvc.updateUser(this.form.value.name);

        console.log(res);

      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });

      }).finally(() => {
        loading.dismiss();
      });
    }
  }
}