import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public username : string='';
  public password : string='';

  constructor(private http:HttpClient) { }

  login(username : string, password : string){

  }

  crearAuthBasicaToken(username : string , password : string){
  }
}
