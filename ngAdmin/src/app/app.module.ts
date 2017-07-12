import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AdminSideMenuComponent } from './admin-sidemenu/admin-sidemenu.component';
import { AdminMainComponent } from './adminmain/adminmain.component';
import { LoginComponent } from './login/login.component';
import { PostListComponent } from './postlist/postlist.component';
import { AddPostComponent } from './addpost/addpost.component';
import { CategoriesListComponent } from './categorieslist/categorieslist.component';
import { TagsListComponent } from './tagslist/tagslist.component';
import { AdminUserComponent } from './adminuser/adminuser.component';
import { RegularSettingComponent } from './regularsetting/regularsetting.component';
import { OperationComponent } from './operation/operation.component';
import { FriendComponent } from './friend/friend.component';
import { CommentComponent } from './comment/comment.component';

import { AddpostEditorDirective } from './addpost/addpost-editor.directive';
import { CheckedAllDirective } from './share/checkedAll.directive';


@NgModule({
  declarations: [
    AppComponent,
    AdminSideMenuComponent,
    AdminMainComponent,
    LoginComponent,
    PostListComponent,
    AddPostComponent,
    CategoriesListComponent,
    TagsListComponent,
    AdminUserComponent,
    RegularSettingComponent,
    OperationComponent,
    FriendComponent,
    CommentComponent,
    AddpostEditorDirective,
    CheckedAllDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    Title,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
