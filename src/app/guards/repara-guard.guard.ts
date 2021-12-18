import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { JwtAuthService } from '../services/jwt-auth.service';


@Injectable({
  providedIn: 'root',
})
export class ReparaGuardGuard implements CanActivate {
  constructor(private _jwtAuth: JwtAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const rolLS: any = localStorage.getItem('rol');
    const isLoggedIn: boolean = this._jwtAuth.isLogged();
      if (!isLoggedIn) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'No autorizado, por favor Logearse',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }
    if (parseInt(rolLS) != 1 && parseInt(rolLS) != 2 && parseInt(rolLS) != 3 && parseInt(rolLS) != 4) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'No autorizado, por favor Logearse',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.router.navigate(['/login']);
      });
    }
    return isLoggedIn;
  }
}
