import {
    RouterModule,
    Routes } from '@angular/router';

import { ItemsComponent } from './items/items.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from'./login/login.component';
import { RegistrationComponent } from'./registration/registration.component';
import { AdminComponent } from'./admin/admin.component';
import { AdminToolsComponent } from'./admin-tools/admin-tools.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/categories', pathMatch: 'full' },
	{ path: 'categories', component: CategoriesComponent },
    { path: 'items', component: ItemsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'admin', component: AdminComponent},
    { path: 'admin-tools', component: AdminToolsComponent}
];

export const AppRoutes = RouterModule.forRoot(appRoutes);