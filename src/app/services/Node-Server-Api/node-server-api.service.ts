import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs';


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

  getUser() {
    return this.http.get(this.configUrl+'/users')
  }

  loginUser(userdata:object) {
    return this.http.post(this.configUrl+'/user/login',{userdata},{ observe: 'response' })
  }

  logoutUser(token:any){
    return this.http.post(this.configUrl+'/user/logout/'+token,{},{observe:'response'})
  }

  fileUpload(fileName: string, fileContent: string,token:any) {
    return this.http.post(this.configUrl+'/user/fileupload/'+token,{fileName,fileContent},{observe:'response'})
  }

  getFiles(token:any) {
    return this.http.get(this.configUrl+'/user/files/'+token)
  }

  getFileData(token:any,id:any,filename:any) {
    return this.http.get(this.configUrl+'/user/file/'+id+'/'+filename+'/'+token,{observe:'response'})
  }

  testUpload(name:any,size:any,type:any) {
    return this.http.post(this.configUrl+'/test/fileupload',{name,size,type})
  }
}
