import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NodeServerApiService } from 'src/app/services/Node-Server-Api/node-server-api.service';
import { NotificationApiService } from 'src/app/services/Notification-Api/notification-api.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  token: string | null | undefined;
  fileData: { Name: any; Size: any; Type: any; } | undefined;

  fileName: any = [];
  message: any;
  currenttoken: any;
  formGroup: FormGroup;

  constructor(
    private nodeserverapi: NodeServerApiService,
    private fb: FormBuilder,
    private notificationapi: NotificationApiService
  ) {
    this.formGroup = this.fb.group({
      file: [null,Validators.required]
    });
   }
  ngOnInit(): void {
  }
  public onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);

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

    if(this.fileName.length !== 0) {
      this.nodeserverapi.fileUpload(this.fileName, this.formGroup.get('file')?.value,token).subscribe(
        (res) => {
          let resSTR = JSON.stringify(res.body)
          let resPAR = JSON.parse(resSTR)
          this.message = resPAR.message
          this.notificationapi.loginAlert(this.message)
        },
        (error) => {
          this.notificationapi.errorAlert(error.message)
        }
      );
    }
    else {
      alert('Please Upload file..')
    }
  }
  
}
