import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit{
  items: any[] = [];

  constructor(private router: Router, private navCtrl: NavController, private supabase: SupabaseService) {}

  goToLists(){
    this.router.navigate(['/lists']);
  }
  async ngOnInit() {
    this.items = await this.supabase.getDataLimited('upcoming_trips');
  }
}
