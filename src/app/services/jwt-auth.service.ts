import { Injectable } from '@angular/core';
import { LocalStorageJwt } from '../static/local-storage-auth';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtAuthService {
  public expire: number = 0;
  public date: any = new Date();

  constructor() {}

  isLogged(): boolean {
    const token: any = localStorage.getItem(LocalStorageJwt.LS_ACCESS_TOKEN);
    const decode: any = token ? jwt_decode(token) : null ;
    
    if (decode != null) {
      this.expire = decode.exp * 1000;    
      this.date = Date.parse(this.date);
    }
    if (!token) {
      localStorage.clear(); 
      return false;
    } else if (this.expire <= this.date) {
      localStorage.clear(); 
      return false;
    }    
    return true;
  }

}
