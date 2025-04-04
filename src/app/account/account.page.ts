import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  imports: [IonicModule]
})
export class AccountPage implements OnInit {
  userId = 'this.supabase.getUser()';
  profilePicture: string | null = null;

  constructor(private navCtrl: NavController, private supabase: SupabaseService) { 
  }

  ngOnInit() {}

  goBack(){
    this.navCtrl.back();
  }

  async logout(){
    this.supabase.signOut();
    this.navCtrl.navigateRoot('/login');
  }

}
