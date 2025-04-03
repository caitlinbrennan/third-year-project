import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtripsPage } from './addtrips.page';

const routes: Routes = [
  {
    path: '',
    component: AddtripsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtripsPageRoutingModule {}
