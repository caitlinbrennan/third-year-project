import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  imports: [IonicModule]
})
export class AccountPage implements OnInit {
  private supabase: SupabaseClient

  constructor(private navCtrl: NavController) { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  ngOnInit() {}

  goBack(){
    this.navCtrl.back();
  }

  
  async addUser() {
    const { data, error } = await this.supabase
    .from('users')
    .insert([{ name: 'Jane', email: 'jane@example.com' }]);

    if (error) {
      console.error('Error:', error.message);
    }
    else {
      console.log('User added:', data);
    }
  }

}
