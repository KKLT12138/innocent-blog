import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Title } from '@angular/platform-browser';
import { BlogSidebarComponent } from './blog-sidebar/blog-sidebar.component';
import { BlogHeaderComponent } from './blog-header/blog-header.component';
import { BlogFooterComponent } from './blog-footer/blog-footer.component';
import { PostmainComponent } from './postmain/postmain.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogSidebarComponent,
    BlogHeaderComponent,
    BlogFooterComponent,
    PostmainComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
