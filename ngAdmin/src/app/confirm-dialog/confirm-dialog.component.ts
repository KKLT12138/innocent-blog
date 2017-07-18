import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Config } from '../share/config';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['../../public/css/formmain.css']
})
export class ConfirmDialogComponent implements OnInit {
  @Output() operateArg: EventEmitter<object> = new EventEmitter<object>();

  confirmDialog = {
    display: false,
    text: '',
    btnValue: Config.message.ok,
    operateArg: {},
    setText: (text) => {
      this.confirmDialog.text = text;
    },
    open: (text, operateArg) => {
      this.confirmDialog.setText(text);
      this.confirmDialog.operateArg = operateArg;
      this.confirmDialog.display = true;
    },
    close: () => {
      this.confirmDialog.display = false;
      this.confirmDialog.reset();
    },
    operate: () => {
      this.operateArg.emit(this.confirmDialog.operateArg);
    },
    reset: () => {
      this.confirmDialog.btnValue = Config.message.ok;
    },
    processing: () => {
      this.confirmDialog.btnValue = Config.message.processing;
    },
    retry: () => {
      this.confirmDialog.btnValue = Config.message.retry;
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
