import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Config } from '../share/config';

@Injectable()
export class FriendService {
  constructor(
    private http: Http
  ) { }

  getFriends(): Observable<any> {
    let url = `${Config.apiAdminRoot}friend`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  addFriend(friendDate): Observable<any> {
    let url = `${Config.apiAdminRoot}friend`;
    let body = JSON.stringify(friendDate);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map(this.extraData)
      .catch(this.handleError);
  }

  delFriend(friendId): Observable<any> {
    let url = `${Config.apiAdminRoot}friend`;
    let data: any = {};
    if (friendId instanceof Array) {
      data = {
        id: friendId
      }
    } else {
      data = {
        id: [friendId.id]
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
