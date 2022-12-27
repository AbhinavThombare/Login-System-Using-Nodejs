import { Injectable } from '@angular/core';
import { NodeServerApiService } from '../Node-Server-Api/node-server-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private nodeserverapi : NodeServerApiService
  ) { }

  IsLoggedIn() {
    const result = this.getWithExpiry()
    return result
  }

  getWithExpiry() {
    const itemStr = localStorage.getItem('token')

    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    if (now.getTime() > item.expiry) {
      this.nodeserverapi.logoutUser(item.value).subscribe(
        (res) => console.log(res)
      )
      localStorage.removeItem('token')
      return null
    }
    return item.value
  }
}
