import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';

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
  newList: string = '';

  constructor(private router: Router, private navCtrl: NavController, private supabaseService: SupabaseService) { }

  async ngOnInit() {
    this.loadLists();
  }
  async loadLists(){
    this.lists = (await this.supabaseService.getLists())!;
  }
  async addList() {
    if (this.newList.trim()) {
      await this.supabaseService.addList(this.newList);
      this.newList = '';
      this.loadLists();
    }
  }

  async toggleCompleted(todo: any) {
    await this.supabaseService.updateList(todo.id, !todo.is_completed);
    this.loadLists();
  }

  async deleteTodo(id: string) {
    await this.supabaseService.deleteList(id);
    this.loadLists();
  }

  goBack(){
    this.navCtrl.back();
  }
}
