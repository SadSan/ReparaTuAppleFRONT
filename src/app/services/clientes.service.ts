import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateClientModel } from '../models/createClient.interface';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:5002/";
const apiClients = "api/Client";

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  constructor(private http: HttpClient) { }

  createClient(client: CreateClientModel): Observable<any> { 
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    }
    return this.http.post(`${baseUrl + apiClients}`, client, httpOptions);
  }
}

