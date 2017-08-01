import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    component: AdminMainComponent
  },
  {
    path: 'admin/postlist',
    component: PostListComponent
  },
  {
    path: 'admin/postlist/:id',
    component: PostListComponent
  },
  {
    path: 'admin/addpost',
    component: AddPostComponent
  },
  {
    path: 'admin/addpost/:id',
    component: AddPostComponent
  },
  {
    path: 'admin/categorieslist',
    component: CategoriesListComponent
  },
  {
    path: 'admin/tagslist',
    component: TagsListComponent
  },
  {
    path: 'admin/adminuser',
    component: AdminUserComponent
  },
  {
    path: 'admin/regular',
    component: RegularSettingComponent
  },
  {
    path: 'admin/operation',
    component: OperationComponent
  },
  {
    path: 'admin/friend',
    component: FriendComponent
  },
  {
    path: 'admin/comment',
    component: CommentComponent
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
