import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonTitle, IonModal } from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, Validators, FormBuilder } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpData } from '../services/supabase.service';
import { supabase } from '../services/supabaseClient';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  imports: [ReactiveFormsModule, IonicModule, FormsModule, RouterModule, IonContent, IonTitle, IonModal]
})
export class SignupPage {

  credentials = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  user: SignUpData = {
    id: '',
    username: '',
    full_name: '',
    avatar_url: '',
    email: '',
    password: '',
  };

  constructor(private loadingController: LoadingController, private fb: FormBuilder, private readonly supabase: SupabaseService, private navCtrl: NavController, private router: Router) {
  }

  userName: string="";
  fullName: string="";
  avatar: string="";
  emailUsed: string="";
  passwordUsed: string="";
  

  async addAccount(){
    const { data , error } = await supabase.auth.signUp({
      email: this.emailUsed,
      password: this.passwordUsed,
    });
    if(error) {
      console.error('Sign-up error:', error.message);
      return;
    }
    const user = data.user;

    if(user) {
      const account = {
        updated_at: new Date().toISOString(),
        username: this.userName,
        full_name: this.fullName,
        avatar_url: this.avatar,
        email: this.emailUsed,
        password: this.passwordUsed,
        id: user.id,
      };

      const {error: ProfileError} = await this.supabase.addAccount(account);

      if(ProfileError) {
        console.error('Failed to insert user', ProfileError);
        return;
      }
      else {
        this.navCtrl.navigateRoot('/tabs/tab1');
      }
    }
  }

/*  async handleSignIn(event: any) {
      const account = {
      updated_at: new Date().toISOString(),
      username: this.userName,
      full_name: this.fullName,
      avatar_url: this.avatar,
      email: this.emailUsed,
    };

    event.preventDefault()
    const loader = await this.supabase.createLoader()
    await loader.present()
    try {
      const user = await this.supabase.signUp(this.emailUsed, this.passwordUsed);
      await loader.dismiss()
      if(user) {
        console.log('Sign Up successful:', user);
        await this.supabase.addAccount(account);
        this.navCtrl.navigateRoot('/tabs/tab1');
      }
    } catch (error: any) {
      await loader.dismiss()
      await this.supabase.createNotice(error.error_description || error.message)
    }
  }
*/
/*  userId: string="";
  currentTimestamp = new Date().toISOString();
  userName: string="";
  firstName: string="";
  lastName: string="";
  avatar: string="";
*/
/*  async createProfile(){
    const user = await this.supabase.getUser();
    const users = {
      user_id: user.id,
      created_at: new Date().toISOString(),
      username: this.userName,
      first_name: this.firstName,
      last_name: this.lastName,
      avatar_url: this.avatar,
      email: this.email,
      password: this.password,
    }

    this.supabase.createProfile();
  }
*/
  goToLogin(){
    this.navCtrl.back();
  }
  goToHome(){
    console.log("navigation")
    this.router.navigate(['/tab1']);
  }
}

navigator.locks.request("lock:sb-aoesmwcahajxuceweegh-auth-token", { mode: "exclusive" }, (lock) => {
  console.log("Lock acquired!", lock);
});

navigator.locks.request("lock:sb-aoesmwcahajxuceweegh-auth-token", { mode: "exclusive" }, async (lock) => {
  try {
      console.log("Lock acquired, doing work...");
  } finally {
      console.log("Releasing lock");
  }
});