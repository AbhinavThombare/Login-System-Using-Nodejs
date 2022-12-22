import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthguardGuard } from './shared/authguard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'main/:token/about', component: AboutComponent },
  {
    path: 'main/:token', component: MainComponentComponent,
    children: [
      {
        path:'about', component: AboutComponent
      },
      {
        path:'home', component: HomeComponent
      }
    ],
    canActivate: [AuthguardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
