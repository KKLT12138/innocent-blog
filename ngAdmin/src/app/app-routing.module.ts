import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminMainComponent } from './adminmain/adminmain.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminMainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
