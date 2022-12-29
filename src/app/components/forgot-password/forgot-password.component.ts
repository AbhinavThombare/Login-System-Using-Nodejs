import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeServerApiService } from 'src/app/services/Node-Server-Api/node-server-api.service';
import { NotificationApiService } from 'src/app/services/Notification-Api/notification-api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotform: FormGroup ;
  user:boolean=false


  message_error ={
    'email':[
      {type:'required',message:'Email is required'},
      {type:'email',message:'Please Enter valid email'}
    ],
    'password':[
      {type:'required',message:'Password is required'},
      {type:'minlength',message:'Password must be atleast 6 characters'}
    ],
    'cpassword':[
      {type:'required',message:'Confirm Password is required'}
    ]
  }
  email: any;
  updateUser: any;
  constructor(
    private fb: FormBuilder,
    private nodeserverapi: NodeServerApiService,
    private notificationapi : NotificationApiService,
    private router : Router
  ) {
    this.forgotform = this.fb.group({
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      cpassword: new FormControl('',Validators.compose([
        Validators.required,
      ]))
    })
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.forgotform.value)
    this.email = this.forgotform.value.email;
    
    this.nodeserverapi.getUser(this.email).subscribe(
      (res) => {
        console.log(res)
        if(res.status === 200){
          this.user = true
        }
      },
      (err) => {
        this.notificationapi.errorAlert(err.error.msg)
      }
    )
  }

  submit1() {
    console.log('abhinav')
    this.updateUser = this.forgotform.value
    this.nodeserverapi.updateUser(this.updateUser).subscribe(
      (res) => {
        console.log(res)
        if(res.status === 200){
          this.notificationapi.loginAlert('Password is changed')
          this.router.navigate(['/'])
        }
      }
    )
  }

}
