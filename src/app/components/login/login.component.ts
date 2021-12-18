import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ResponseI } from 'src/app/models/response.interface';
import { LocalStorageJwt } from 'src/app/static/local-storage-auth';
import { JwtAuthService } from 'src/app/services/jwt-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    correo: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required),
  });

  public submitted: boolean = false;

  constructor(private ApiLoginUser: LoginService, private router: Router, private _jwtService: JwtAuthService) { }

  ngOnInit(): void {
  }

  public onLoginAux(): void {
    this.submitted = true;
    const data = this.loginForm.value;
    this.ApiLoginUser.loginAux(data).subscribe((resp: any) => {
      localStorage.setItem(LocalStorageJwt.LS_ROL, resp.body[0].id_rol);
      localStorage.setItem(LocalStorageJwt.LS_USER, resp.body[0].idusuario);
      localStorage.setItem(LocalStorageJwt.LS_ACCESS_TOKEN, resp.headers.get('Authorization'));

      switch (resp.body[0].id_rol) {
        case 1:
          this.router.navigate(['/dashboard-admin']);
          break;
        case 2:
          this.router.navigate(['/dashboard-adviser']);
          break;
        case 3:
          this.router.navigate(['/dashboard-domiciliary']);
          break;
        case 4:
          this.router.navigate(['/dashboard-technical']);
          break;
        default:
          this.router.navigate(['/welcome']);
          localStorage.clear();
          break;
      }

    }, (err) => {
      this.submitted = false;
      if (err.error.status == 401) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'clave o correo incorrecto',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        })
        return;
      }
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'error inesperado',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.reload();
      })
    })
  }
}
