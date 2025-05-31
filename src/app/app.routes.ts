import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Marketplace } from './marketplace/marketplace';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Login },            // default landing
  {path: 'signup', component: Signup},
  {path: 'marketplace',component: Marketplace, canActivate: [AuthGuard]} 
];
