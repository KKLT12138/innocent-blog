/* 淡入淡出提示框组件 */
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'loading-animate',
  templateUrl: './loading-animate.component.html',
  styleUrls: ['../../public/css/formmain.css']
})
export class LoadingAnimateComponent implements OnInit {
  loading = {
    display: true
  };

  constructor() { }

  ngOnInit() {
  }

}
