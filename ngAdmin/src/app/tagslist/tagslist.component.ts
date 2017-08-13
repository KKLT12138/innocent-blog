import { Component, OnInit, ViewChild } from '@angular/core';

import { TagService } from './tag.service';
import { Config } from '../share/config';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { LoadingAnimateComponent } from '../loading-animate/loading-animate.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SelectCheckBoxService } from '../share/selectCheckBox.service';

@Component({
  selector: 'admin-tagslist',
  templateUrl: './tagslist.component.html',
  styleUrls: [
    '../../public/css/main.css',
    '../../public/css/formmain.css'
  ],
  providers: [
    TagService
  ]
})
export class TagsListComponent implements OnInit {
  @ViewChild('tagName') tagName;
  @ViewChild(MessageDialogComponent) messageDialogComponent: MessageDialogComponent;
  @ViewChild(LoadingAnimateComponent) loadingAnimateComponent: LoadingAnimateComponent;
  @ViewChild(ConfirmDialogComponent) confirmDialogComponent: ConfirmDialogComponent;

  tags: any[] = [
    {
      id: 'loading..',
      tagName: 'loading..',
      numb: 'loading..',
      percent: 'loading'
    }
  ];

  curTag = {
    id: '',
    name: ''
  };

  modal = {
    display: false,
    open: (id: string = '', name: string = '') => {
      this.curTag.id = id;
      this.curTag.name = name;
      this.modal.display = true;
      setTimeout(() => {
        this.tagName.nativeElement.focus();
      }, 100);

    },
    close: () => {
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

  checkBoxService = this.selectCheckBoxService;

  constructor(
    private _tagService: TagService,
    private selectCheckBoxService: SelectCheckBoxService
  ) { }

  ngOnInit() {
    this.checkBoxService.clearCheckBox();
    this.getTags();
  }

  getTags() {
    let postNum: number;
    return this._tagService.getTags()
      .subscribe(datas => {
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        datas.forEach( (data, index) => {
          this.tags[index] = {};
          this.tags[index].id = data._id;
          this.tags[index].tagName = data.name;
          this.tags[index].numb = 0;
          this.tags[index].percent = 0;
        })
        this._tagService.getPostNum()
          .subscribe(data => {
            postNum = data.num;
            this._tagService.getTagInfo()
              .subscribe(datas => {
                let tagsArr = [];
                for (let data of datas.data) {
                  tagsArr.push(...data.tags);
                }
                for (let tag of this.tags) {
                  for (let tagArrElement of tagsArr) {
                    if (tag.id == tagArrElement) {
                      tag.numb++;
                    }
                  }
                }
                for (let tag of this.tags) {
                  tag.percent = (tag.numb / postNum * 100).toFixed(1);
                }
              })
          })
      }, error => {
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        this.messageDialogComponent.messageDialog.open(Config.message.getError, 0);
      });
  }

  addTag() {
    this.addModal.processing();
    return this._tagService.addTag(this.curTag)
      .subscribe(data => {
        if (data.status == 1) {
          this.modal.close();
          this.addModal.reset();
          this.getTags();
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

  delTag(event: any) {
    if (event instanceof Array) {
      for (let id of event) {
        for (let tag of this.tags) {
          if (tag.numb != 0 && id == tag.id) {
            this.messageDialogComponent.messageDialog.open('有包含该标签的文章存在，不能删除', 0);
            return;
          }
        }
      }
    } else {
      for (let tag of this.tags) {
        if (tag.numb != 0 && event.id == tag.id) {
          this.messageDialogComponent.messageDialog.open('有包含该标签的文章存在，不能删除', 0);
          return;
        }
      }
    }
    this.confirmDialogComponent.confirmDialog.processing();
    return this._tagService.delTag(event)
      .subscribe(data => {
        if (data.status == 1) {
          this.confirmDialogComponent.confirmDialog.close();
          this.confirmDialogComponent.confirmDialog.reset();
          if (event instanceof Array) {
            for (let i = 0; i < event.length; i++) {
              for (let j = 0; j < this.tags.length; j++) {
                if (event.indexOf(this.tags[j].id) > -1) {
                  this.tags.splice(j, 1);
                }
              }
            }
          } else {
            this.tags.forEach( (tag, index) => {
              if (tag.id == (<any>event).id) {
                this.tags.splice(index, 1);
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

  /* 批量删除标签 */
  delTags() {
    if (this.selectCheckBoxService.selectedCheckBox.length == 0) {
      this.messageDialogComponent.messageDialog.open('请选择要删除的项目', 0);
    } else {
      this.confirmDialogComponent.confirmDialog.open('确定要删除' + this.selectCheckBoxService.selectedCheckBox.length + '个标签吗？', this.selectCheckBoxService.selectedCheckBox)
    }

  }


}
