import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { supabase } from '../services/supabaseClient';
import { ListItems, SupabaseService } from '../services/supabase.service';
import { ChangeDetectorRef } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

type Categories = 
  | 'Food'
  | 'Clothes'
  | 'Travel'
  | 'Activities'
  | 'Health'
  | 'Other';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: false,
  providers: [TitleCasePipe],
})
export class Tab5Page implements OnInit{
  categories: Record<Categories, boolean> = {
    Food: false,
    Clothes: false,
    Travel: false,
    Activities: false,
    Health: false,
    Other: false,
  };

  itemsByList: Record<Categories, ListItems[]> = {
    Food: [],
    Clothes: [],
    Travel: [],
    Activities: [],
    Health: [],
    Other: [],
  };

  constructor(private changeDetect: ChangeDetectorRef, private supabaseService: SupabaseService,private router: Router, private alertCtrl: AlertController) {}

  titleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }
  

  async ngOnInit() {
      await this.loadShoppingItems();
  }

  goToLists(){
    this.router.navigate(['/lists']);
  }

  async toggleList(categories: Categories) {

    this.categories[categories] = !this.categories[categories];
  }
  async loadShoppingItems() 
  {
    const items = await this.supabaseService.getLists();

    // if items are there
    if (items) 
      {
      // group by category
        for (const categories in this.itemsByList) 
        {
        this.itemsByList[categories as Categories] = items.filter(
          (item) => item.categories === categories
        );
      }
    }
  }

  async addItem(categories: Categories) {
    const alert = await this.alertCtrl.create({
      header: `Add item to ${categories}`,
      inputs: [{
        name: 'name',
        type: 'text',
        placeholder: 'Item',
      },
    ],
    buttons: [{
      text: 'Cancel',
      role: 'Cancel',
    },
    {
      text: 'Add',
      handler: async (data) => {
        const name = data.name?.trim();

        if(!name) {
          this.supabaseService.createNotice('Enter valid name');
          return false;
        }

        const addItem: ListItems =
        {
          task_name: data.name,
          is_completed: false,
          categories,
        };

        const {data: added, error} = await this.supabaseService.addListItem(addItem);
        if(error) {
          this.supabaseService.createNotice('error adding item');
          return false;
        }
        else if (added) {
          console.log('itemsByList', this.itemsByList);
          console.log('categories', this.categories);

          this.loadShoppingItems();
          return true;
        }
        return false;
      },
    },
  ],
    })

    await alert.present();

  }

async deleteItem(catergories: Categories, itemId: string) 
{
  const { error } = await this.supabaseService.deleteListItem(itemId);
  // if no error, continue
  if (!error) 
  {
    this.itemsByList[catergories] = this.itemsByList[catergories].filter
    (
      (item) => item.id !== itemId
    );
  }
}

// check off / on item
async toggleItem(item: ListItems) 
{
  const originalChecked = item.is_completed;
  item.is_completed = !item.is_completed;

  // update number checked off immediately - deal with errors later
  this.changeDetect.detectChanges();

  const { error } = await this.supabaseService.updateShoppingItem(item);

  // if error updating
  if (error) 
  {
    item.is_completed = originalChecked;
    console.error('Error updating item:', error);
  }

  
}

getCompletedItemsCount(categories: Categories): number 
  {
    const items = this.itemsByList[categories];
    // where checked = true
    return items.filter(item => item.is_completed).length;
  }
  
  // get total number of items
  getTotalItemsCount(category: Categories): number 
  {
    const items = this.itemsByList[category];
    return items.length;
  }

  castCategory(value: string): Categories 
  {
    return value as Categories;
  }

  goToAccountPage() 
  {
    this.router.navigate(['/account']);
  }

}