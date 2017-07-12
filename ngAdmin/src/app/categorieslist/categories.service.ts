import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoriesService {
  constructor(
    private http: Http
  ) { }

  getCategories(): Observable<any> {
    let url = 'http://localhost:3000/api/category';
    return this.http.get(url);
  }
}
