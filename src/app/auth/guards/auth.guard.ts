import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanMatch {
  constructor(private authService: AuthService, private router: Router) {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean | UrlTree> {
    let flag: boolean = this.authService.verificaAutenticacion();

    if (flag) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    let flag: boolean = this.authService.verificaAutenticacion();

    if (flag) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
