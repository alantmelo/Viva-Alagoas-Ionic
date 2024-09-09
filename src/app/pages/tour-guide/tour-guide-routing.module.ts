import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TourGuidePage } from './tour-guide.page';

const routes: Routes = [
  {
    path: '',
    component: TourGuidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TourGuidePageRoutingModule {}
