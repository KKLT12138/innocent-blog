import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../share/category.service";
import { parseTime } from '../share/timeToDate.fn';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['../../public/css/categories.css']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private _categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  categories: any[] = [
    {
      id: '',
      name: 'loading..',
      count: 0
    }
  ];

  categoriesCount: number = 0;

  currentCategory = {
    id: '',
    name: ''
  };

  currentPosts: any[] = [
    {
      id: '',
      title: '暂无文章',
      date: 'Jan 1, 1970'
    }
  ];

  pageConfig = {
    totalNum: 0,
    currentPage: 1,
    totalPage: 0,
    pageSize: 2
  };

  ngOnInit() {
    this._categoryService.getCategoryInfo()
      .subscribe(datas => {
        datas.forEach( (data, index) => {
          this.categories[index] = {};
          this.categories[index].id = data._id;
          this.categories[index].name = data.category;
          this.categories[index].count = 0;
        });
        this._categoryService.getCategoryPostNum()
          .subscribe(datas => {
            for (let i in datas.data) {
              for (let j in this.categories) {
                if (datas.data[i]['_id'] == this.categories[j].id ) {
                  this.categories[j].count = datas.data[i].count;
                }
              }
            }
            this.categoriesCount = this.categories.length;
            this.currentCategory.id = this.categories[0].id;
            this.currentCategory.name = this.categories[0].name;
            this.getCategoryPosts(this.currentCategory.id, this.pageConfig.currentPage, this.pageConfig.pageSize);
          });
      });
  }

  setCurrentCategory(id, name) {
    this.currentCategory.id = id;
    this.currentCategory.name = name;
    this.getCategoryPosts(this.currentCategory.id, 1, this.pageConfig.pageSize);
  }

  getPageData(currentPage) {
    this.getCategoryPosts(this.currentCategory.id, currentPage, this.pageConfig.pageSize);
  }

  getCategoryPosts(currentCategoryId, currentPage, pageSize) {
    this._categoryService.getCurrentPosts(currentCategoryId, currentPage, pageSize)
      .subscribe(datas => {
        this.pageConfig.totalNum = datas.totalNum;
        this.pageConfig.totalPage = Math.ceil(this.pageConfig.totalNum / this.pageConfig.pageSize);
        this.currentPosts = [];
        datas.data.forEach((post, index) => {
          this.currentPosts[index] = {};
          this.currentPosts[index].id = post._id;
          this.currentPosts[index].title = post.title;
          this.currentPosts[index].date = parseTime(post.date, 2);
        })
      });
  }

}
