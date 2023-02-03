import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  objeto: any;

  constructor(private http: HttpClient) {}

  clicked(){
    this.makeRequest();
    console.log(this.objeto);
  }

  makeRequest() {
    const basicAuth =
      'Basic ' + window.btoa(this.username + ':' + this.password);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: basicAuth,
      }),
    };

    return this.http
      .get('http://localhost:8080/clientes', httpOptions)
      .subscribe((resp) => (this.objeto = resp));
  }
}
