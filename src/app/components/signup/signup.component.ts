import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NodeServerApiService } from '../../services/Node-Server-Api/node-server-api.service';
import { NotificationApiService } from '../../services/Notification-Api/notification-api.service'
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupdata: FormGroup
  message_error = {
    'name': [
      { type: 'required', message: 'Name is required' },
      { type: 'pattern', message: 'Enter Valid Name' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter Valid Email Address' }
    ],
    'mobile': [
      { type: 'required', message: 'Mobile Number is required' },
      { type: 'pattern', message: 'Enter Valid Mobile number' },
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be atleast 6 characters' },
      { type: 'maxlength', message: 'Password must not be above 30 characters' }
    ],
    'cpassword': [
      { type: 'required', message: 'Confirm Password is required' },
      // {type: 'pattern',message: 'Password does not Match'},
      // {type: 'minlength',message: 'Password must be atleast 6 characters'},
      // {type: 'maxlength',message: 'Password must not be above 30 characters'}
    ],
  }

  constructor(
    public formBuilder: FormBuilder,
    private nodeserverapi: NodeServerApiService,
    private notificationapi: NotificationApiService,
    private router: Router
  ) {
    this.signupdata = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      mobile: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{10}$'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ])),
      cpassword: new FormControl('', Validators.compose([
        Validators.required
      ]))

    })
  }



  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value

    const userData = this.signupdata.value

    console.log(userData)
    this.nodeserverapi.newUser(userData).subscribe((res) => {
      console.log(res.status)
      if (res.status === 201) {
        this.router.navigate(['/login'])
        this.notificationapi.registrationAlert()
        setTimeout(() => {
          this.notificationapi.loginAlert()
        }, 3000);
      }
      else {
        this.notificationapi.errorAlert()
      }
    })


  }

}
