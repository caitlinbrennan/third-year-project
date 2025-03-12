import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewListPageRoutingModule } from './new-list-routing.module';
import { NewListPage } from './new-list.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewListPageRoutingModule,
    NewListPage,
    ExploreContainerComponentModule
  ],
})
export class NewListPageModule {}
