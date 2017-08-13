import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CookieService } from "angular2-cookie/services/cookies.service";

@Injectable()
export class AuthService {
  isLoggedIn = false;

  constructor() {

  }

}
