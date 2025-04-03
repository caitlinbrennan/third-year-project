import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg } from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';
import { IonicModule, LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, FormsModule]
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(private readonly supabase: SupabaseService, private router: Router,
    private navCtrl: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  async handleLogin(event: any) {
    event.preventDefault()
    const loader = await this.supabase.createLoader()
    await loader.present()
    try {
      const user = await this.supabase.signIn(this.email);
      await this.supabase.signIn(this.email)
      await loader.dismiss()
      if(user) {
        console.log('Login successful:', user);
        this.navCtrl.navigateRoot('/tabs/tab1');
      }
    } catch (error: any) {
      await loader.dismiss()
      await this.supabase.createNotice(error.error_description || error.message)
    }
  }

  async login() {
    const loading = await this.loadingCtrl.create({ message: 'Logging in...'});
    await loading.present();

    try {
      await this.supabase.login(this.email, this.password);
      await loading.dismiss();
      this.showAlert('Success', 'Login successful!');
    }
    catch (error:any) {
      await loading.dismiss();
      this.showAlert('Error', error.message || 'Login failed.');
    }
  }

  async showAlert(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }


  goToSignup(){
    this.router.navigate(['/signup']);
  }

}
