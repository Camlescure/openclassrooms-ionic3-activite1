import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage implements OnInit {

  mode:string;
  authForm: FormGroup; 
  errorMessage: string;

  constructor(public navCtrl: NavController, public authService: AuthService, public navParams: NavParams, public MenuCtrl: MenuController, public formBuilder: FormBuilder) {
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  initForm(){
    this.authForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]], 
      password:['', Validators.required]
    });
  }

  onToggleMenu(){
    this.MenuCtrl.open();
  }

  onSubmitForm() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    if (this.mode === 'new') {
      this.authService.signUpUser(email, password).then(
        () => {
          this.navCtrl.setRoot(TabsPage);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    } else if (this.mode === 'connect') {
      this.authService.signInUser(email, password).then(
        () => {
          this.navCtrl.setRoot(TabsPage);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}

