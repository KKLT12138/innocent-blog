// 分类相关服务
import { Injectable } from '@angular/core';

let categories: any = [
  {
    "id": "abc",
    "name": "node",
  },
  {
    "id": "ker",
    "name": "javascript",
  },
  {
    "id": "esc",
    "name": "c++",
  },
  {
    "id": "aaa",
    "name": "linux",
  }
];

let categoriesById = {
  "id": "esc",
  "name": "c++",
};

@Injectable()
export class CategoryService {

  constructor() { }


  getCategories() {
    return categories;
  }

  getCategoryById(id: string) {
    return categoriesById;
  }

}
