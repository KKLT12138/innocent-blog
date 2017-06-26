import { Component, Input, DoCheck } from '@angular/core';

@Component ({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: [
    '../../public/css/page.css'
  ]
})

export class PageComponent implements DoCheck {

  ngDoCheck() {

  }
}
