import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { ProductListComponent } from './features/products/product-list/product-list';
import { ProductFormComponent } from './features/products/product-form/product-form';
import { AuthGuard } from './core/guards/auth-guard';



export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },


  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
