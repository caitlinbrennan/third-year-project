import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListsPageRoutingModule } from './lists-routing.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ListsPage } from './lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListsPageRoutingModule,
    ListsPage,
    ExploreContainerComponentModule
  ],
})
export class ListsPageModule {}
