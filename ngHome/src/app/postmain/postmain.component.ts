import { Component, OnInit } from '@angular/core';

import { PostService } from '../share/post.service';

@Component({
  selector: 'app-postmain',
  templateUrl: './postmain.component.html',
  styleUrls: ['../../public/css/postmain.css'],
  providers: [
    PostService
  ]
})
export class PostmainComponent implements OnInit {

  constructor(private postService: PostService) { }

  posts = this.postService.getPostList();

  ngOnInit() {
    // console.log(this.postService.getPostList());
  }

}
