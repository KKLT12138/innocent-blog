import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { CategoriesService } from './categories.service';
import {MessageDialogComponent} from "../message-dialog/message-dialog.component";

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
  @ViewChild(MessageDialogComponent) messageDialogComponent: MessageDialogComponent;

  categories: any[] = [
    {
      id: 'loading..',
      categoryName: 'loading..',
      numb: 'loading..',
      percent: 'loading..'
    }
  ];

  curCategory = {
    name: ''
  };

  modal = {
    display: false,
    open: () => {
      this.modal.display = true;
      setTimeout(() => {
        this.categoryName.nativeElement.focus();
      }, 100);

    },
    close: () => {
      this.curCategory.name = '';
      this.modal.display = false;
    }
  };

  constructor(
    private _categoryService: CategoriesService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  ngAfterViewInit() {

  }

  getCategories() {
    return this._categoryService.getCategories()
      .subscribe(datas => {
        datas.forEach( (data, index) => {
          this.categories[index] = {};
          this.categories[index].id = data._id;
          this.categories[index].categoryName = data.category;
        })

      });
  }

  addCategory() {
    return this._categoryService.addCategory(this.curCategory)
      .subscribe(data => {
        if (data.status == 1) {
          this.modal.close();
          this.getCategories();
          this.messageDialogComponent.messageDialog.text = data.message;
          this.messageDialogComponent.messageDialog.open();
          this.messageDialogComponent.messageDialog.setClass(1);
        } else if (data.status == 0) {
          this.messageDialogComponent.messageDialog.text = data.message;
          this.messageDialogComponent.messageDialog.open();
          this.messageDialogComponent.messageDialog.setClass(0);
        }
      })
  }

}
