import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CarouselModule } from "angular2-carousel";
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import {
  FormsModule,
  ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { HttpClientService } from './services/http.service';
import { AppRoutes } from './app.routing';
import { ItemsComponent } from './items/items.component';
import { CategoriesComponent } from './categories/categories.component';
import { ItemDialog } from './item-dialog/item.dialog';
import { CartComponent } from './cart/cart.component';
import { AppService } from './services/app.service';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from'./registration/registration.component';
import{ AdminComponent } from'./admin/admin.component';
import { AdminToolsComponent } from'./admin-tools/admin-tools.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoryEditDialog } from './category-edit-dialog/category-edit.dialog';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    CategoriesComponent,
    ItemDialog,
    CartComponent,
    LoginComponent,
    RegistrationComponent,
    AdminComponent,
    AdminToolsComponent,
    CategoryEditDialog 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    AppRoutes,
    MatButtonModule,
    MatDialogModule,
    CarouselModule,
    MatChipsModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    FileUploadModule
  ],
  providers: [
    HttpClientService,
    AppService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ItemDialog, CategoryEditDialog]
})
export class AppModule { }