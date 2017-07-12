import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'admin-categorieslist',
  templateUrl: './categorieslist.component.html',
  styleUrls: [
    '../../public/css/main.css',
    '../../public/css/formmain.css',
  ]
})
export class CategoriesListComponent implements OnInit {
  @ViewChild('categoryName') categoryName;

  modal = {
    display: false,
    open: () => {
      this.modal.display = true;
      setTimeout(() => {
        this.categoryName.nativeElement.focus();
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
