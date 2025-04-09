import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';
import { FormsModule } from '@angular/forms';
import { SupabaseClient, createClient} from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-addtrips',
  templateUrl: './addtrips.page.html',
  styleUrls: ['./addtrips.page.scss'],
  imports: [IonicModule, FormsModule]
})
export class AddtripsPage implements OnInit {

  constructor(private navCtrl: NavController, private supabase: SupabaseService, private router: Router) { }

  ngOnInit() {
  }

  userId: string="";
  currentTimestamp = new Date().toISOString();
  countryName: string="";
  tripDate: string="";
  flightInfo: string="";
  lists: string="";
  tripDesc: string="";
  tripName: string="";
  id: string="";
  

  async addTrip(){
    const user = await this.supabase.getUser();
    if (!user) {
      console.error('User not logged in');
      return;
    }

    const trips = {
      user_id: user.id,
      created_at: new Date().toISOString(),
      country_name: this.countryName,
      date: this.tripDate,
      flight_info: this.flightInfo,
      lists: this.lists,
      description: this.tripDesc,
      trip_name: this.tripName
    };

    const response = await this.supabase.addTrip(trips);
    if (response.error) {
      console.error('Failed to add trip:', response.error);
    }
    else {
      console.log('Trip added:', response.data);
    }
  }
  goBack(){
    this.navCtrl.back();
  }
}
