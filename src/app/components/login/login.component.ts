import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationApiService } from 'src/app/services/Notification-Api/notification-api.service';
import {NodeServerApiService} from '../../services/Node-Server-Api/node-server-api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  message_error = {
    'email': [
      {type: 'required',message: 'Email is required'},
      {type: 'email',message: 'Enter Valid Email Address'}
    ],
    'password' : [
      {type: 'required',message: 'Password is required'},
    ],
  }
  constructor( 
      private formBuilder:FormBuilder,
      private nodeserverapi : NodeServerApiService,
      private notificationapi : NotificationApiService
      ) { 
    this.loginform = this.formBuilder.group({
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required,
      ])),
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginform.value);
    const userData = this.loginform.value

    this.nodeserverapi.loginUser(userData).subscribe(
      (res) => {
        this.notificationapi.loginAlert()
      },
      (error) => {
        this.notificationapi.errorAlert(error.error)
      }
    )

  }

}
