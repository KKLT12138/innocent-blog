//前台标签相关服务
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Config } from './config';

@Injectable()
export class TagService {

  constructor(
    private http: Http
  ) { }

  getTagCloud() {
    let url = `${Config.apiUserRoot}tagcloud`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  getCategoryPostNum() {
    let url = `${Config.apiUserRoot}categorypostnum`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  getCurrentPosts(categoryId, currentPage, pageSize) {
    let url = `${Config.apiUserRoot}categoryposts?id=${categoryId}&page=${currentPage}&size=${pageSize}`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  private extraData(res) {
    let body = res.json();
    return body || [];
  }

  private handleError (error) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : `Server error`;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
