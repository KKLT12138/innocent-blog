import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { CategoriesService } from './categories.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { Config } from '../share/config';
import { LoadingAnimateComponent } from '../loading-animate/loading-animate.component';

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
  @ViewChild(LoadingAnimateComponent) loadingAnimateComponent: LoadingAnimateComponent;

  categories: any[] = [
    {
      id: 'loading..',
      categoryName: 'loading..',
      numb: 'loading..',
      percent: 'loading..'
    }
  ];

  curCategory = {
    id: '',
    name: ''
  };

  modal = {
    display: false,
    open: (id: string = '', name: string = '') => {
      this.curCategory.id = id;
      this.curCategory.name = name;
      this.modal.display = true;
      setTimeout(() => {
        this.categoryName.nativeElement.focus();
      }, 100);

    },
    close: () => {
      this.curCategory.id = '';
      this.curCategory.name = '';
      this.modal.display = false;
    }
  };

  mask = {
    display: true
  };

  addModal = {
    btnValue: Config.message.ok,
    reset: () => {
      this.addModal.btnValue = Config.message.ok;
    },
    processing: () => {
      this.addModal.btnValue = Config.message.processing;
    },
    retry: () => {
      this.addModal.btnValue = Config.message.retry;
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
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        datas.forEach( (data, index) => {
          this.categories[index] = {};
          this.categories[index].id = data._id;
          this.categories[index].categoryName = data.category;
        })

      }, error => {
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        this.messageDialogComponent.messageDialog.open(Config.message.getError, 0);
      });
  }

  addCategory() {
    this.addModal.processing();
    return this._categoryService.addCategory(this.curCategory)
      .subscribe(data => {
        if (data.status == 1) {
          this.modal.close();
          this.addModal.reset();
          this.getCategories();
          this.messageDialogComponent.messageDialog.open(data.message, 1);
        } else if (data.status == 0) {
          this.addModal.retry();
          this.messageDialogComponent.messageDialog.open(data.message, 0);
        }
      }, error => {
        this.addModal.retry();
        this.messageDialogComponent.messageDialog.open(`${Config.message.error}，请重试`, 0);
      })
  }

}
