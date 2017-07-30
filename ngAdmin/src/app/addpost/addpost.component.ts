import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';

import { Reader } from '../../public/js/easy-markdown';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { Config } from '../share/config';
import { CategoriesService } from '../categorieslist/categories.service';
import { TagService } from '../tagslist/tag.service';
import { AddPostService } from './addpost.service';

@Component({
  selector: 'admin-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: [
    '../../public/css/main.css',
    '../../public/css/formmain.css',
    '../../public/css/addpost.css'
  ],
  providers: [
    CategoriesService,
    TagService,
    AddPostService
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

  markdown: any;

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
    tag: [],
    order: '0',
    date: this.getNowDate(),
  };

  formData = {
    id: '',
    title: '',
    author: '',
    category: '',
    tag: [],
    order: '0',
    date: 0,
    content: ''
  };

  categories: any[] = [
    {
      id: 'loading..',
      categoryName: 'loading..',
    }
  ];

  tags: any[] = [];

  inputTags: any[] = [];


  constructor(
    private _categoryService: CategoriesService,
    private _tagService: TagService,
    private _addPostService: AddPostService
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
    this.getTags();
  }

  ngAfterViewInit() {
    let boxLeft = this.boxLeft.nativeElement;
    this.boxLeftWidth = getComputedStyle(boxLeft).width || boxLeft.currentStyle.width;
    let mark = this.mark.nativeElement;
    let preview = this.preview.nativeElement;
    let pre = preview.getElementsByTagName('pre');
    preview.style.height = getComputedStyle(mark).height || this.mark.currentStyle.height;

    this.markdown = new Reader('mark');
    this.markdown.showHtml('preview');
    document.getElementById('mark').addEventListener('keyup', () => {
      this.markdown = new Reader('mark');
      this.markdown.showHtml('preview');
    });

  }

  getCategories() {
    return this._categoryService.getCategories()
      .subscribe(datas => {
        datas.forEach( (data, index) => {
          this.categories[index] = {};
          this.categories[index].id = data._id;
          this.categories[index].categoryName = data.category;
        });

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

  getTags() {
    return this._tagService.getTags()
      .subscribe(datas => {
        datas.forEach( (data, index) => {
          this.tags[index] = {};
          this.tags[index].id = data._id;
          this.tags[index].tagName = data.name;
          this.tags[index].isExist = false;
        })
      }, error => {
        this.messageDialogComponent.messageDialog.open('标签信息读取失败', 0);
      });
  }


  searchTags(inputString) {
    let inputTagsOrigin = inputString.trim().split(',');
    inputTagsOrigin.forEach((value, index) => {
      if (value == '') {
        inputTagsOrigin.splice(index, 1);
      }
    });
    let uniqueObj = {};
    let inputTags = [];
    inputTagsOrigin.forEach((value, index) => {
      if (!uniqueObj[value]) {
        inputTags.push(value);
        uniqueObj[value] = 1;
      }
    });
    this.inputTags = [];
    inputTags.forEach((tagName, index) => {
      this.inputTags[index] = {};
      this.inputTags[index].id = '';
      this.inputTags[index].tagName = tagName;
      this.inputTags[index].isExist = false;
    });
    for (let i in this.inputTags) {
      for (let j in this.tags) {
        let reg = new RegExp('^' + this.tags[j].tagName.replace(/([\+\.\-\_\#])/g, "\\$1") + '$','i');
        if (this.inputTags[i].tagName.match(reg)) {
          this.inputTags[i].id = this.tags[j].id;
          this.inputTags[i].isExist = true;
        }
      }
    }
    console.log(this.inputTags);
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
      this.formData = {
        id: this.formData.id,
        title: this.postForm.value.title,
        author: this.postForm.value.author,
        category: this.postForm.value.category,
        tag: this.inputTags,
        order: this.postForm.value.order,
        date: new Date(this.postForm.value.date.replace(/\-/g, '/')).getTime(),
        content: this.markdown.readerTransfer
      };
      this._addPostService.addPost(this.formData)
        .subscribe(data => {
          if (data.status == 1) {
            this.messageDialogComponent.messageDialog.open(data.message, 1);
          } else if (data.status == 0) {
            this.messageDialogComponent.messageDialog.open(data.message, 0);
          }
        }, error => {
          this.messageDialogComponent.messageDialog.open(`${Config.message.error}，请重试`, 0);
        })
    } else {
      this.messageDialogComponent.messageDialog.open('请正确填写表单', 0);
    }
  }
}
