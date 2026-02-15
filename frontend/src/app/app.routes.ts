import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login';
import { ProductListComponent } from './features/products/product-list/product-list';
import { ProductFormComponent } from './features/products/product-form/product-form';

import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  // public route
  {
    path: 'login',
    component: LoginComponent
  },

  // protected routes
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard]
  },

  // default redirect
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // fallback route
  {
    path: '**',
    redirectTo: 'login'
  }

];
