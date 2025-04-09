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
  selector: 'app-new-list',
  templateUrl: './new-list.page.html',
  styleUrls: ['./new-list.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class NewListPage implements OnInit {

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

  userId: string="";
  currentTimestamp = new Date().toISOString();
  taskName: string="";
  description: string="";
  isCompleted: string="";
  dueDate: string="";
  id: string="";

  async addLists(){
    const user = await this.supabaseService.getUser();
    if (!user) {
      console.error('User not logged in');
      return;
    }

    const lists = {
      user_id: user.id,
      task_name: this.taskName,
      description: this.description,
      is_completed: this.isCompleted,
      due_date: this.dueDate,
      created_at: new Date().toISOString(),
    };

}
}
