import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Reader } from '../../public/js/easy-markdown';

@Component({
  selector: 'admin-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: [
    '../../public/css/main.css',
    '../../public/css/formmain.css',
    '../../public/css/addpost.css'
  ]
})
export class AddPostComponent implements OnInit, AfterViewInit {
  @ViewChild('mark') mark;
  @ViewChild('preview') preview;
  activeMode = {
    normal: true,
    split: false,
    enlarge: false
  };

  constructor() { }

  setActiveMode(mode) {
    for (let value in this.activeMode) {
      this.activeMode[value] = false;
      this.activeMode[mode] = true;
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
    let mark = this.mark.nativeElement;
    let preview = this.preview.nativeElement;
    preview.style.height = getComputedStyle(mark).height || this.mark.currentStyle.height;


    let markdown = new Reader("mark");
    markdown.showHtml("preview");
    document.getElementById("mark").addEventListener("keyup", function() {
      let markdown = new Reader("mark");
      markdown.showHtml("preview");
    })
  }
}
