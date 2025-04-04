import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

interface YourTableData{
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ListsPage implements OnInit {
  lists: any[] = [];
  newItem: any[] = [];
  
  private supabase: SupabaseClient

  constructor(private router: Router, private navCtrl: NavController, private supabaseService: SupabaseService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  ngOnInit() {
  }

  getListsByUser(userId: string) {
    return this.supabase.from('lists').select('').eq('user_id', userId);
  }

  goBack(){
    this.navCtrl.back();
  }
}
