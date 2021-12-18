import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { loginI } from '../models/login.interface';
import { ResponseI } from '../models/response.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

url:string =  "http://localhost:5000/";
apiLogin = "LoginInUsuarios";

  constructor( private http: HttpClient) {  }

    LoginByUser(form:loginI):Observable <ResponseI> {
      let direccion = this.url + this.apiLogin;
      console.log(form) //imprime el json que se le envía al post
      let aux = this.http.post<ResponseI>(direccion,form);
      return aux;
    }

    loginAux(credentials: any){
       return this.http.post(`${this.url + this.apiLogin}`, credentials, {observe: 'response'});
    }

    LoginByUserWithHeaders(credentials: any):Observable <any> {
      let aux = this.http.post(`${this.url + this.apiLogin}`, credentials, {observe: 'response'});
      return aux;
    }

}
