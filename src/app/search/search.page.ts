import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class SearchPage {
  searchQuery: string = '';
  items: any[] = [];

  constructor(private supabaseService: SupabaseService, private navCtrl: NavController) {}

  async onSearch(){
    if (this.searchQuery.trim().length === 0) {
      this.items = [];
      return;
    }
    try {
      this.items = await this.supabaseService.searchItems(this.searchQuery);
    }
    catch (error) {
      console.error('Search error:', error)
    }
  }

  goToSearch(){
    this.navCtrl.back();
  }

}
