import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OnInit } from '@angular/core';
import { popularPlace, SupabaseService } from '../services/supabase.service';
import { ChangeDetectorRef } from '@angular/core';
import { ListItems } from '../services/supabase.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit{
  places: popularPlace[] = [];
  constructor(private changeDetect: ChangeDetectorRef, private router: Router, private navCtrl: NavController, private supabaseService: SupabaseService) {}

  searchPage() {
    this.router.navigate(['/search']);
  }
  
  async ngOnInit() {
    const result = await this.supabaseService.getPlaces();
    this.places = result ?? [];
  }


  async toggleItem(item: popularPlace) 
  {
    const originalChecked = item.is_completed;
    item.is_completed = !item.is_completed;
  
    // update number checked off immediately - deal with errors later
    this.changeDetect.detectChanges();
  
    const { error } = await this.supabaseService.updatePlaces(item);
  
    // if error updating
    if (error) 
    {
      item.is_completed = originalChecked;
      console.error('Error updating item:', error);
    }
  
    
  }

}
