import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    '../public/css/admin/index.css',
    '../public/css/admin/main.css'
  ]
})
export class AppComponent implements OnInit {
  title = 'app works!';

  public constructor(private titleService: Title ) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit():void {
    this.setTitle("博客后台管理系统");
  }
}
