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
      category: 'loading..',
      tags: 'loading..',
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

  constructor(
    private _postListService: PostListService,
    private selectCheckBoxService: SelectCheckBoxService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    return this._postListService.getPosts()
      .subscribe(datas => {
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        datas.forEach( (data, index) => {
          this.posts[index] = {};
          this.posts[index].id = data._id;
          this.posts[index].title = data.title;
          this.posts[index].author = data.author;
          this.posts[index].category = data.category;
          this.posts[index].tags = data.tags;
          this.posts[index].order = data.order;
          this.posts[index].date = data.date;
          this.posts[index].reading = data.reading;
          this.posts[index].content = data.content;
        })
      }, error => {
        this.mask.display = false;
        this.loadingAnimateComponent.loading.display = false;
        this.messageDialogComponent.messageDialog.open(Config.message.getError, 0);
      });
  }

  getEdit(id) {
    this.router.navigate(['/admin/addpost', id]);
  }
}
