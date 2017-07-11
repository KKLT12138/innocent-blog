import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';

import { Reader } from '../../public/js/easy-markdown';



@Component({
  selector: 'admin-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: [
    '../../public/css/main.css',
    '../../public/css/formmain.css',
    '../../public/css/addpost.css'
  ],
  providers: [

  ]
})
export class AddPostComponent implements OnInit, AfterViewInit {
  @ViewChild('boxLeft') boxLeft;
  @ViewChild('mark') mark;
  @ViewChild('preview') preview;
  activeMode = {
    normal: true,
    split: false,
    enlarge: false
  };
  boxLeftWidth;

  constructor() { }

  setActiveMode(mode) {
    for (let value in this.activeMode) {
      this.activeMode[value] = false;
      this.activeMode[mode] = true;
    }
    if (this.activeMode.enlarge) {
      this.boxLeft.nativeElement.style.width = '100%';
    } else {
      this.boxLeft.nativeElement.style.width = this.boxLeftWidth;
    }
  }

  getEditorMode() {
    return {
      'editor-form-normal': this.activeMode.normal,
      'editor-form-split': this.activeMode.split,
      'editor-form-enlarge': this.activeMode.enlarge
    };
  }



  ngOnInit() {

  }

  ngAfterViewInit() {
    let boxLeft = this.boxLeft.nativeElement;
    this.boxLeftWidth = getComputedStyle(boxLeft).width || boxLeft.currentStyle.width;
    let mark = this.mark.nativeElement;
    let preview = this.preview.nativeElement;
    let pre = preview.getElementsByTagName('pre');
    preview.style.height = getComputedStyle(mark).height || this.mark.currentStyle.height;

    let markdown = new Reader('mark');
    markdown.showHtml('preview');
    document.getElementById('mark').addEventListener('keyup', () => {
      let markdown = new Reader('mark');
      markdown.showHtml('preview');
    });


  }
}
