import { UpdateCodeModel } from './../models/createCode.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = "http://localhost:5006";
const apiAdmin = "/api/Seguimiento/Admin";
const api = "/api/Seguimiento";


@Injectable({
  providedIn: 'root'
})

export class SeguimientosService {
  public codigo: any;

  constructor(private http: HttpClient) { }

  getSeguimientos(): Observable<any> {
      return this.http.get(`${baseUrl + apiAdmin}`);
  }
  getSeguimientosByCode( cod_seguimiento: any ): Observable<any> {
      return this.http.get(`${baseUrl + api}`, { params: {cod_seguimiento: cod_seguimiento}, observe: 'response'});
  }
  editCode(code: any): Observable<any> { 
    console.log(code);
    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    }
    return this.http.put(`${baseUrl + api}`, code, httpOptions);
  }
  createCode(code: {}): Observable<any> { 
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    }
    return this.http.post(`${baseUrl + api}`, code, httpOptions);
  }

}
