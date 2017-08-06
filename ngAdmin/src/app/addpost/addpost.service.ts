import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from "angular2-cookie/services/cookies.service";

import { Config } from '../share/config';

@Injectable()
export class AddPostService {
  token: string;

  constructor(
    private http: Http,
    private _cookieService: CookieService
  ) {
    this.token = _cookieService.get('token');
  }

  getPost(id): Observable<any> {
    let url = `${Config.apiAdminRoot}post/${id}?token=${this.token}`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  addPost(postDate): Observable<any> {
    let url = `${Config.apiAdminRoot}post`;
    let body = JSON.stringify(postDate);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    headers.append('x-access-token',this.token);

    return this.http.post(url, body, options)
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
