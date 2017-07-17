import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['../../public/css/formmain.css']
})
export class ConfirmDialogComponent implements OnInit {

  confirmDialog = {
    display: true,
    text: '确定要删除吗？',
    setText: (text) => {
      this.confirmDialog.text = text;
    },
    open: (text, status) => {
      this.confirmDialog.setText(text);
      this.confirmDialog.display = true;
    },
    close: () => {
      this.confirmDialog.display = false;
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
