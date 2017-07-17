import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Config } from '../share/config';

@Injectable()
export class TagService {
  constructor(
    private http: Http
  ) { }

  getTags(): Observable<any> {
    let url = `${Config.apiAdminRoot}tag`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  addTag(tagDate): Observable<any> {
    let url = `${Config.apiAdminRoot}tag`;
    let body = JSON.stringify(tagDate);
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
