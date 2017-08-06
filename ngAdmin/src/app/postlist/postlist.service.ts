import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from "angular2-cookie/services/cookies.service";

import { Config } from '../share/config';

@Injectable()
export class PostListService {
  token: string;

  constructor(
    private http: Http,
    private _cookieService: CookieService
  ) {
    this.token = _cookieService.get('token');
  }

  getPosts(currentPage, pageSize): Observable<any> {
    let url = `${Config.apiAdminRoot}post?page=${currentPage}&size=${pageSize}&token=${this.token}`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  delPost(postId): Observable<any> {
    let url = `${Config.apiAdminRoot}post`;
    let data: any = {};
    if (postId instanceof Array) {
      data = {
        id: postId
      }
    } else {
      data = {
        id: [postId.id]
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
