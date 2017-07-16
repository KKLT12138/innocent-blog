/* 淡入淡出提示框组件 */
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['../../public/css/formmain.css']
})
export class MessageDialogComponent implements OnInit {
  @ViewChild('myMessageDialog') myMessageDialog;

  messageDialogClass = {
    'message-success': false,
    'message-error': false,
  };

  messageDialog = {
    display: false,
    text: 'hello',
    setClass: (status) => {
      status == 1 ? this.messageDialogClass['message-success'] = true : this.messageDialogClass['message-error'] = true;
    },
    open: () => {
      this.messageDialog.display = true;
      this.myMessageDialog.nativeElement.style = 'opacity: 0;filter: alpha(opacity=0);';
      setTimeout(() => {
        this.myMessageDialog.nativeElement.style = 'opacity: 0.8;filter: alpha(opacity=80);';
      }, 10);
      setTimeout(() => {
        this.messageDialog.close();
      }, 2000);
    },
    close: () => {
      this.myMessageDialog.nativeElement.style = 'opacity: 0;filter: alpha(opacity=0);';
      setTimeout(() => {
        this.messageDialogClass['message-success'] = false;
        this.messageDialogClass['message-error'] = false;
        this.messageDialog.display = false;
      }, 1000);
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
