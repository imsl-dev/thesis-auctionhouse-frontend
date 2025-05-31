import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';

export const routes: Routes = [
    { path: '', component: Login },            // default landing
  { path: 'login', component: Login },
  {path: 'signup', component: Signup}  
];
