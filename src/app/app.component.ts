import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    '../public/css/index.css',
    '../public/css/header.css',
    '../public/css/sidebar.css',
    '../public/css/postmain.css',
    '../public/css/categories.css',
    '../public/css/archives.css',
    '../public/css/tags.css',
    '../public/css/about.css'
  ]
})
export class AppComponent implements OnInit {
  title = 'app works!';
  public constructor(private titleService: Title ) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit():void {
    this.setTitle("Tianzhen呀");
  }
}
