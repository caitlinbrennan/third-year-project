import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, FormsModule]
})
export class LoginPage {

  email = ''
  password = ''

  constructor(private readonly supabase: SupabaseService, private router: Router, private navCtrl: NavController) {}

  async handleLogin(event: any) {
    event.preventDefault()
    const loader = await this.supabase.createLoader()
    await loader.present()
    try {
      const { error } = await this.supabase.signIn(this.email)
      if (error) {
        throw error
      }
      await loader.dismiss()
    } catch (error: any) {
      await loader.dismiss()
      await this.supabase.createNotice(error.error_description || error.message)
    }
  }

  goToSignup(){
    this.router.navigate(['/signup']);
  }

  login() {
    // Perform authentication logic here
    this.router.navigate(['/tabs/tab1']); // Replaces current page, preventing going back
  }

}
