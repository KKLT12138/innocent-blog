import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';

import { Reader } from '../../public/js/easy-markdown';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { Config } from '../share/config';
import { CategoriesService } from '../categorieslist/categories.service';

@Component({
  selector: 'admin-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: [
    '../../public/css/main.css',
    '../../public/css/formmain.css',
    '../../public/css/addpost.css'
  ],
  providers: [
    CategoriesService
  ]
})
export class AddPostComponent implements OnInit, AfterViewInit {
  @ViewChild(MessageDialogComponent) messageDialogComponent: MessageDialogComponent;
  @ViewChild('boxLeft') boxLeft;
  @ViewChild('mark') mark;
  @ViewChild('preview') preview;
  @ViewChild('postForm') postForm;

  @ViewChild('categorySelect') categorySelect;

  isUpdate = false;

  activeMode = {
    normal: true,
    split: false,
    enlarge: false
  };
  boxLeftWidth;

  editorForm = {
    title: '',
    author: '',
    category: '',
    tag: '',
    order: '0',
    date: this.getNowDate(),
  };

  categories: any[] = [
    {
      id: 'loading..',
      categoryName: 'loading..',
    }
  ];

  constructor(
    private _categoryService: CategoriesService,
  ) { }

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
    this.getCategories();
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

    let categorySelect = this.categorySelect.nativeElement;

    console.dir(this.postForm)
  }

  getCategories() {
    return this._categoryService.getCategories()
      .subscribe(datas => {
        datas.forEach( (data, index) => {
          this.categories[index] = {};
          this.categories[index].id = data._id;
          this.categories[index].categoryName = data.category;
        })

        if (this.isUpdate) {

        } else {
          setTimeout(()=>{
            this.editorForm.category = this.categorySelect.nativeElement[0].value;
          }, 10)

        }

      }, error => {
        this.messageDialogComponent.messageDialog.open('分类信息读取失败', 0);
      });
  }

  getNowDate() {
    let date = new Date();
    let year = date.getFullYear() + '';
    let month = date.getMonth() + 1 + '';
    let day = date.getDate() + '';

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  addPost() {
    if (this.postForm.valid) {
      console.dir(this.postForm.value)
    }
  }
}
