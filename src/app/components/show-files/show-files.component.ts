import { Component, OnInit } from '@angular/core';
import { NodeServerApiService } from 'src/app/services/Node-Server-Api/node-server-api.service';

@Component({
  selector: 'app-show-files',
  templateUrl: './show-files.component.html',
  styleUrls: ['./show-files.component.scss']
})
export class ShowFilesComponent implements OnInit {
  currenttoken: any;
  filesData: any;

  constructor(
    private nodeserverapi: NodeServerApiService
  ) { }

  ngOnInit(): void {
    this.getfiles()
  }

  getfiles() {
    this.currenttoken = JSON.parse(localStorage.getItem('token')!)
    const token = this.currenttoken.value
    this.nodeserverapi.getFiles(token).subscribe(
      (res) => {
        console.log(res)
        this.filesData = res
      }
    )
  }

  file(item: any) {
    this.currenttoken = JSON.parse(localStorage.getItem('token')!)
    const token = this.currenttoken.value
    this.nodeserverapi.getFileData(token, item).subscribe(
      (res) => {
        const fileSTR = JSON.stringify(res.body)
        const filePAR = JSON.parse(fileSTR)
        console.log(filePAR.fileContent)
      }
    )
  }
}
