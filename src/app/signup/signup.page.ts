import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  imports: [IonicModule, FormsModule]
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
    this.router.navigate(['/tab1']);
  }
}