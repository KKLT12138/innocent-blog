import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { CategoriesService } from './categories.service';

@Component({
  selector: 'admin-categorieslist',
  templateUrl: './categorieslist.component.html',
  styleUrls: [
    '../../public/css/main.css',
    '../../public/css/formmain.css',
  ],
  providers: [
    CategoriesService
  ]
})
export class CategoriesListComponent implements OnInit, AfterViewInit {
  @ViewChild('categoryName') categoryName;

  categories = [
    {
      id: 'test',
      categoryName: 'JAVA',
      numb: 15,
      percent: 20
    }
  ];

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

  constructor(
    private _categoryService: CategoriesService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getCategories();
  }

  getCategories() {
    return this._categoryService.getCategories()
      .subscribe(data => {
        data.json();
      });
  }

}
