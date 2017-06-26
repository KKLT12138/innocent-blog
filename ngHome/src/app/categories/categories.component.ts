import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../service/category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['../../public/css/categories.css']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private categoryService: CategoryService
  ) { }

  categories = [];
  categoriesCount: number = 0;

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.categoriesCount = this.categories.length;

  }

}
