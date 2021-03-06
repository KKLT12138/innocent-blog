import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Config } from '../share/config';

@Injectable()
export class CategoriesService {
  token: string;

  constructor(
    private http: Http,
    private _cookieService: CookieService
  ) {
    this.token = _cookieService.get('token');
  }

  getCategories(): Observable<any> {
    let url = `${Config.apiAdminRoot}category?token=${this.token}`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  getCategoryNum(): Observable<any> {
    let url = `${Config.apiAdminRoot}categorynum?token=${this.token}`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  getPostNum(): Observable<any> {
    let url = `${Config.apiAdminRoot}postnum?token=${this.token}`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  addCategory(categoryDate): Observable<any> {
    let url = `${Config.apiAdminRoot}category`;
    let body = JSON.stringify(categoryDate);
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token',this.token);

    let options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map(this.extraData)
      .catch(this.handleError);
  }

  delCategory(categoryId): Observable<any> {
    let url = `${Config.apiAdminRoot}category`;
    let data: any = {};
    if (categoryId instanceof Array) {
      data = {
        id: categoryId
      }
    } else {
      data = {
        id: [categoryId.id]
      }
    }
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token',this.token);
    let options = new RequestOptions({
      headers: headers,
      body: body
    });

    return this.http.delete(url, options)
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

    if (error.status == 302) {
      alert('权限不足，请用管理员账户登录！');
      location.href = '/admin';
    }
    return Observable.throw(errMsg);
  }
}
