import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeachPage } from './beach.page';

const routes: Routes = [
  {
    path: '',
    component: BeachPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeachPageRoutingModule {}
