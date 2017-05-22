import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AdminSideMenuComponent } from './admin-sidemenu/admin-sidemenu.component';
import { AdminMainComponent } from './adminmain/adminmain.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminSideMenuComponent,
    AdminMainComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
