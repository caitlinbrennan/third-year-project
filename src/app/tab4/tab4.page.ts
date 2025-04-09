import { Component, OnInit } from '@angular/core';
import { popularPlace, SupabaseService } from '../services/supabase.service';
import { ChangeDetectorRef } from '@angular/core';
import { bookmarks } from '../services/supabase.service';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false,
})

export class Tab4Page implements OnInit{
  places: bookmarks[] = [];
  userId: string="";
  countryName: string="";

  constructor(private supabase: SupabaseService, private changeDetect: ChangeDetectorRef) {}

  async ngOnInit() {
    const result = await this.supabase.getBookmarks();
  }

  async toggleItem(item: bookmarks) 
  {
    const originalChecked = item.is_completed;
    item.is_completed = !item.is_completed;
  
    // update number checked off immediately - deal with errors later
    this.changeDetect.detectChanges();
  
    const { error } = await this.supabase.updateBookmarks(item);
  
    // if error updating
    if (error) 
    {
      item.is_completed = originalChecked;
      console.error('Error updating item:', error);
    }
  
    
  }
  
}
