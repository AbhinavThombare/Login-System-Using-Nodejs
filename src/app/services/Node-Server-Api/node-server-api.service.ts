import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NodeServerApiService {
  private configUrl = 'http://localhost:3002/api';
  headers = new HttpHeaders();

  constructor(private http:HttpClient) { }

  newUser(data:any) {
    return this.http.post(this.configUrl+'/users',{data},{ observe: 'response' })
  }

  getuser() {
    return this.http.get(this.configUrl+'/users')
  }
}
