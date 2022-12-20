import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import {NodeServerApiService} from '../../../../services/node-server-api.service'

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
      // private nodeserverapi : NodeServerApiService
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

    // this.nodeserverapi.newUser(userData).subscribe()

  }

}
