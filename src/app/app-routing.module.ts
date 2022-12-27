import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { ShowFilesComponent } from './components/show-files/show-files.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthguardGuard } from './shared/authguard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'main/:token/about', component: AboutComponent },
  {
    path: 'main', component: MainComponentComponent,
    children: [
      {
        path:'home', component: HomeComponent,canActivate: [AuthguardGuard]
      },
      {
        path:'fileupload', component: FileUploadComponent,canActivate: [AuthguardGuard]
      }, 
      {
        path:'showfiles', component: ShowFilesComponent,canActivate: [AuthguardGuard]
      },
      {
        path:'about', component: AboutComponent,canActivate: [AuthguardGuard]
      },
      
    ],
    canActivate: [AuthguardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
