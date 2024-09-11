import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/auth/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'accommodations',
    loadChildren: () => import('./pages/accommodations/accommodations.module').then( m => m.AccommodationsPageModule)
  },
  {
    path: 'accommodation/:id',
    loadChildren: () => import('./pages/accommodation/accommodation.module').then( m => m.AccommodationPageModule)
  },
  {
    path: 'tour/:id',
    loadChildren: () => import('./pages/tour/tour.module').then( m => m.TourPageModule)
  },
  {
    path: 'beach/:id',
    loadChildren: () => import('./pages/beach/beach.module').then( m => m.BeachPageModule)
  },
  {
    path: 'store/:id',
    loadChildren: () => import('./pages/store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'service/:id',
    loadChildren: () => import('./pages/service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'restaurant/:id',
    loadChildren: () => import('./pages/restaurant/restaurant.module').then( m => m.RestaurantPageModule)
  },
  {
    path: 'event/:id',
    loadChildren: () => import('./pages/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'transfer/:id',
    loadChildren: () => import('./pages/transfer/transfer.module').then( m => m.TransferPageModule)
  },
  {
    path: 'tour-guide/:id',
    loadChildren: () => import('./pages/tour-guide/tour-guide.module').then( m => m.TourGuidePageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
