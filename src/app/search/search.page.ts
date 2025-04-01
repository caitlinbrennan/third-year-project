import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { SupabaseClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class SearchPage implements OnInit{
  searchQuery: string = '';
  country_name: any[] = [];
  filteredPlaces: any[] = [];

  constructor(private supabaseService: SupabaseService, private supabase: SupabaseClient, private navCtrl: NavController) {}

  async ngOnInit() {
    await this.fetchData();
  }

  async fetchData() {
    const { data, error } = await this.supabase
    .from('locations').select('*');
    if (error) {
      this.country_name = data || [];
    }
  }

  async onSearch(){
    if (this.searchQuery.trim().length === 0) {
      this.country_name = [];
      return;
    }
    try {
      this.country_name = await this.supabaseService.searchItems(this.searchQuery);
    }
    catch (error) {
      console.error('Search error:', error)
    }
  }

  goToSearch(){
    this.navCtrl.back();
  }

}
