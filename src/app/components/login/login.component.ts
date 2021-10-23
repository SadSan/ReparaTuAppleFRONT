import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { loginI } from '../../models/login.interface';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ResponseI } from 'src/app/models/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private ApiLoginUser: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.loginForm = new FormGroup({
      correo: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required),
    });
  }

  onLoginByUser() {
    const data = this.loginForm.value;
    this.ApiLoginUser.LoginByUser(data).subscribe((resp : ResponseI) => {
      //localStorage.setItem('ACCESS_TOKEN', data.authorization)
      console.log("Objeto Data -> " + data);
      console.log("Objeto Resp -> " + resp.authorization);
    });
  }

  //Borrar si la llego a cagar
  onLoginByUserWithHeaders() {
    const data = this.loginForm.value;
    this.ApiLoginUser.LoginByUserWithHeaders(data).subscribe((resp : any) => {
      //localStorage.setItem('ACCESS_TOKEN', data.authorization)
      console.log("Objeto Resp -> " + resp["title"]);
    });
  }

  onLoginAux() {
    const data = this.loginForm.value;
    this.ApiLoginUser.loginAux(data).subscribe((resp: any) => {
      console.log("This is your object prro -> " + resp);

        console.log("Entraste bro o bra")
        this.router.navigate(['/client']);
    })
  }
}
