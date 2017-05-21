import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../public/css/index.css',
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
