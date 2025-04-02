import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(private router: Router, private navCtrl: NavController, private supabase: SupabaseService) {}

  goToLists(){
    this.router.navigate(['/lists']);
  }

  async logout(){
    this.supabase.signOut();
    this.navCtrl.navigateRoot('/login');
  }
}
