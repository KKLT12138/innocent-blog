import { Component, OnInit } from '@angular/core';
import { SlideAnimate } from './slideMenu.animate';

@Component({
  selector: 'admin-sidemenu',
  templateUrl: './admin-sidemenu.component.html',
  styleUrls: [
    '../../public/css/index.css',
    '../../public/css/main.css'
  ],
  animations: [
    SlideAnimate
  ]
})
export class AdminSideMenuComponent implements OnInit {
  menuState = {
    inAnimate: false,
    post: 'slideDown',
    user: 'slideUp',
    site: 'slideUp'
  };

  constructor() { }

  ngOnInit() {
  }

  slideMenu(option) {
    if (this.menuState.inAnimate) {
      return;
    }
    let toggleSlide = (state) => {
      this.menuState[state] == 'slideUp' ? this.menuState[state] = 'slideDown' : this.menuState[state] = 'slideUp';
    };
    switch (option) {
      case 'post':
        toggleSlide(option);
        break;
      case 'user':
        toggleSlide(option);
        break;
      case 'site':
        toggleSlide(option);
        break;
    }

  }

}
