import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg } from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';
import { IonicModule, LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { supabase } from '../services/supabaseClient';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, FormsModule]
})
export class LoginPage {

  emailUsed="";
  passwordUsed="";

  constructor(private readonly supabase: SupabaseService, private router: Router,
    private navCtrl: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  async handleLogin(event: any) {
    const account = {
      updated_at: new Date().toISOString(),
      email: this.emailUsed,
      password: this.passwordUsed,
    };
    event.preventDefault()
    const loader = await this.supabase.createLoader()
    await loader.present()

      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id')  // Assume "user_id" is in the "profiles" table
        .eq('email', this.emailUsed); 
        if(profilesError) {
          console.log('error', profilesError.message);
        }
        else if(profiles.length === 0) {
          console.log('email not registered');
          await loader.dismiss()
        }
        else {
          const {data, error} = await supabase.auth.signInWithPassword({
            email: this.emailUsed,
            password: this.passwordUsed,
          });
          await loader.dismiss()
      if(error) {
        console.log('error', error.message);
      }
      else{
        console.log('Login successful:', data);
        this.navCtrl.navigateRoot('/tabs/tab1');
      }
  }
  const { data: { user }, error } = await supabase.auth.getUser();
  console.log('User:', user);

}


  async login() {
    const loading = await this.loadingCtrl.create({ message: 'Logging in...'});
    await loading.present();

    try {
      await this.supabase.login(this.emailUsed, this.passwordUsed);
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
    this.navCtrl.navigateForward(['/signup']);
  }

}
