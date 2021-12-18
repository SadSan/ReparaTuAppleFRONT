import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateUserModel, UpdateUserModel } from '../models/createUser.interface';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:5001/";
const apiUsers = "api/Users";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
}

@Injectable({
  providedIn: 'root'
})


export class UsuariosService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${baseUrl + apiUsers}`);
  }

  createUser(user: CreateUserModel): Observable<any> {
    return this.http.post(`${baseUrl + apiUsers}`, user, httpOptions);
  }

  updateUser(user: UpdateUserModel): Observable<any> {
    return this.http.put(`${baseUrl + apiUsers}`, user);
  }

}

