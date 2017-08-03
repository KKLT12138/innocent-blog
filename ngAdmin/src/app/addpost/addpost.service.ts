import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Config } from '../share/config';

@Injectable()
export class AddPostService {
  constructor(
    private http: Http
  ) { }

  getPost(id): Observable<any> {
    let url = `${Config.apiAdminRoot}post/${id}`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  addPost(postDate): Observable<any> {
    let url = `${Config.apiAdminRoot}post`;
    let body = JSON.stringify(postDate);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

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
    return Observable.throw(errMsg);
  }
}
