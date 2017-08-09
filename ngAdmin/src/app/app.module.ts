import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { LoadingAnimateComponent } from './loading-animate/loading-animate.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PageComponent } from './page/page.component';

import { AddpostEditorDirective } from './addpost/addpost-editor.directive';
import { CheckedAllDirective } from './share/checkedAll.directive';
import { ToDatePipe } from './share/timeToDate.pipe';
import { SelectCheckBoxService } from './share/selectCheckBox.service';
// ng build时，导入CookieOptions
import { CookieService } from 'angular2-cookie';
// import { CookieService, CookieOptions } from 'angular2-cookie';


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
    MessageDialogComponent,
    LoadingAnimateComponent,
    ConfirmDialogComponent,
    PageComponent,
    AddpostEditorDirective,
    CheckedAllDirective,
    ToDatePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    Title,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    SelectCheckBoxService,
    CookieService,
    // CookieOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
