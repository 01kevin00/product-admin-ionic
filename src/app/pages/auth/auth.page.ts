import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CustomInputComponent } from 'src/app/shared/components/custom-input/custom-input.component';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { SignUpPageModule } from './sign-up/sign-up.module';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HeaderComponent, CustomInputComponent, LogoComponent, SignUpPageModule],
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor() { }

  ngOnInit() {
  }

  submit() {
    console.log(this.form.value);
  }
}
