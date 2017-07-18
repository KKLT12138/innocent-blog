import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { CategoriesService } from './categories.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { Config } from '../share/config';
import { LoadingAnimateComponent } from '../loading-animate/loading-animate.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
  @ViewChild(ConfirmDialogComponent) confirmDialogComponent: ConfirmDialogComponent;

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
      this.addModal.reset();
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

  selectedCheckBox = [];

  constructor(
    private _categoryService: CategoriesService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  ngAfterViewInit() {
    this.getCategories();
  }

  /* 获取分类列表 */
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

  /* 新增、修改分类 */
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

  /* 批量删除分类 */
  delCategories() {
    if (this.selectedCheckBox.length == 0) {
      this.messageDialogComponent.messageDialog.open('请选择要删除的项目', 0);
    } else {
      this.confirmDialogComponent.confirmDialog.open('确定要删除' + this.selectedCheckBox.length + '个分类吗？', this.selectedCheckBox)
    }

  }

  /* 整理复选框，将选中的项目id推入数组 */
  selectCheckBox(checked: boolean, value: string) {
    let index: number = this.selectedCheckBox.indexOf(value);
    if (checked) {
      if (index < 0) {
        this.selectedCheckBox.push(value);
      }
    } else {
      if (index > -1) {
        this.selectedCheckBox = this.selectedCheckBox.filter((curValue, index) => {
          return curValue != value;
        })
      }
    }
  }

  /* 全选、清空复选框 */
  selectAllCheckBox(checked: boolean) {
    this.selectedCheckBox = [];
    if (checked) {
      this.categories.forEach((category, index) => {
        this.selectedCheckBox.push(category.id)
      })
    }
  }

  /* 删除单条分类记录 */
  delCategory(event: any) {
    this.confirmDialogComponent.confirmDialog.processing();
    return this._categoryService.delCategory(event)
      .subscribe(data => {
        if (data.status == 1) {
          this.confirmDialogComponent.confirmDialog.close();
          this.confirmDialogComponent.confirmDialog.reset();
          if (event instanceof Array) {
            for (let i = 0; i < event.length; i++) {
              for (let j = 0; j < this.categories.length; j++) {
                if (event.indexOf(this.categories[j].id) > -1) {
                  this.categories.splice(j, 1);
                }
              }
            }
          } else {
            this.categories.forEach( (category, index) => {
              if (category.id == (<any>event).id) {
                this.categories.splice(index, 1);
              }
            });
          }

          this.messageDialogComponent.messageDialog.open(data.message, 1);
        } else if (data.status == 0) {
          this.confirmDialogComponent.confirmDialog.retry();
          this.messageDialogComponent.messageDialog.open(data.message, 0);
        }
      }, error => {
        this.confirmDialogComponent.confirmDialog.retry();
        this.messageDialogComponent.messageDialog.open(`${Config.message.error}，请重试`, 0);
      })
  }


}
