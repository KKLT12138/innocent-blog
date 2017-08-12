import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PostListService } from './postlist.service';
import { Config } from '../share/config';

import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { LoadingAnimateComponent } from '../loading-animate/loading-animate.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SelectCheckBoxService } from '../share/selectCheckBox.service';

@Component({
  selector: 'admin-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: [
    '../../public/css/main.css',
    '../../public/css/formmain.css'
  ],
  providers: [
    PostListService
  ]
})
export class PostListComponent implements OnInit {
  @ViewChild(MessageDialogComponent) messageDialogComponent: MessageDialogComponent;
  @ViewChild(LoadingAnimateComponent) loadingAnimateComponent: LoadingAnimateComponent;
  @ViewChild(ConfirmDialogComponent) confirmDialogComponent: ConfirmDialogComponent;

  posts: any[] = [
    {
      id: 'loading..',
      title: 'loading..',
      author: 'loading..',
      category: {},
      tags: '',
      order: 'loading..',
      commentNum: 'loading..',
      data: 'loading..',
      reading: 'loading..',
      content: 'loading..'
    }
  ];

  curPost = {
    id: '',
    title: ''
  };

  mask = {
    display: true
  };

  checkBoxService = this.selectCheckBoxService;

  urlQuery;

  pageConfig = {
    totalNum: 0,
    currentPage: 1,
    totalPage: 0,
    pageSize: 10
  };

  constructor(
    private _postListService: PostListService,
    private selectCheckBoxService: SelectCheckBoxService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((param) => {
        param.id ? this.pageConfig.currentPage = +param.id : this.pageConfig.currentPage = 1;
        this.getPosts(this.pageConfig.currentPage, this.pageConfig.pageSize);
      });
  }

  getPosts(currentPage, pageSize) {
    return this._postListService.getPosts(currentPage, pageSize)
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
          let tempArr = [];
          for (let i in data.tags) {
            tempArr.push(data.tags[i].name);
          }
          this.posts[index].tags = tempArr.join(', ');
          this.posts[index].order = data.order;
          this.posts[index].date = data.date;
          this.posts[index].reading = data.reading;
          this.posts[index].content = data.content;
        });
      }, error => {
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        this.messageDialogComponent.messageDialog.open(Config.message.getError, 0);
      });
  }

  getEdit(id) {
    this.router.navigate(['/admin/addpost', id]);
  }

  /* 批量删除文章 */
  delPosts() {
    if (this.checkBoxService.selectedCheckBox.length == 0) {
      this.messageDialogComponent.messageDialog.open('请选择要删除的项目', 0);
    } else {
      this.confirmDialogComponent.confirmDialog.open('确定要删除' + this.checkBoxService.selectedCheckBox.length + '篇文章吗？', this.checkBoxService.selectedCheckBox)
    }
  }

  /* 删除单条文章记录 */
  delPost(event: any) {
    this.confirmDialogComponent.confirmDialog.processing();
    return this._postListService.delPost(event)
      .subscribe(data => {
        if (data.status == 1) {
          this.confirmDialogComponent.confirmDialog.close();
          this.confirmDialogComponent.confirmDialog.reset();
          this.getPosts(this.pageConfig.currentPage, this.pageConfig.pageSize);

          this.messageDialogComponent.messageDialog.open(data.message, 1);
        } else if (data.status == 0) {
          this.confirmDialogComponent.confirmDialog.retry();
          this.messageDialogComponent.messageDialog.open(data.message, 0);
        }
      }, error => {
        this.confirmDialogComponent.confirmDialog.retry();
        this.messageDialogComponent.messageDialog.open(`${Config.message.error}，请重试`, 0);
      })
  }

  getPageData(currentPage) {
    this.router.navigate(['/admin/postlist', currentPage]);
    this.getPosts(this.pageConfig.currentPage, this.pageConfig.pageSize);
  }
}
