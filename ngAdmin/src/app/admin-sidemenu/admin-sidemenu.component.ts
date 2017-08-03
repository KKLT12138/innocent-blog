import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-sidemenu',
  templateUrl: './admin-sidemenu.component.html',
  styleUrls: [
    '../../public/css/index.css',
    '../../public/css/main.css'
  ],
/*  animations: [
    trigger('slide', [
      state('slideUp', style({
        'height': '0'
      }))
    ])
  ]*/
})
export class AdminSideMenuComponent implements OnInit {
  menuState = {
    post: 'slideDown',
    user: 'slideUp',
    site: 'slideUp'
  };

  constructor() { }

  ngOnInit() {
  }

}
