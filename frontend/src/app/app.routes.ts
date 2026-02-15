import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login';
import { ProductListComponent } from './features/products/product-list/product-list';
import { ProductFormComponent } from './features/products/product-form/product-form';

import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  // Public route
  {
    path: 'login',
    component: LoginComponent
  },

  // Protected routes
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

  // Default redirect
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Fallback
  {
    path: '**',
    redirectTo: 'login'
  }

];
