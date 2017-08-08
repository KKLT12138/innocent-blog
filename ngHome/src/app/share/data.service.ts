//前台数据相关服务
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Config } from './config';

@Injectable()
export class DataService {

  constructor(
    private http: Http
  ) { }

  getPostNum() {
    let url = `${Config.apiUserRoot}postnum`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  getCategoryNum() {
    let url = `${Config.apiUserRoot}categorynum`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  getTagNum() {
    let url = `${Config.apiUserRoot}tagnum`;
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
