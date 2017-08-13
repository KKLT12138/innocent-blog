import { Component, OnInit, ViewChild } from '@angular/core';

import { FriendService } from './friend.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { Config } from '../share/config';
import { LoadingAnimateComponent } from '../loading-animate/loading-animate.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SelectCheckBoxService } from '../share/selectCheckBox.service';

@Component({
  selector: 'admin-friend',
  templateUrl: './friend.component.html',
  styleUrls: [
    '../../public/css/main.css',
    '../../public/css/formmain.css'
  ],
  providers: [
    FriendService
  ]
})
export class FriendComponent implements OnInit {
  @ViewChild('friendName') friendName;
  @ViewChild(MessageDialogComponent) messageDialogComponent: MessageDialogComponent;
  @ViewChild(LoadingAnimateComponent) loadingAnimateComponent: LoadingAnimateComponent;
  @ViewChild(ConfirmDialogComponent) confirmDialogComponent: ConfirmDialogComponent;

  friends: any[] = [
    {
      id: 'loading..',
      name: 'loading..',
      url: 'loading..',
      order: 'loading'
    }
  ];

  curFriend = {
    id: '',
    name: '',
    url: '',
    order: ''
  };

  modal = {
    display: false,
    open: (id: string = '', name: string = '', url: string = '', order: string = '0') => {
      this.curFriend.id = id;
      this.curFriend.name = name;
      this.curFriend.url = url;
      this.curFriend.order = order;
      this.modal.display = true;
      setTimeout(() => {
        this.friendName.nativeElement.focus();
      }, 100);

    },
    close: () => {
      this.curFriend.id = '';
      this.curFriend.name = '';
      this.curFriend.url = '';
      this.curFriend.order = '';
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

  checkBoxService = this.selectCheckBoxService;

  constructor(
    private _friendService: FriendService,
    private selectCheckBoxService: SelectCheckBoxService
  ) { }

  ngOnInit() {
    this.checkBoxService.clearCheckBox();
    this.getFriends();
  }

  getFriends() {
    let postNum: number;
    return this._friendService.getFriends()
      .subscribe(datas => {
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        datas.forEach( (data, index) => {
          this.friends[index] = {};
          this.friends[index].id = data._id;
          this.friends[index].name = data.name;
          this.friends[index].url = data.url;
          this.friends[index].order = data.order;
        });
      }, error => {
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        this.messageDialogComponent.messageDialog.open(Config.message.getError, 0);
      });
  }

  addFriend() {
    this.addModal.processing();
    return this._friendService.addFriend(this.curFriend)
      .subscribe(data => {
        if (data.status == 1) {
          this.modal.close();
          this.addModal.reset();
          this.getFriends();
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

  delFriends() {
    if (this.checkBoxService.selectedCheckBox.length == 0) {
      this.messageDialogComponent.messageDialog.open('请选择要删除的项目', 0);
    } else {
      this.confirmDialogComponent.confirmDialog.open('确定要删除' + this.checkBoxService.selectedCheckBox.length + '个分类吗？', this.checkBoxService.selectedCheckBox)
    }
  }

  delFriend(event: any) {
    this.confirmDialogComponent.confirmDialog.processing();
    return this._friendService.delFriend(event)
      .subscribe(data => {
        if (data.status == 1) {
          this.confirmDialogComponent.confirmDialog.close();
          this.confirmDialogComponent.confirmDialog.reset();
          if (event instanceof Array) {
            for (let i = 0; i < event.length; i++) {
              for (let j = 0; j < this.friends.length; j++) {
                if (event.indexOf(this.friends[j].id) > -1) {
                  this.friends.splice(j, 1);
                }
              }
            }
          } else {
            this.friends.forEach( (category, index) => {
              if (category.id == (<any>event).id) {
                this.friends.splice(index, 1);
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
