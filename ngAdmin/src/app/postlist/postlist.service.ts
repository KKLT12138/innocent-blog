import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Config } from '../share/config';

@Injectable()
export class PostListService {
  constructor(
    private http: Http
  ) { }

  getPosts(): Observable<any> {
    let url = `${Config.apiAdminRoot}post`;
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
    return Observable.throw(errMsg);
  }
}
