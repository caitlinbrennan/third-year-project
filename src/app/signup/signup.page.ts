import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonTitle, IonModal } from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  imports: [IonicModule, FormsModule, RouterModule, IonContent, IonTitle, IonModal]
})
export class SignupPage {

  email = '';
  password = '';

  constructor(private readonly supabase: SupabaseService, private navCtrl: NavController, private router: Router) {}

  async handleLogin(event: any) {
    event.preventDefault()
    const loader = await this.supabase.createLoader()
    await loader.present()
    try {
      const user = await this.supabase.signUp(this.email, this.password);
      await loader.dismiss()
      if(user) {
        console.log('Sign Up successful:', user);
        this.navCtrl.navigateRoot('/tabs/tab1');
      }
    } catch (error: any) {
      await loader.dismiss()
      await this.supabase.createNotice(error.error_description || error.message)
    }
  }

    @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }

  userName: string="";
  firstName: string="";
  lastName: string="";
  avatar: string="";
  emailUsed: string="";
  passwordUsed: string="";

  async createProfile(){
    const users = {
      username: this.userName,
      first_name: this.firstName,
      last_name: this.lastName,
      avatar_url: this.avatar,
      email: this.emailUsed,
      password: this.passwordUsed,
    }

    this.supabase.createProfile();
  }

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