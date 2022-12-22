import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  token: any;
  // resToken: Object | undefined | null ;
  constructor( 
      private formBuilder:FormBuilder,
      private nodeserverapi : NodeServerApiService,
      private notificationapi : NotificationApiService,
      private router : Router
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
    const userData = this.loginform.value

    this.nodeserverapi.loginUser(userData).subscribe(
      (res) => {
        console.log(res)
        if(res.status === 200){
          // this.token = res.body
          // this.token = JSON.parse(this.resToken)

          let resSTR= JSON.stringify(res.body)
          let resPAR = JSON.parse(resSTR)
          this.token = resPAR.token
          localStorage.setItem('token',this.token)
          this.router.navigate(['/main/'+this.token+'/home'],)
          this.notificationapi.loginAlert('Login Successfull!')
        }
      },
      (error) => {
        console.log(error)
        this.notificationapi.errorAlert(error.error)
      }
    )

  }

}
