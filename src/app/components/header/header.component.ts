import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeServerApiService } from 'src/app/services/Node-Server-Api/node-server-api.service';
import { NotificationApiService } from 'src/app/services/Notification-Api/notification-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  token: any;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private nodeserverapi : NodeServerApiService,
    private notificationapi : NotificationApiService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.token =this.route.snapshot.paramMap.get('token')
    this.nodeserverapi.logoutUser(this.token).subscribe(
      (res) => {
        if(res.status === 200) {
          this.router.navigate(['/'])
          localStorage.setItem('token','')
          this.notificationapi.loginAlert('Logout Successfully')
        }
      },
      (err) => {
        this.notificationapi.errorAlert(err)
      }
    )
  }

}
