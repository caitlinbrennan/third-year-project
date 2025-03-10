import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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

  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.back();
  }
}
