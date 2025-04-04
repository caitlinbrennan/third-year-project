import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  constructor(private supabase: SupabaseService) {}
  items: any[] = [];

  addTrip() {

  }

  goToTrip(){

  }

  async ngOnInit() {
    this.items = await this.supabase.getData('upcoming_trips');

    this.supabase.listenForChanges('upcoming_trips', (newItem) => {
      this.items = [newItem, ...this.items];
    });
  }


}
