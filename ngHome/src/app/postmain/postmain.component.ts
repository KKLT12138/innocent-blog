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

  posts;

  pageConfig = {
    totalNum: 50,
    currentPage: 2,
    totalPage: 5,
    pageSize: 10
  };

  ngOnInit() {
    // console.log(this.postService.getPostList());
  }

  getPageData(currentPage) {
    // this.router.navigate(['/admin/postlist', currentPage]);
    // this.getPosts(this.pageConfig.currentPage, this.pageConfig.pageSize);
  }

}
