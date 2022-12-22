import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeServerApiService } from 'src/app/services/Node-Server-Api/node-server-api.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent implements OnInit {
  token: any;
  localtoken: any;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private nodeserverapi : NodeServerApiService
  ) { }

  ngOnInit(): void {
    // console.log(this.route.snapshot.paramMap.get('token'))
    this.token =this.route.snapshot.paramMap.get('token')
    this.localtoken = localStorage.getItem('token')

    console.log(this.token)
    if(this.token !== this.localtoken) {
      console.log(this.localtoken)
      this.nodeserverapi.logoutUser(this.localtoken).subscribe(
        (res) => {
          console.log(res)
          if(res.status === 200) {
            this.router.navigate(['/'])
            localStorage.setItem('token','')
          }
        }
      )
    }
    else{
      console.log("abhinav")
    }


    
  }

  

}
