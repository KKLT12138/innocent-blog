import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    '../public/css/index.css',
    '../public/css/main.css'
  ],
  providers: [
  ]
})
export class AppComponent implements OnInit {
  @ViewChild(MessageDialogComponent) messageDialogComponent: MessageDialogComponent;
  title = 'app works!';
  username = '';

  public constructor(
    private titleService: Title,
    private _cookieService: CookieService,
  ) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit(): void {
    this.setTitle('博客后台管理系统');
    this.username = this._cookieService.get('username');
  }

  logout() {
    this._cookieService.remove('username');
    this._cookieService.remove('token');
    this.messageDialogComponent.messageDialog.open(`退出成功,2秒后自动跳转`, 1);
    setTimeout(() => {
      window.location.href = '/admin/login';
    }, 2000);
  }
}
