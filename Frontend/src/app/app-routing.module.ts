import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) // Lazy load DashboardModule
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule) // Lazy load LoginModule
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) // Lazy load RegistrationModule
  },
  {
    path:'individual-dashboard',
    loadChildren:()=> import('./individual-dashboard/individual-dashboard.module').then(m=>m.IndividualDashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
