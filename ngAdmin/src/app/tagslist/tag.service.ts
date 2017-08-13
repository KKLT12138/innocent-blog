import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from "angular2-cookie/services/cookies.service";

import { Config } from '../share/config';

@Injectable()
export class TagService {
  token: string;

  constructor(
    private http: Http,
    private _cookieService: CookieService
  ) {
    this.token = _cookieService.get('token');
  }

  getTags(): Observable<any> {
    let url = `${Config.apiAdminRoot}tag?token=${this.token}`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  getTagInfo(): Observable<any> {
    let url = `${Config.apiAdminRoot}taginfo?token=${this.token}`;
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

  addTag(tagDate): Observable<any> {
    let url = `${Config.apiAdminRoot}tag`;
    let body = JSON.stringify(tagDate);
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token',this.token);
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map(this.extraData)
      .catch(this.handleError);
  }

  delTag(tagId): Observable<any> {
    let url = `${Config.apiAdminRoot}tag`;
    let data: any = {};
    if (tagId instanceof Array) {
      data = {
        id: tagId
      }
    } else {
      data = {
        id: [tagId.id]
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
