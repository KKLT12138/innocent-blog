import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { DataService } from '../share/data.service';
import { PostService } from '../share/post.service';
import { parseTime } from '../share/timeToDate.fn';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['../../public/css/post.css'],
  providers: [
    PostService
  ]
})
export class PostComponent implements OnInit {

  constructor(
    private _PostService: PostService,
    private _DataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  id: string = "";
  post = {
    id: '',
    title: '',
    author: '',
    category: '',
    tags: [],
    date: '',
    content: '',
    reading: 0
  };

  neighbors = {
    prevPost: {
      id: '',
      title: ''
    },
    nextPost: {
      id: '',
      title: ''
    }
  };


  ngOnInit() {
    this.activatedRoute.params
      .subscribe((param) => {
        this._PostService.getPost(param.id)
          .subscribe((post) => {
            this.post.id = post.id;
            this.post.title = post.title;
            this.post.author = post.author;
            this.post.category = post.category;
            this.post.tags = post.tags;
            this.post.date = parseTime(post.date);
            this.post.content = post.content;
            this.post.reading = post.reading;
            this._PostService.getPostNeighbors(this.post.id)
              .subscribe((datas) => {
                this.neighbors.prevPost = datas.data.prevPost;
                this.neighbors.nextPost = datas.data.nextPost;
              })
          })
      });

  }

}
