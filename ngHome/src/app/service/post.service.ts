//文章相关服务
import { Injectable } from '@angular/core';

let post:any = [
  {
    "id": "abc",
    "title": "文章1",
    "author": "tianzhen",
    "category": 0,
    "tags": [0, 2, 3],
    "order": 99,
    "time": "1498054505",
    "click": 100,
    "content": "三年级时，我曾是一个胆小如鼠的女孩",
  },
  {
    "id": "hel",
    "title": "文章2",
    "author": "tianzhen2",
    "category": 2,
    "tags": [0, 1, 2],
    "order": 35,
    "time": "1498050000",
    "click": 45,
    "content": "三年级时，我曾是一个胆小如鼠的女孩2",
  },
  {
    "id": "gsw",
    "title": "文章3",
    "author": "tianzhen",
    "category": 0,
    "tags": [0, 1, 3],
    "order": 99,
    "time": "1498034505",
    "click": 2,
    "content": "三年级时，我曾是一个胆小如鼠的女孩3",
  },
];

let postById = {
    "id": "abc",
    "title": "文章1",
    "author": "tianzhen",
    "category": 0,
    "tags": [0, 2, 3],
    "order": 99,
    "time": "1498054505",
    "click": 100,
    "content": "三年级时，我曾是一个胆小如鼠的女孩",
  };

@Injectable()
export class PostService {

  constructor() { }


  getPostList() {
    return post;
  }

  getPostById(id: string) {
    return postById;
  }

}
