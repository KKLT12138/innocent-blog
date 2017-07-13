import { Component, OnInit, ViewChild } from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'admin-tagslist',
  templateUrl: './tagslist.component.html',
  styleUrls: [
    '../../public/css/main.css',
    '../../public/css/formmain.css'
  ]
})
export class TagsListComponent implements OnInit {
  @ViewChild('tagName') tagName;

  tags = [
    {
      id: 'test',
      tagName: 'JavaScript',
      numb: 35,
      percent: 10
    },
    {
      id: 2,
      tagName: 'C++',
      numb: 10,
      percent: 60
    }
  ];

  modal = {
    display: false,
    open: () => {
      this.modal.display = true;
      setTimeout(() => {
        this.tagName.nativeElement.focus();
      }, 100);

    },
    close: () => {
      this.modal.display = false;
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
