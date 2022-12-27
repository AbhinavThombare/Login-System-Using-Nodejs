import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NodeServerApiService } from 'src/app/services/Node-Server-Api/node-server-api.service';
import { NotificationApiService } from 'src/app/services/Notification-Api/notification-api.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  file:any | null;
  // token: string | null | undefined;
  fileData: { Name: any; Size: any; Type: any; } | undefined;
  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });
 
  fileName: any;
  message: any;
  currenttoken: any;

  constructor(
    private nodeserverapi : NodeServerApiService,
    private fb: FormBuilder,
    private notificationapi : NotificationApiService
  ) { }
  ngOnInit(): void {
  
  }

  public onFileChange(event: any) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsText(file);
     
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });
      };
    }
  }
 
  onSubmit(): void {
    this.currenttoken = JSON.parse(localStorage.getItem('token')!)
    const token = this.currenttoken.value

    this.nodeserverapi.fileUpload(this.fileName, this.formGroup.get('file')?.value,token).subscribe(
      (res) => {
        let resSTR = JSON.stringify(res.body)
        let resPAR = JSON.parse(resSTR)
        this.message = resPAR.message
        this.notificationapi.loginAlert(this.message)
      },
      (error) => {
        // console.log(error)
        this.notificationapi.errorAlert(error.message)
      }
    );
    console.log(this.fileName)
    console.log(this.formGroup.get('file')?.value)
  }
}