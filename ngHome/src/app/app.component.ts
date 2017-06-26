import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { CategoryService } from './service/category.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../public/css/index.css',
  ],
  providers: [
    CategoryService
  ]
})
export class AppComponent implements OnInit {
  title = 'app works!';
  public constructor(
    private titleService: Title,
    private categoryService: CategoryService
  ) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit():void {
    this.setTitle("Tianzhen呀");
  }
}
