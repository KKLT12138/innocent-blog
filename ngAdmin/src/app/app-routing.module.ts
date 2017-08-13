import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

import { AdminMainComponent } from './adminmain/adminmain.component';
import { PostListComponent } from './postlist/postlist.component';
import { AddPostComponent } from './addpost/addpost.component';
import { CategoriesListComponent } from './categorieslist/categorieslist.component';
import { TagsListComponent } from './tagslist/tagslist.component';
import { AdminUserComponent } from './adminuser/adminuser.component';
import { RegularSettingComponent } from './regularsetting/regularsetting.component';
import { OperationComponent } from './operation/operation.component';
import { FriendComponent } from './friend/friend.component';
import { CommentComponent } from './comment/comment.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminMainComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/postlist',
    component: PostListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/postlist/:id',
    component: PostListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/addpost',
    component: AddPostComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/addpost/:id',
    component: AddPostComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/categorieslist',
    component: CategoriesListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/tagslist',
    component: TagsListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/adminuser',
    component: AdminUserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/regular',
    component: RegularSettingComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/operation',
    component: OperationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/friend',
    component: FriendComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/comment',
    component: CommentComponent,
    canActivate: [AuthGuardService]
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
