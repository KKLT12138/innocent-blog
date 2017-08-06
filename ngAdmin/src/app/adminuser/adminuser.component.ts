import { Component, OnInit, ViewChild } from '@angular/core';

import { AdminuserService } from './adminuser.service';
import { Config } from '../share/config';
import { LoadingAnimateComponent } from '../loading-animate/loading-animate.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'admin-user',
  templateUrl: './adminuser.component.html',
  styleUrls: [
    '../../public/css/main.css',
    '../../public/css/formmain.css'
  ],
  providers: [
    AdminuserService
  ]
})
export class AdminUserComponent implements OnInit {
  @ViewChild(LoadingAnimateComponent) loadingAnimateComponent: LoadingAnimateComponent;
  @ViewChild(MessageDialogComponent) messageDialogComponent: MessageDialogComponent;
  @ViewChild('keyName') keyName;

  adminusers: any = [];

  mask = {
    display: true
  };

  key = {
    name: '',
    password: '',
    pwd: ''
  };

  modal = {
    display: false,
    open: () => {
      this.modal.display = true;
      setTimeout(() => {
        this.keyName.nativeElement.focus();
      }, 100);

    },
    close: () => {
      this.key.name = '';
      this.key.password = '';
      this.key.pwd = '';
      this.modal.display = false;
    }
  };

  addModal = {
    btnValue: '生成',
    reset: () => {
      this.addModal.btnValue = '生成';
    },
    processing: () => {
      this.addModal.btnValue = Config.message.processing;
    },
    retry: () => {
      this.addModal.btnValue = Config.message.retry;
    }
  };

  constructor(
    private _adminuserService: AdminuserService
  ) { }

  ngOnInit() {
    this.getAdminusers();
  }

  getAdminusers() {
    return this._adminuserService.getAdminusers()
      .subscribe(datas => {
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        datas.forEach( (data, index) => {
          this.adminusers[index] = {};
          this.adminusers[index].id = data.id;
          this.adminusers[index].name = data.name;
          this.adminusers[index].ip = data.ip;
          this.adminusers[index].date = data.date;
          this.adminusers[index].createDate = data.createDate;
        })
      }, error => {
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        this.messageDialogComponent.messageDialog.open(Config.message.getError, 0);
      });
  }

  getKey() {
    this._adminuserService.getKey(this.key.name)
      .subscribe((data) => {
        this.key.password = data.key.password;
        this.key.pwd = data.key.pwd;
      })
  }

}
