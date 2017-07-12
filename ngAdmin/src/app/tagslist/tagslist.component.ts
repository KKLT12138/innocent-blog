import { Component, OnInit, ViewChild } from '@angular/core';

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
