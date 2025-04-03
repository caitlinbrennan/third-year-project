import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpcomingtripsPage } from './upcomingtrips.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingtripsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingtripsPageRoutingModule {}
