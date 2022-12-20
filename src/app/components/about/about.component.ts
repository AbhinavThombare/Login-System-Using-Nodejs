import { Component, OnInit } from '@angular/core';
import { NodeServerApiService } from 'src/app/services/Node-Server-Api/node-server-api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  getuser: any;

  constructor(
    private nodeserverapi: NodeServerApiService
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.nodeserverapi.getuser().subscribe((res:any) => {
      this.getuser = res
      console.log(this.getuser)
    })
  }

}
