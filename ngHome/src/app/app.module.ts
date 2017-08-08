import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Title } from '@angular/platform-browser';
import { BlogSidebarComponent } from './blog-sidebar/blog-sidebar.component';
import { BlogHeaderComponent } from './blog-header/blog-header.component';
import { BlogFooterComponent } from './blog-footer/blog-footer.component';
import { PostmainComponent } from './postmain/postmain.component';
import { CategoriesComponent } from './categories/categories.component';
import { ArchivesComponent } from './archives/archives.component';
import { TagsComponent } from './tags/tags.component';
import { AboutComponent } from './about/about.component';
import { PostComponent } from './post/post.component';
import { PageComponent } from './page/page.component';
import { LoadingAnimateComponent } from './loading-animate/loading-animate.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';

import { DataService } from './share/data.service';

@NgModule({
  declarations: [
    AppComponent,
    BlogSidebarComponent,
    BlogHeaderComponent,
    BlogFooterComponent,
    PostmainComponent,
    CategoriesComponent,
    ArchivesComponent,
    TagsComponent,
    AboutComponent,
    PostComponent,
    PageComponent,
    LoadingAnimateComponent,
    MessageDialogComponent,
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
    },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
