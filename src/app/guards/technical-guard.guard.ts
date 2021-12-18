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
import { EnumRolesUser } from '../static/enum-roles-user';
import { LocalStorageJwt } from '../static/local-storage-auth';

@Injectable({
  providedIn: 'root',
})
export class TechnicalGuardGuard implements CanActivate {
  constructor(private router: Router, private _jwtAuth: JwtAuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn: boolean = this._jwtAuth.isLogged();
    const rol: any = localStorage.getItem(LocalStorageJwt.LS_ROL);

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
      return false;
    }

    if (parseInt(rol) != EnumRolesUser.TECHNICAL) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Usuario sin permisos de entrada!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        switch (parseInt(rol)) {
          case EnumRolesUser.ADMIN:
            this.router.navigate(['/dashboard-admin']);
            break;
            case EnumRolesUser.ADVISER:
              this.router.navigate(['/dashboard-adviser']);
            break;
            case EnumRolesUser.DOMICILIARY:
              this.router.navigate(['/dashboard-domiciliary']);
            break;
          default:
            this.router.navigate(['/login']);
            break;
        }
      });
      return false;
    }
    return true;
  }
}
