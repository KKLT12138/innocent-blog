import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PostService } from '../share/post.service';
import { Config } from '../share/config';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { LoadingAnimateComponent } from '../loading-animate/loading-animate.component';
import { parseTime } from '../share/timeToDate.fn';
import { Reader } from '../../public/js/easy-markdown';

@Component({
  selector: 'app-postmain',
  templateUrl: './postmain.component.html',
  styleUrls: ['../../public/css/postmain.css'],
  providers: [
    PostService
  ]
})
export class PostmainComponent implements OnInit {
  @ViewChild(MessageDialogComponent) messageDialogComponent: MessageDialogComponent;
  @ViewChild(LoadingAnimateComponent) loadingAnimateComponent: LoadingAnimateComponent;

  constructor(
    private _postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  posts: any[] = [
    {
      id: '',
      title: '',
      author: '',
      category: {
        _id: '',
        category: ''
      },
      tags: [],
      date: {
        year: '',
        month: '',
        day: ''
      },
      reading: '',
      content: ''
    }
  ];

  pageConfig = {
    totalNum: 0,
    currentPage: 1,
    totalPage: 0,
    pageSize: 2
  };

  mask = {
    display: true
  };



  ngOnInit() {
    this.activatedRoute.params
      .subscribe((param) => {
        param.id ? this.pageConfig.currentPage = +param.id : this.pageConfig.currentPage = 1;
        this.getPostList(this.pageConfig.currentPage, this.pageConfig.pageSize);
      });
  }

  getPostList(currentPage, pageSize) {
    return this._postService.getPostList(currentPage, pageSize)
      .subscribe(datas => {
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        this.posts = [];
        this.pageConfig.totalNum = datas.totalNum;
        this.pageConfig.totalPage = Math.ceil(this.pageConfig.totalNum / this.pageConfig.pageSize);
        datas.data.forEach( (data, index) => {
          this.posts[index] = {};
          this.posts[index].id = data._id;
          this.posts[index].title = data.title;
          this.posts[index].author = data.author;
          this.posts[index].category = data.category;
          this.posts[index].tags = data.tags;
          this.posts[index].date = parseTime(data.date, 3);
          this.posts[index].reading = data.reading;
          let content = data.content;
          let cutFlag = '<--more-->';
          if (/<--more-->/.test(content)) {
            this.posts[index].content = content.substring(0, content.indexOf(cutFlag));
          } else {
            this.posts[index].content = content;
          }
          content = this.posts[index].content;
          let markdown = new Reader('mark');
          markdown.reader = content;
          let tempStr = "";
          for (let text of markdown.getHtml()) {
            tempStr +=text;
          }
          this.posts[index].content = tempStr;

        })
      }, error => {
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        this.messageDialogComponent.messageDialog.open(Config.message.getError, 0);
      });
  }

  getPageData(currentPage) {
    this.router.navigate(['/home', currentPage]);
    this.getPostList(this.pageConfig.currentPage, this.pageConfig.pageSize);
  }

}
