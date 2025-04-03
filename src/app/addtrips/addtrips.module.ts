import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtripsPageRoutingModule } from './addtrips-routing.module';

import { AddtripsPage } from './addtrips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtripsPageRoutingModule
  ],
})
export class AddtripsPageModule {}
