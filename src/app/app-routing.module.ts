import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostmainComponent } from './postmain/postmain.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: PostmainComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [
  ]
})
export class AppRoutingModule { }
