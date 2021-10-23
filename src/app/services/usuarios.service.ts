import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateUserModel } from '../models/createUser.interface';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:5001/";
const apiUsers = "api/Users";

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${baseUrl + apiUsers}`);
  }

  createUser(user: CreateUserModel): Observable<any> {
    return this.http.post(`${baseUrl + apiUsers}`, user);
  }
}

