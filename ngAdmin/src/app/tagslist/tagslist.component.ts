import { Component, OnInit, ViewChild } from '@angular/core';

import { TagService } from './tag.service';
import { Config } from '../share/config';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { LoadingAnimateComponent } from '../loading-animate/loading-animate.component';

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

  constructor(
    private _tagService: TagService
  ) { }

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    return this._tagService.getTags()
      .subscribe(datas => {
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        datas.forEach( (data, index) => {
          this.tags[index] = {};
          this.tags[index].id = data._id;
          this.tags[index].tagName = data.name;
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

}
