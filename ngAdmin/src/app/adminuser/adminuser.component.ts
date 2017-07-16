import { Component, OnInit } from '@angular/core';

import { AdminuserService } from './adminuser.service';

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
  adminusers: any = [{}];

  constructor(
    private _adminuserService: AdminuserService
  ) { }

  ngOnInit() {
    this.getAdminusers();
  }

  getAdminusers() {
    return this._adminuserService.getAdminusers()
      .subscribe(datas => {
        datas.forEach( (data, index) => {
          this.adminusers[index].id = data.id;
          this.adminusers[index].name = data.name;
          this.adminusers[index].ip = data.ip;
          this.adminusers[index].date = data.date;
          this.adminusers[index].createDate = data.createDate;
        })
      });
  }

}
