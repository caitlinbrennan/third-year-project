import { Component, OnInit } from '@angular/core';
import { IonContent, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  imports: [IonicModule, FormsModule, RouterModule, IonContent, IonTitle, IonToolbar]
})
export class SignupPage {

  email = ''
  password = ''

  constructor(private readonly supabase: SupabaseService, private navCtrl: NavController, private router: Router) {}

  async handleLogin(event: any) {
    event.preventDefault()
    const loader = await this.supabase.createLoader()
    await loader.present()
    try {
      const { error } = await this.supabase.signIn(this.email)
      if (error) {
        throw error
        console.log("issue");
      }
      await loader.dismiss()
    } catch (error: any) {
      await loader.dismiss()
      await this.supabase.createNotice(error.error_description || error.message)
    }
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