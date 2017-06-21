import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { PostService } from '../service/post.service';

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
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  id: string = "";
  post: object = {};

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => params["id"])
      .subscribe(id => this.id += id);
    this.post = this.postService.getPostById(this.id);
    // console.log(this.post);
  }

}
