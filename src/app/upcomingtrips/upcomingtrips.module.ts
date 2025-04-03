import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingtripsPageRoutingModule } from './upcomingtrips-routing.module';

import { UpcomingtripsPage } from './upcomingtrips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingtripsPageRoutingModule
  ],
})
export class UpcomingtripsPageModule {}
