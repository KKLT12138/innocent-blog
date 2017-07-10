import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

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

  constructor() { }

  @ViewChild('mark') mark;

  editorMode = {
    isNormal: true,
    isPreview: false,
    isLarge: false
  };
  setEditorMode() {
    return {
      "editor-form-normal": this.editorMode.isNormal,
    };
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    console.dir(this.mark);
  }
}
