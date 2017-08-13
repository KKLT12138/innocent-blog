import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Config } from './share/config';

@Injectable()
export class AuthGuardService implements CanActivate {
  token: string;

  canActivate() {
    return this.checkLogin();
  }

  constructor(
    private router: Router,
    private _cookieService: CookieService
  ) {
    this.token = _cookieService.get('token');
  }

  checkLogin() {
    if (this.token) {
      return true;
    } else {
      alert('请先登录！');
      // location.href = '/admin/login';
      location.href = `${Config.siteRoot}admin/login`;
    }
  }

}
